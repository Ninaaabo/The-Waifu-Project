import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import {packageDirectory} from 'pkg-dir';

const dir = await packageDirectory();
const app = express();
const port = 3000;
const url = "https://waifu.it/api/v4/waifu";
var level = 1;
var difficulty = "";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{
  res.render(dir + "/public/landing.ejs");
})

app.post("/difficulty", async(req, res) =>{
  difficulty = req.body.choice;
  // try{
  //   const response = await axios.get(url, { headers: {
  //     Authorization: "ODA1NzE1NjIwNzkxOTc1OTc2.MTczNzI1MDk0MQ--.42cd6a9d2e",
  //   }});
    
  //   res.render(dir + "/public/index.ejs", {name:response.data.name.full, difficulty, imgSrc : response.data.image.large, level});
  //   console.log(response.data);
  // }
  // catch (err) {
  //   throw new Error(err.message);
  // }
})

app.get("/difficulty", async(req, res) =>{
  try{
    const response = await axios.get(url, { headers: {
      Authorization: "ODA1NzE1NjIwNzkxOTc1OTc2.MTczNzI1MDk0MQ--.42cd6a9d2e",
    }});
    
    res.render(dir + "/public/index.ejs", {name:response.data.name.full, difficulty, imgSrc : response.data.image.large, level});
    console.log(response.data);
  }
  catch (err) {
    throw new Error(err.message);
  }
})

app.post("/result", (req, res) =>{
  if (req.body.result === "over"){
    res.render(dir + "/public/game-over.ejs", {name:response.data.name.full, level});
    level = 0;
  }
  if (req.body.result === "clear"){
    res.render(dir + "/public/game-clear.ejs", {name:response.data.name.full, level});
  }
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});