import fs from "fs";

// Recursive function to get files
export function getFiles(dir, files = []) {
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
  
  export function readFileSynchronously(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      // console.log(fileContent);
      return fileContent;
    } catch (error) {
      console.error(error);
    }
  }
  
  export function makeTableBody(fileList) {
    // const fileContent = readFileSynchronously(fileList[0]);
    let lines = [];
    let line = "";
    let tableBody = '';
  
    for (let fn in fileList) {
      let fileContent = readFileSynchronously(fileList[fn]);
      lines = fileContent.split("\n");
      line = makeTableLine(lines.slice(0, 1), lines[1], lines[2]);
      // console.log(line);
      tableBody += line;
    }
    return tableBody;
  }
  
  export function makeTableLine(title, date, author) {
    const line = `
        <tr>
          <td><a href="./blogs/photography/blog_template.txt"></a>${title}</td>
          <td>${date}</td>
          <td>${author}</td>
          <td><button type="button" class="btn btn-light btn-delete">Delete</button></td>
        </tr>`;
  
    return line;
  }
  