const form = document.getElementById("form");
const recordsContainer = document.getElementById("records-container");
const createButton = document.getElementById("button");
const employeeList = [];

let empId = 1000;

const onSubmitForm = (event) => {
    //event.target = form element
    event.preventDefault();
    const employee = {
        employeeId: ++empId,
        name: event.target.name.value,//here we are extracting html elements before using .value
        salary: event.target.salary.value,
        role: event.target.role.value,
        team: event.target.team.value,
        companyName: event.target.companyName.value
    }

    // console.log(employee);
    addNewEmployeeRecord(employee);
    //after adding an employee reset the input values inside the form.
    form.reset();
}

function fillFormWithData(employee) {
    /*{ 
     employeeId: ++empId,
         name: event.target.name.value,//here we are extracting html elements before using .value
         salary: event.target.salary.value,
         role: event.target.role.value,
         team: event.target.team.value,
         companyName: event.target.companyName.value
    }
    */
    for (let key in employee) {
        if (key !== "employeeId") {
            form[key].value = employee[key];
        }
    }
     createButton.innerText = "Update Employee";
}
function editRecord(event) {
    // console.log(event.target);
    //get the data of that record
    //fill the form with that data.
    //change the innerText of the submit button to 'Update Employee'

    const editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-empid"));

    for (let i = 0; i < employeeList.length; i++) {
        if (currentEmployeeId === employeeList[i].employeeId) {
            fillFormWithData(employeeList[i]);
            console.log(employeeList[i]);
            break;
        }
    }

}
function deleteRecord(event) {
    // console.log(event.target); deleteButton reference  = event.targert;

    const deleteButton = event.target;
    const record = deleteButton.parentNode.parentNode;// the record is entire tr element <tr></tr>
    record.remove();// removes tr element from the dom tree

    const currentEmployeeId = parseInt(deleteButton.getAttribute("data-empid"));
    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employeeId === currentEmployeeId) {
            employeeList.splice(i, 1);
            break;
        }
    }
}

//this function will add new employee
function addNewEmployeeRecord(employee) {
    //takes an employee object as input and adds that object as a record inside the table.
    //creating  table row and append inside the records-container

    const record = document.createElement("tr");

    for (let key in employee)//this for in will iterate on keys 
    {
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.appendChild(cell);
    }

    const optionCell = document.createElement("td");
    const editIcon = document.createElement("span");
    editIcon.className = "material-icons icon";
    editIcon.innerText = "edit";
    editIcon.addEventListener("click", editRecord);
    editIcon.setAttribute("data-empId", employee.employeeId)

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons icon";
    deleteIcon.innerText = "delete";
    deleteIcon.addEventListener("click", deleteRecord);
    deleteIcon.setAttribute("data-empId", employee.employeeId);

    optionCell.append(editIcon, deleteIcon);
    record.appendChild(optionCell);

    // record.appendChild(editIcon);
    // record.appendChild(deleteIcon);

    recordsContainer.appendChild(record);

    employeeList.push(employee);//add the newly created employee to the global employeeList
}
form.addEventListener("submit", onSubmitForm);