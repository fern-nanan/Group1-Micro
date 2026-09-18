# Group1-Micro
# Enterprise Income Category Ledger

A simple web page for registering income categories and viewing them in a table. Built with HTML, Bootstrap 5, and plain JavaScript (no frameworks).

## What It Does

- You type a **Category Name** and a **Description**, then click **Save Category**.
- The new category is added as a row at the bottom of the **Registered Categories** table.
- Each row has a red **Delete** button that removes just that row.
- If you click Save Category without filling in both fields, an alert pops up and no row is added.

## Project Structure

```
income-ledger/
├── index.html      # The page layout: form, table, and links to CSS/JS
├── css/
│   └── style.css   # Small custom styles (font, column width, input focus glow)
└── js/
    └── app.js      # All the interactive logic (adding and deleting rows)
```

## How It Works (High Level)

1. **index.html** builds the page using Bootstrap for styling: a card with the input form on top, and a card with a table below it. The table's `<tbody>` starts empty — rows are added by JavaScript.
2. **style.css** adds a few extra touches Bootstrap doesn't cover by default, like a fixed width for the Category Name column and a blue glow when an input is focused.
3. **app.js** does the actual work:
   - Listens for a click on **Save Category**, reads the two input boxes, checks they aren't empty, then builds and inserts a new table row (including a Delete button).
   - Listens for clicks anywhere inside the table body. If the click came from a Delete button, it finds that button's parent row using `event.target.closest('tr')` and removes it with `.remove()`.
   - Clears the input boxes and refocuses the Category Name box after each save.

## Key Concepts Demonstrated

- **DOM selection** — grabbing elements with `document.getElementById`.
- **Event listeners** — using `addEventListener` instead of inline `onclick` attributes.
- **Event delegation** — one listener on the table body handles clicks for every Delete button, even ones added later.
- **DOM traversal** — `closest('tr')` walks up from a clicked button to find its containing row.
- **Dynamic HTML insertion** — `insertAdjacentHTML` adds new rows to the table without reloading the page.

## How to Run

Just open `index.html` in a web browser. No installation or build steps needed (Bootstrap is loaded from a CDN).