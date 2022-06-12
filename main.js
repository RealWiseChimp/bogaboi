function addRow(table, name, tags) {
  let newRow = document.createElement("tr");
  let nameTd = document.createElement("td");
  nameTd.textContent = name;
  newRow.appendChild(nameTd);

  let tagsTd = document.createElement("td");
  tags.forEach(el => {
    tagEl = document.createElement("a");
    tagEl.textContent = el;
    tagsTd.appendChild(tagEl);
  });
  newRow.appendChild(tagsTd);

  table.appendChild(newRow);
}

async function loadData() {
  let text = await (await fetch("data.csv", null)).text();
  text = text.split("\n").filter(el => el.length > 0);

  for (let i = 0; i < text.length; i += 1)
  {
    const row = text[i].split(",");
    text[i] = { "name": row[0], "tags": row.slice(1) };
  }

  return text;
}

async function main() {
  let table = document.getElementById("data");
  const data = await loadData();

  data.forEach(el => {
    addRow(table, el.name, el.tags);
  });
}