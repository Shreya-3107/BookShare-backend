const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const cors = require("cors");

const BookInfoModel = require("./models/BookInfo");
const multer = require("multer");

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
mongoose.set("strictQuery", true);

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);





app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/addBook", async (req, res) => {
  const details = req.body;
  console.log(details);
if(details.isRented == false){
  await BookInfoModel.updateOne({"_id" : details.id}, { $set : {isRented : true}})
  setTimeout(async()=>{
    await BookInfoModel.deleteOne({"_id" : details.id});
  },10000)
 
  console.log("deletion done");
}else{
  const postDetails = await BookInfoModel.create({
    title: details.title,
    author: details.author,
    review: details.review,
    rate: details.rate,
    name: details.name,
    mobile: details.mobile,
    email: details.email,
    isRented : false,
    myFile :details.myFile
  });
}
 
});




app.get("/display", async (req, res) => {
  const details = await BookInfoModel.find({});
  res.send(details);
});
app.listen(4040);
