// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// create a function to load data from local storage
function readTasksFromStorage() {
    // Retrieve tasks from localStorage
    let existingData = localStorage.getItem('tasks');
    // If there are no tasks in localStorage
    if (!existingData) {
        // initialise an empty array and return it
        return [];
    }
    // otherwise, parse the JSON to an array
    return JSON.parse(existingData);
}

// create a function that accepts an array of tasks
function saveTasksToStorage(task) {
    // stringifies them and saves them to local storage
    localStorage.setItem('tasks', JSON.stringify(task));
}

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
    // Create a new div element for the card and add the classes 'card', 'task-card', 'draggable' and 'my-3'. Also add a `data-task-id` attribute and set it to the task id.
    const taskCard = $('<div>');
    taskCard.addClass(`card task-card draggable my-3`);
    taskCard.attr(`data-task-id`, task.id);
    // Create a new div element for the card header and add the classes `card-header` and `h4`. Also set the text of the card header to the task name.
    const cardHeaderEl = $(`<div>`);
    cardHeaderEl.addClass(`card-header h4`);
    cardHeaderEl.text(task.name);
    // Create a new div element for the card body and add the class `card-body`.
    const cardBodyEl = $(`<div>`);
    cardBodyEl.addClass(`card-body`);
    // Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the task type.
    const cardTypeEl = $(`<p>`);
    cardTypeEl.addClass(`card-text`);
    cardTypeEl.text(task.type);
    // Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the task due date.
    const cardDateEl = $(`<p>`);
    cardDateEl.addClass(`card-text`);
    cardDateEl.text(task.dueDate);
    // Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-task-id` attribute and set it to the task id.
    const cardDeleteBtn = $(`<button>`);
    cardDeleteBtn.addClass(`btn btn-danger delete`);
    cardDeleteBtn.text(`Delete`);
    cardDeleteBtn.attr(`data-task-id`, task.id);
    
    // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        // If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
        taskCard.addClass('bg-danger text-white');
        cardDeleteBtn.addClass('border-light');
        }
    }

    // Append the card description, card due date, and card delete button to the card body.
    cardTypeEl.appendTo(cardBodyEl);
    cardDateEl.appendTo(cardBodyEl);
    cardDeleteBtn.appendTo(cardBodyEl);
    // Append the card header and card body to the card.
    cardHeaderEl.appendTo(taskCard);
    cardBodyEl.appendTo(taskCard);
    // Return the card so it can be appended to the correct lane.
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Retrieve tasks from localStorage
    const tasks = readTasksFromStorage();

    // Empty existing task cards out of the lanes
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Loop through each of the stored tasks and create task cards for each status
    for (let task of tasks) {
        if (task.status == "to-do") {
            todoList.append(createTaskCard(task));
        } else if (task.status === "in-progress") {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === "done") {
            doneList.append(createTaskCard(task));
        }
    }

    // Use JQuery UI to make task cards draggable
    $('.draggable').draggable({
        // sets the opacity of the CLONE task card being dragged to 70%
        opacity: 0.7,
        // ensures that the clone card is positioned above everything, so that users can see where the task cards are being dragged
        zIndex: 100,
        // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // Checks if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
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
