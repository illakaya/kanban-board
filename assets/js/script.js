// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Used to test generateTaskId(); works or not
// let nextId = [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Generate a string starting with id, a random number that is converted to base 16 and then remove the 2 initial values
    // https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
    // let id = "id"+ Math.random().toString(16).slice(2);
    // console.log(id);
    // if (!nextId.includes(id)) {
    //     nextId.push(id);
    //     return id;
    // }
    // but what happens if the exact same id is generated? do I need to worry about that?
    
    let id = "";
    do {
        // id = "id"+ Math.random().toString(16).slice(2);
        // Try a different notation, refer to 05 Third Party APIs - 28 Student Mini Project
        id = crypto.randomUUID();
    } while (nextId.includes(id));
    nextId.push(id);
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
