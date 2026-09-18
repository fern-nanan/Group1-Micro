// 1. Target DOM Nodes (Matching Slide 7)

// Grab the Category Name text box so we can read/clear what the user typed.
const categoryNameInput = document.getElementById("txtCatName");
// Grab the Description text box so we can read/clear what the user typed.
const categoryDescInput = document.getElementById("txtCatDesc");
// Grab the "Save Category" button so we can listen for clicks on it.
const addCategoryBtn = document.getElementById("btnAdd");
// Grab the <tbody> element where new table rows will be added.
const incomeTableBody = document.getElementById("listIncomeCat");

// 2. Attach Non-Inline Event Listener

// When the Save Category button is clicked, run the handleAddCategory function.
// (We use addEventListener instead of an inline onclick="" attribute in the HTML.)
addCategoryBtn.addEventListener("click", handleAddCategory);

// 3. Controller Action

// This function runs every time the Save Category button is clicked.
function handleAddCategory() {

  // Read the text typed in the Category Name box and remove extra spaces.
  const catName = categoryNameInput.value.trim();
  // Read the text typed in the Description box and remove extra spaces.
  const catDesc = categoryDescInput.value.trim();

  // Guard Clause Validation
  // If either box is empty, warn the user and stop the function early.
  if (!catName || !catDesc) {
    alert("Please complete both input fields.");
    return;
  }

  // Construct Row Markup
  // Build the HTML for a new table row using the values the user typed.
  // The third <td> is new: it holds a red "Delete" button for this row.
  //   - "btn-danger" is a Bootstrap class that makes the button red.
  //   - "btn-sm" makes the button smaller so it fits nicely in the table.
  //   - "delete-btn" is a custom class we use later to detect delete clicks.
  const newRowHTML = `
<tr>
<td class="fw-semibold text-dark">${catName}</td>
<td class="text-secondary">${catDesc}</td>
<td class="text-center">
  <button type="button" class="btn btn-danger btn-sm delete-btn">
    Delete
  </button>
</td>
</tr>
`;

  // Dynamic RAM Insertion
  // Insert the new row HTML just before the closing tag of the table body,
  // which visually adds it as the last row in the table.
  incomeTableBody.insertAdjacentHTML("beforeend", newRowHTML);

  // Reset Inputs & Refocus
  // Clear the Category Name box so the user can type a new entry.
  categoryNameInput.value = "";
  // Clear the Description box so the user can type a new entry.
  categoryDescInput.value = "";
  // Move the text cursor back into the Category Name box for convenience.
  categoryNameInput.focus();
}

// 4. Delete Button Handling (Event Delegation)

// Instead of adding a separate click listener to every single Delete button
// (which would be a lot of listeners), we add ONE listener to the table body.
// This one listener "catches" clicks on any button inside it, even buttons
// that get added later by handleAddCategory. This trick is called
// "event delegation."
incomeTableBody.addEventListener("click", function (event) {

  // event.target is whatever element was actually clicked.
  // Here we check if that element has the "delete-btn" class,
  // meaning the user clicked a Delete button (and not somewhere else).
  if (event.target.classList.contains("delete-btn")) {

    // Mandatory DOM traversal technique:
    // event.target.closest('tr') starts at the clicked Delete button and
    // walks UP the HTML structure until it finds the nearest <tr> (table row)
    // that contains it. This gives us the exact row the button belongs to.
    // .remove() then deletes that row from the page.
    // Because we always start from the button that was clicked, this only
    // removes that one row, never any other row in the table.
    event.target.closest('tr').remove();
  }
});