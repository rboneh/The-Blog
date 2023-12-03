import { constants } from "buffer";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

import * as u from "./public/utilities.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dirName = dirname(fileURLToPath(import.meta.url));
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
  const tableBody = u.makeTableBody(fileList, "Photography");
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

app.post("/get-blog", (req, res) => {
  const reqBody = req.body;
  // console.log("get-blog:");
  // console.log(reqBody);

  const fDate = u.date4fileName(reqBody.fileDate);
  const fileName = `/views/blogs/${reqBody.blogsId}/${reqBody.fileName}-${fDate}.txt`;
  const filePath = __dirname + fileName;
  const blog = u.readFileSynchronously(filePath);
  const fBlog = u.formatBlog(blog);

  // console.log(fBlog);
  res.render("partials/index.ejs", {
    blogForm: fBlog,
    themeImage: "https://picsum.photos/id/180/800/100?random=1",
  });
  // res.sendStatus(201);
});

app.post("/new-blog", (req, res) => {
  // Your code here
  const formData = req.body;
  // console.log(formData);

  // writing new blog to db
  const blogObj = u.createBlogFile(formData, dirName);

  fs.writeFile(blogObj.filePath, blogObj.nBlog, function (err) {
    if (err) throw err;
    console.log("Saved!");

    // Read the files or render the updated page after the writing process is complete
    const fileList = u.getFiles(__dirname + "/views/blogs/photography");
    //console.log(fileList);
    const tableBody = u.makeTableBody(fileList, formData.postId);
    res.render("partials/index.ejs", {
      tableBody: tableBody,
      themeImage: "https://picsum.photos/id/91/800/200?random=1",
    });
  });

  //sending client update blogs table
  // const fileList = u.getFiles(__dirname + "/views/blogs/photography");
  // console.log(fileList);
  // const tableBody = u.makeTableBody(fileList, formData.postId);
  // res.render("partials/index.ejs", {
  //   tableBody: tableBody,
  //   themeImage: "https://picsum.photos/id/91/800/200?random=1",
  // });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
