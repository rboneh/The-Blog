const tableBody = document.querySelector("#dataTable tbody");
const addButton = document.querySelector("#addButton");



tableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "BUTTON" && target.textContent === "Delete") {
    const row = target.closest("tr");
    row.remove();
  }
});

addButton.addEventListener("click", () => {
  // Create a new row element
  const newRow = document.createElement("tr");

  // Create cells for title, date, and author
  const titleCell = document.createElement("td");
  const dateCell = document.createElement("td");
  const authorCell = document.createElement("td");
  const actionCell = document.createElement("td");

  // Add input fields for title, date, and author
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter title";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.placeholder = "Enter date";
  const authorInput = document.createElement("input");
  authorInput.type = "text";
  authorInput.placeholder = "Enter author";

  // Add delete button

  // Declare the variable for the button element
  const deleteButton = document.createElement("button");
  // Set the button text content
  // Add button classes and type
  deleteButton.textContent = "Delete";
  deleteButton.className += "btn btn-light btn-delete";
  deleteButton.type += "button";
  // Add event listener to the delete button
  deleteButton.addEventListener("click", () => {
    newRow.remove();
  });

  // Append cells to the row
  titleCell.appendChild(titleInput);
  dateCell.appendChild(dateInput);
  authorCell.appendChild(authorInput);
  actionCell.appendChild(deleteButton);
  newRow.appendChild(titleCell);
  newRow.appendChild(dateCell);
  newRow.appendChild(authorCell);
  newRow.appendChild(actionCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);
});


// const tableBody = document.querySelector("#dataTable tbody");
// const addButton = document.querySelector("#addButton");



// tableBody.addEventListener("click", (event) => {
//   const target = event.target;

//   if (target.tagName === "BUTTON" && target.textContent === "Delete") {
//     const row = target.closest("tr");
//     row.remove();
//   }
// });

// addButton.addEventListener("click", () => {
//   // Create a new row element
//   sendBlogformRequest('/blog-form', 'GET');
// });

