import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import {packageDirectory} from 'pkg-dir';

const dir = await packageDirectory();
const app = express();
const port = 3000;
const url = "https://waifu.it/api/v4/waifu";
var name = "";
var guess = [];
var imgSrc = "";
var chosenLetters = [];
var originalLifeLeft = 10;
var lifeLeft = originalLifeLeft;
var level = 0;
var lastClear = false;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{
  res.render(dir + "/public/landing.ejs");
})

app.post("/difficulty", async(req, res) =>{
  if(req.body.choice === "casual") originalLifeLeft = 15;
  if(req.body.choice === "lover") originalLifeLeft = 10;
  if(req.body.choice === "otaku") originalLifeLeft = 5;

  try{
    const response = await axios.get(url, { headers: {
      Authorization: "ODA1NzE1NjIwNzkxOTc1OTc2.MTczNzI1MDk0MQ--.42cd6a9d2e",
    } });
    
    if(lastClear){
      level++;
      lastClear = false;
    }
    else level = 1;
    chosenLetters = [];
    imgSrc = response.data.image.large;
    name = response.data.name.full;
    guess = new Array(name.length).fill("_");
    lifeLeft = originalLifeLeft;
    console.log("Hello");
    console.log(response.data.media.nodes);
    for(var i = 0; i < name.length; i++){
      if (name.toLowerCase().charCodeAt(i) < 97 || name.toLowerCase().charCodeAt(i) > 122) guess [i] = name[i];
    }
    res.render(dir + "/public/index.ejs", {name, imgSrc, guess, chosenLetters, lifeLeft, level, originalLifeLeft});
    console.log(response.data);
  }
  catch (err) {
    throw new Error(err.message);
  }
})

app.post("/guessing", (req, res) =>{

  console.log("You pressed " + req.body.choice);
  chosenLetters.push(req.body.choice);
  var isWrong = true;
  for(var i = 0; i < name.length; i++){
    if (name[i].toLowerCase() === req.body.choice){
      guess[i] = name[i];
      isWrong = false;
    }
  }
  if(isWrong) lifeLeft --;

  if(lifeLeft === 0){
    res.render(dir + "/public/game-over.ejs", {name, level});
    level = 0;
  }

  if(!guess.includes("_")){
    lastClear = true;
    res.render(dir + "/public/game-clear.ejs", {name, level});
  }

  res.render(dir + "/public/index.ejs", {name, imgSrc, guess, chosenLetters, lifeLeft, level, originalLifeLeft, scrollTo:200});


})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});