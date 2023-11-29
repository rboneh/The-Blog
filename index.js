import { constants } from "buffer";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname + "/public/index.html");

const app = express();
const port = 3000;
var messageBody = {};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// function getBodyFields(req, res, next) {
//   const title = req.body.blogTitle;
//   const email = req.body.authorEmail;
//   const name = req.body.authorName;
//   const text = req.body.blogText;
//   messageBody = req.body;
//   console.log("Email is: " + email);
//   next();
// }

// app.use(getBodyFields);

app.get("/", (req, res) => {
  res.render("index.ejs");
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
  const fileList = getFiles(__dirname + "/views/blogs/photography");
  const tableBody = makeTableBody(fileList);
  res.render("partials/table-photography.ejs", { tableBody: tableBody });
});

app.get("/blog-form", (req, res) => {
  console.log(__dirname + "/public/blog-form.html");
  console.log("Sending blog-form.html");
  res.sendFile(__dirname + "/public/blog-form.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//////////////////////////////////////////////
// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}

function readFileSynchronously(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // console.log(fileContent);
    return fileContent;
  } catch (error) {
    console.error(error);
  }
}

function makeTableBody(fileList) {
  // const fileContent = readFileSynchronously(fileList[0]);
  let lines = [];
  let line = "";
  let tableBody = "";

  for (let fn in fileList) {
    let fileContent = readFileSynchronously(fileList[fn]);
    lines = fileContent.split("\n");
    line = makeTableLine(lines.slice(0, 1), lines[1], lines[2]);
    // console.log(line);
    tableBody += line;
  }
  return tableBody;
}

function makeTableLine(title, date, author) {
  const line = `
      <tr>
        <td><a href="./blogs/photography/blog_template.txt"></a>${title}</td>
        <td>${date}</td>
        <td>${author}</td>
        <td><button type="button" class="btn btn-light btn-delete">Delete</button></td>
      </tr>`;

  return line;
}
