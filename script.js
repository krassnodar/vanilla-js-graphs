const deleteButtonList = document.querySelectorAll(".deleteButton");
const addButtonList = document.querySelectorAll(".addButton");
const calculateButton = document.getElementById("calculateButton");
const tableList = document.getElementsByClassName("table");

const deleteRowHandler = (e) => {
  const rowToDelete = e.target.parentNode.parentNode;
  const parentTable = e.target.parentNode.parentNode.parentNode;
  parentTable.removeChild(rowToDelete);
};

const addRowHandler = (e) => {
  const parentTable = e.target.parentNode.childNodes[1].childNodes[1];

  const tableRow = document.createElement("tr");
  const tableDataCellX = document.createElement("td");
  const tableDataCellY = document.createElement("td");
  const tableDataCellButton = document.createElement("td");
  const tableInputX = document.createElement("input");
  const tableInputY = document.createElement("input");
  const deleteButton = document.createElement("button");

  tableInputY.placeholder = "Y";
  tableInputX.placeholder = "X";
  tableInputX.type = "number";
  tableInputY.type = "number";
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", deleteRowHandler);

  tableDataCellX.appendChild(tableInputX);
  tableDataCellY.appendChild(tableInputY);
  tableDataCellButton.appendChild(deleteButton);

  tableRow.appendChild(tableDataCellX);
  tableRow.appendChild(tableDataCellY);
  tableRow.appendChild(tableDataCellButton);

  parentTable.appendChild(tableRow);
};

const adjustTableHandler = (e) => {
  const tableMiddle = document.getElementById("tableMiddle");
  const tableLeft = document.getElementById("tableLeft");
  const rightTable = document.getElementById("tableRight");

  const currentRowsParent = e.target.parentNode.children[0].children[0];

  while (currentRowsParent.children.length != 1) {
    currentRowsParent.removeChild(currentRowsParent.lastElementChild);
  }

  const tableMiddleLength = tableMiddle.childNodes[1].children.length;
  const tableLeftLength = tableLeft.childNodes[1].children.length;

  for (let i = 0; i < Math.min(tableMiddleLength, tableLeftLength) - 1; i++) {
    const tableRow = document.createElement("tr");
    const tableDataCellX = document.createElement("td");
    const tableDataCellY = document.createElement("td");
    const tableInputX = document.createElement("input");
    const tableInputY = document.createElement("input");

    const newValueX =
      (Number(
        tableLeft.childNodes[1].children[i + 1].children[0].children[0].value
      ) +
        Number(
          tableMiddle.childNodes[1].children[i + 1].children[0].children[0]
            .value
        )) /
      2;
    const newValueY =
      (Number(
        tableLeft.childNodes[1].children[i + 1].children[1].children[0].value
      ) +
        Number(
          tableMiddle.childNodes[1].children[i + 1].children[1].children[0]
            .value
        )) /
      2;

    tableInputY.placeholder = "Y";
    tableInputX.placeholder = "X";
    tableInputX.type = "number";
    tableInputY.type = "number";
    tableInputX.value = newValueX;
    tableInputY.value = newValueY;

    tableDataCellX.appendChild(tableInputX);
    tableDataCellY.appendChild(tableInputY);

    tableRow.appendChild(tableDataCellX);
    tableRow.appendChild(tableDataCellY);
    rightTable.childNodes[1].appendChild(tableRow);
  }

  generateGraphs();
};

const generateGraphs = () => {
  Array.from(tableList).forEach((table) => {
    const polyline = table.parentNode.children[2].children[0].children[0];
    const rows = table.childNodes[1].children;

    const inputValues = Array.from(rows)
      .map((row) => {
        if (row.className === "skip") {
          return;
        }

        return {
          x: row.children[0].children[0].value,
          y: row.children[1].children[0].value,
        };
      })
      .filter((value) => value);

    const polylinePoints = inputValues
      .map((obj) => {
        return `${obj.x},${100 - obj.y}`;
      })
      .join(" ");

    polyline.setAttribute("points", polylinePoints);
  });
};

calculateButton.addEventListener("click", adjustTableHandler);

addButtonList.forEach((button) => {
  button.addEventListener("click", addRowHandler);
});

deleteButtonList.forEach((button) => {
  button.addEventListener("click", deleteRowHandler);
});
