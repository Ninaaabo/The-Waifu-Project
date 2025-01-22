import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import {packageDirectory} from 'pkg-dir';

const dir = await packageDirectory();
const app = express();
const port = 3000;
const url = "https://waifu.it/api/v4/";
var level = 1;
var difficulty = "";
var name = "";
const loose = ["angry", "baka", "bite", "bonk", "disgust", "facepalm", "kick", "punch", "stare"];
const win = ["blush", "cheer", "cuddle", "dab", "happy", "highfive", "hug",  "love", "yes"]
const accessCode = "MTE5OTk1ODM3NTc5MDgyNTUwMg--.MTczNzQ5ODY2Ng--.f0d876014";
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{
  res.render(dir + "/public/landing.ejs");
})

app.post("/difficulty", async(req, res) =>{
  difficulty = req.body.choice;
  try{
    const response = await axios.get(url + "waifu", { headers: {
      Authorization: accessCode,
    }});
    
    name = response.data.name.full;
    res.render(dir + "/public/index.ejs", {name, difficulty, imgSrc : response.data.image.large, level});
    console.log(response.data);
  }
  catch (err) {
    throw new Error(err.message);
  }
})

app.get("/difficulty", async(req, res) =>{
  try{
    const response = await axios.get(url + "waifu", { headers: {
      Authorization: accessCode,
    }});

    name = response.data.name.full;
    
    res.render(dir + "/public/index.ejs", {name, difficulty, imgSrc : response.data.image.large, level});
    console.log(response.data);
  }
  catch (err) {
    throw new Error(err.message);
  }
})

app.post("/result", async (req, res) =>{
  console.log(req.body);
  
  if (req.body.result === "over"){
    var emo = loose[Math.floor(Math.random() * loose.length)]
    try{
      const response = await axios.get(url + emo, { headers: {
        Authorization: accessCode,
      }});
      console.log(emo)
      res.render(dir + "/public/game-over.ejs", {name, level, gif: response.data.url});
      level = 1;
    }
    catch (err) {
      throw new Error(err.message);
    }
  }
  if (req.body.result === "clear"){
    var emo = win[Math.floor(Math.random() * win.length)];
    try{
      const response = await axios.get(url + emo , { headers: {
        Authorization: accessCode,
      }});
      console.log(emo);
      res.render(dir + "/public/game-clear.ejs", {name, level, gif:response.data.url});
      level++;
    }
    catch (err) {
      throw new Error(err.message);
    }
    }

})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
