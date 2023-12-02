import { constants } from "buffer";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

import * as u from "./public/utilities.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dirName = dirname(fileURLToPath(import.meta.url));;
// console.log(__dirname + "/public/index.html");

const app = express();
const port = 3000;
var messageBody = {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getBodyFields(req, res, next) {
  // const title = req.body.blogTitle;
  // const email = req.body.authorEmail;
  // const name = req.body.authorName;
  // const text = req.body.blogText;
  const messageBody = req.body;
  // console.log("Email is: " + email);
  // console.log(text);
  next();
}

app.use(getBodyFields);

app.get("/", (req, res) => {
  res.render("partials/index.ejs");
  // res.sendFile(__dirname + "/public/index.html");
  // res.sendStatus(201);
  // console.log("Manage get / request");
});

app.get("/home", (req, res) => {
  res.render("index.ejs");
  // res.sendFile(__dirname + "/public/index.html");
  // res.sendStatus(201);
  // console.log("Manage get / request");
});

app.get("/about", (req, res) => {
  // res.render("about.ejs");
  res.sendStatus(201);
});

app.get("/contact", (req, res) => {
  // res.render("contact.ejs");
  res.sendStatus(201);
});

app.get("/photography", (req, res) => {
  // console.log('manage /photo');
  const fileList = u.getFiles(__dirname + "/views/blogs/photography");
  const tableBody = u.makeTableBody(fileList);
  res.render("partials/index.ejs", {
    tableBody: tableBody,
    themeImage: "https://picsum.photos/id/91/800/200?random=1",
  });
});

app.get("/blog-form", (req, res) => {
  const filePath = __dirname + "/views/partials/blog-form.ejs";
  const blogForm = u.readFileSynchronously(filePath);
  res.render("partials/index.ejs", {
    blogForm: blogForm,
    themeImage: "https://picsum.photos/id/180/800/100?random=1",
  });
});

app.post("/new-blog", (req, res) => {
  // Your code here
  const formData = req.body;
  // console.log(formData);

  // writing new blog to db  
  u.createBlogFile(formData, dirName);

  //sending client update blogs table
  const fileList = u.getFiles(__dirname + "/views/blogs/photography");
  const tableBody = u.makeTableBody(fileList);
  res.render("partials/index.ejs", {
    tableBody: tableBody,
    themeImage: "https://picsum.photos/id/91/800/200?random=1",
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
