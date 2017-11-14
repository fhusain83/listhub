var taskInput = $("#list-item");
var addButton = $("#add-item");
var incompleteTasksHolder = $("#group-list");
var completedTasksHolder = $("#completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = $("<div>");

  //input (checkbox)
  var checkBox = $("<input type = 'checkbox'>  "); // checkbox
  //label
  var label = $("<label>");
  //input (text)
  var editInput = $("<input type = 'text'>"); // text
  //button.edit
  var editButton = $("<button>");
  //button.delete
  var deleteButton = $("<button>");
  
  //Each element needs modifying

  
  editButton.text("Edit");
  editButton.addClass("edit");
  deleteButton.text("Delete");
  deleteButton.addClass("delete");
  label.text(taskString);
  
  
      // each element needs appending
  listItem.append(checkBox);
  listItem.append(label);
  // listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
}

// Add a new task
var addTask = function(event) {
  event.preventDefault();
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.val().trim());
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  // taskInput.value = "";   
}

// Edit an existing task
var editTask = function(event) {
  event.preventDefault();
  console.log("Edit Task...");
  
  var listItem = this.parentNode;
  
  var editInput = this.$("input[type=text]")
  var label = this.$(".label");
  
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
var deleteTask = function(event) {
  event.preventDefault();
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.empty(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  // var checkBox = $("input[type=checkbox]");
  // var editButton = $(".button.edit");
  // var deleteButton = $(".button.delete");
  
  //bind editTask to edit button
  $(".button.edit").on("click", editTask);
  
  //bind deleteTask to delete button
  $(".button.delete").on("click", deleteTask);
  
  //bind checkBoxEventHandler to checkbox
  $("input[type=checkbox]").on("click", checkBoxEventHandler);

}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.on("click", addTask);

$(".edit").on("click", editTask);

// addButton.on("click", function(event){
//   event.preventDefault();
//   addTask();
  
// });
// addButton.on("click", ajaxRequest);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}

