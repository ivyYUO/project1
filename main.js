const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClear = document.getElementById("btnClear");
const btnClearItems = document.getElementById("btnClearItems");
const btnGetTotal = document.getElementById("btnGetTotal");
const btnIdentifyHighLow = document.getElementById("btnIdentifyHighLow");
const sortOrder = document.getElementById("sortOrder");
const tblRecords = document.getElementById("tblRecords");

let arrRecords = [];
const tblTHsLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

// Initialize status message
if (arrRecords.length === 0) {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
} else {
    document.getElementById("status").style.display = "none";
}

// Insert or Update Record
btnInsertUpdate.addEventListener("click", () => {
    const inputTxt = document.querySelectorAll("#tblInput input");

    if (btnInsertUpdate.value === "insert") {
        // Validate inputs
        for (const txt of inputTxt) {
            if (txt.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        // Create a new record
        let infoRecord = {
            fname: inputTxt[0].value.trim(),
            mname: inputTxt[1].value.trim(),
            lname: inputTxt[2].value.trim(),
            age: parseInt(inputTxt[3].value.trim()),
        };

        // Clear input fields
        for (const txt of inputTxt) {
            txt.value = "";
        }

        // Add record to array
        arrRecords.push(infoRecord);
        iterateRecords();

    } else {
        // Update existing record
        for (const txt of inputTxt) {
            if (txt.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        const index = parseInt(btnInsertUpdate.value);
        arrRecords[index].fname = inputTxt[0].value.trim();
        arrRecords[index].mname = inputTxt[1].value.trim();
        arrRecords[index].lname = inputTxt[2].value.trim();
        arrRecords[index].age = parseInt(inputTxt[3].value.trim());

        iterateRecords();

        // Clear input fields and reset button
        for (const txt of inputTxt) {
            txt.value = "";
        }

        btnInsertUpdate.innerHTML = "Insert";
        btnInsertUpdate.value = "insert";
    }
});

// Clear Entry
btnClear.addEventListener("click", () => {
    const inputTxt = document.querySelectorAll("#tblInput input");

    for (const txt of inputTxt) {
        txt.value = "";
    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
});

// Clear All Items
btnClearItems.addEventListener("click", () => {
    arrRecords = [];

    while (tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";
});

// Get Total Age
btnGetTotal.addEventListener("click", () => {
    if (arrRecords.length === 0) {
        alert("No records available!");
        return;
    }

    const totalAge = arrRecords.reduce((sum, record) => sum + record.age, 0);
    alert(`Total Age: ${totalAge}`);
});

// Identify Highest and Lowest Age
btnIdentifyHighLow.addEventListener("click", () => {
    if (arrRecords.length === 0) {
        alert("No records available!");
        return;
    }

    let highestAgeRecord = arrRecords.reduce((prev, current) => (prev.age > current.age) ? prev : current);
    let lowestAgeRecord = arrRecords.reduce((prev, current) => (prev.age < current.age) ? prev : current);

    alert(`Highest Age: ${highestAgeRecord.age} (${highestAgeRecord.fname} ${highestAgeRecord.lname})\nLowest Age: ${lowestAgeRecord.age} (${lowestAgeRecord.fname} ${lowestAgeRecord.lname})`);
});

// Sort Records
sortOrder.addEventListener("change", () => {
    if (arrRecords.length === 0) {
        alert("No records available!");
        return;
    }

    const order = sortOrder.value;

    if (order === "asc") {
        arrRecords.sort((a, b) => a.age - b.age); // Ascending
    } else if (order === "desc") {
        arrRecords.sort((a, b) => b.age - a.age); // Descending
    }

    iterateRecords();
});

// Iterate Records and Update Table
function iterateRecords() {
    while (tblRecords.hasChildNodes()) {
        tblRecords.removeChild(tblRecords.firstChild);
    }

    if (arrRecords.length > 0) {
        document.getElementById("status").style.display = "none";

        // Create Table Header
        const tblHeaderRow = document.createElement("tr");
        const tblHeader = document.createElement("thead");
        tblHeaderRow.style.borderTop = "1px solid black";
        tblHeaderRow.style.borderBottom = "1px solid black";

        for (let i = 0; i < 5; i++) {
            const tblTHs = document.createElement("th");
            tblTHs.style.padding = "5px";

            if (i !== 4) {
                tblTHs.style.borderRight = "1px solid black";
            }

            tblTHs.innerHTML = tblTHsLabels[i];
            tblHeaderRow.appendChild(tblTHs);
        }

        tblHeader.appendChild(tblHeaderRow);
        tblRecords.appendChild(tblHeader);

        // Create Table Body
        const tblBody = document.createElement("tbody");

        arrRecords.forEach((rec, i) => {
            const tblRow = document.createElement("tr");
            const tbdataFname = document.createElement("td");
            const tbdataMname = document.createElement("td");
            const tbdataLname = document.createElement("td");
            const tbdataAge = document.createElement("td");
            const tbdataActionBtn = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnUpdate = document.createElement("button");

            tbdataFname.style.borderRight = "1px solid black";
            tbdataFname.style.padding = "10px";

            tbdataMname.style.borderRight = "1px solid black";
            tbdataMname.style.padding = "10px";

            tbdataLname.style.borderRight = "1px solid black";
            tbdataLname.style.padding = "10px";

            tbdataAge.style.borderRight = "1px solid black";
            tbdataAge.style.padding = "10px";

            tbdataActionBtn.style.padding = "10px";

            tblRow.style.borderBottom = "1px solid black";

            tbdataFname.innerHTML = rec.fname;
            tbdataMname.innerHTML = rec.mname;
            tbdataLname.innerHTML = rec.lname;
            tbdataAge.innerHTML = rec.age;

            btnDelete.innerHTML = "Delete";
            btnDelete.setAttribute("onclick", `deleteData(${i})`);
            btnDelete.style.marginRight = "5px";

            btnUpdate.innerHTML = "Edit";
            btnUpdate.setAttribute("value", "update");
            btnUpdate.setAttribute("onclick", `updateData(${i})`);
            btnUpdate.style.marginRight = "5px";

            tbdataActionBtn.appendChild(btnDelete);
            tbdataActionBtn.appendChild(btnUpdate);

            tblRow.appendChild(tbdataFname);
            tblRow.appendChild(tbdataMname);
            tblRow.appendChild(tbdataLname);
            tblRow.appendChild(tbdataAge);
            tblRow.appendChild(tbdataActionBtn);

            tblBody.appendChild(tblRow);
        });

        tblRecords.appendChild(tblBody);

    } else {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
    }
}

// Delete Record
function deleteData(i) {
    arrRecords.splice(i, 1);
    iterateRecords();
}

// Update Record
function updateData(i) {
    const inputTxt = document.querySelectorAll("#tblInput input");

    inputTxt[0].value = arrRecords[i].fname;
    inputTxt[1].value = arrRecords[i].mname;
    inputTxt[2].value = arrRecords[i].lname;
    inputTxt[3].value = arrRecords[i].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = `${i}`;
}