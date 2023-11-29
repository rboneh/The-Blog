// const navLink = document.querySelector('.nav-link');
// navLink.addEventListener('click', () => {
//   console.log('Got the GET request');
//   sendRequest('/photography', 'GET');
// });

function sendRequest(url, method) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle successful response
      console.log("GET request successful: ", xhr.responseText);
      // Replace the entire page with the new EJS content
      document.documentElement.innerHTML = xhr.responseText;

      // Reload the table.js script
      const scriptElement = document.createElement("script");
      scriptElement.src = "table.js";
      document.body.appendChild(scriptElement);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Handle error response
      console.error("GET request failed: ", xhr.status);
    }
  };
  xhr.send();
}

function sendBlogformRequest(url, method) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle successful response
      console.log("GET request successful: ", xhr.responseText);
      // Replace the entire page with the new HTML content
      const newHTMLContent = document.createElement("div");
      newHTMLContent.innerHTML = xhr.responseText;
      document.body.replaceChild(newHTMLContent, document.body);

      // Reload the table.js script
      const scriptElement = document.createElement("script");
      scriptElement.src = "blog-form.js";
      document.body.appendChild(scriptElement);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Handle error response
      console.error("GET request failed: ", xhr.status);
    }
  };
  xhr.send();
}
