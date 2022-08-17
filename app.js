//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://HIMANSHUKUMARSINGH:blog123@cluster0.vujdt.mongodb.net/blogDB",{useNewUrlParser:true, useUnifiedTopology: true });

const homeStartingContent = "We don’t believe in beating our own trumpet. All we want to say, if your digital team is spending more time in the smoking zone or your website seems like vintage cars or your SEO articles are loathed by google uncle or mobile apps designed by you have no takers in the market, you desperately need us.In short, we are a well-established web designing company with a work station in Ranibagh and other parts of Delhi. Now the question comes, what are other reasons besides the ones mentioned at the beginning that make us inevitable? For answers, you have to scroll a bit, we bet, you will not be disappointed.We don’t believe in beating our own trumpet. All we want to say, if your digital team is spending more time in the smoking zone or your website seems like vintage cars or your SEO articles are loathed by google uncle or mobile apps designed by you have no takers in the market, you desperately need us.In short, we are a well-established web designing company with a work station in Ranibagh and other parts of Delhi. Now the question comes, what are other reasons besides the ones mentioned at the beginning that make us inevitable? For answers, you have to scroll a bit, we bet, you will not be disappointed.";
const aboutContent = "We are always passionate about transparency, reliability, and customer care. We understand business goals and deliver according to business values. Our web development exponents know how to create online success. Being experts in WordPress development, we create custom backed-end solutions, specifically for you. Now just have a glimpse of what we do for you: Custom themes for your business, Integration with Analytical & Social Media and Simple Site Administration.Our clients are our assets. For us, our clients’ size doesn’t matter. From big corporate to small companies, we serve all with equal honesty, integrity, commitment and dedication and in return, we only expect a few words of appreciation. Here is a list of industries we serve: Biotech, Accounting, Software, Healthcare, Engineering Financial, Technology and Consulting";
const contactContent = "Our clients are our assets. For us, our clients’ size doesn’t matter. From big corporate to small companies, we serve all with equal honesty, integrity, commitment and dedication and in return, we only expect a few words of appreciation. Here is a list of industries we serve: Biotech, Accounting, Software, Healthcare, Engineering Financial, Technology and Consulting.We understand business goals and deliver according to business values. Our web development exponents know how to create online success. Being experts in WordPress development, we create custom backed-end solutions, specifically for you. Now just have a glimpse of what we do for you: Custom themes for your business, Integration with Analytical & Social Media and Simple Site Administration.Our clients are our assets.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});

const post = mongoose.model("post",postSchema);

const postobject1 = new post({
  title:"HOME",
  content:homeStartingContent
});

app.get("/",function(req,res){
  post.find(function(err,founditem){
    if(!err){
      if(founditem.length===0){
        postobject1.save();
        res.redirect("/")
      }else{
        res.render("home",{postarr:founditem});
      }
    }
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutheading:"ABOUT",aboutcontent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactheading:"CONTACT",contactcontent:contactContent});
});

app.get("/compose",function(req,res){

  res.render("compose");
});

app.post("/compose",function(req,res){
  var postobject2 = new post({
    title:req.body.composeinput,
    content:req.body.composeinput1
  });
postobject2.save();
res.redirect("/");
});

app.get("/posts/:customListName",function(req,res){
  const customtitle = req.params.customListName;
  post.findOne({title:customtitle},function(err,fitem){
      res.render("post",{posttitl:fitem.title,postconten:fitem.content});

  });
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
