// A--> Select DOM
const todoInput = document.querySelector("#new-task-input");
const addButton = document.querySelector("#add-icon");
const taskList = document.querySelector("#tasks");
const filters = document.querySelector(".filters");
var taskCount = document.getElementById('task-count');

// B--> Event Listeners

addButton.addEventListener('click', addTodo);
taskList.addEventListener('click', completeTodo);
taskList.addEventListener('click', deleteTodo);
filters.addEventListener('click', filterTodo);

// C--> Functions
function addTodo(e){
	// Prevent natural behavious
	e.preventDefault();

	const taskInput = todoInput.value;
	// Alert for empty task

	if(!taskInput){
		alert('Task cannot be empty...');
		return;
	}

	// Structure creation as shown from html file from line no. 34 in index.html
	const task = document.createElement('div');
	task.classList.add('task');

	// Add checkbox
	const checkboxDiv = document.createElement('div');
	checkboxDiv.classList.add('checkbox');
	task.appendChild(checkboxDiv);
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkboxDiv.appendChild(checkbox);
	

	// Create taskInputElement content of a task
	const taskContentElement = document.createElement('div');
	taskContentElement.classList.add('content');

	task.appendChild(taskContentElement);

	const taskInputElement = document.createElement('input');
	taskInputElement.classList.add('text');
	taskInputElement.type = 'text';
	taskInputElement.value = taskInput;
	taskInputElement.setAttribute('readonly', 'readonly');

	taskContentElement.appendChild(taskInputElement);

	// Action buttons
	const taskActionElement = document.createElement('div');
	taskActionElement.classList.add('actions');
	
	//Create Completed Button
	const completedButton = document.createElement("button");
	completedButton.classList.add('mark-as-complete')
	completedButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
	taskActionElement.appendChild(completedButton);

	// Create Edit button
	const editButton = document.createElement('button');
	editButton.classList.add('edit');
	editButton.innerText = "Edit";
	taskActionElement.appendChild(editButton);

	// Create Delete button
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete');
	deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
	taskActionElement.appendChild(deleteButton);

	task.appendChild(taskActionElement);

	taskList.appendChild(task);

	todoInput.value = '';

	// To count the remaining tasks
	var countOfTasks = taskList.childElementCount;
	taskCount.innerText = countOfTasks;

	// Action for Edit button of a task
	editButton.addEventListener('click', (e) => {
		if (editButton.innerText.toLowerCase() == "edit") {
			editButton.innerText = "Save";
			taskInputElement.removeAttribute("readonly");
			taskInputElement.style.color = "black";
			taskInputElement.focus();
		} else {
			editButton.innerText = "Edit";
			taskInputElement.setAttribute("readonly", "readonly");
		}
	});

}

// Function to mark-as-complete a task
function completeTodo(e){
	const completeIcon = e.target;
	if (completeIcon.classList[0] === "mark-as-complete") {
		const taskItem = completeIcon.parentElement.parentElement;
		taskItem.classList.toggle("completed");
	}
}

// Function to delete a task
function deleteTodo(e){
	const deleteIcon = e.target; 
	if(deleteIcon.classList[0] === 'delete'){
		const taskItem = deleteIcon.parentElement.parentElement;
		taskItem.classList.add("fall");
		taskItem.addEventListener("transitionend" , e => {
			taskItem.remove();
			// Handling task count
			var countOfTasks = taskList.childElementCount;
       		taskCount.innerText = countOfTasks;
		});
	}
}

// Function to filter tasks
function filterTodo(e) {
	const tasksNodes = taskList.children;
	const tasks = [...tasksNodes];
	
	tasks.forEach(function(item) {
	  switch (e.target.innerText.toLowerCase()) {
		case "all":
		  console.log("1");
		  item.style.display = "flex";
		  break;
		case "completed":
		  if (item.classList.contains("completed")) {
			item.style.display = "flex";
		  } else {
			item.style.display = "none";
		  }
		  break;
		case "uncompleted":
		  if (!item.classList.contains("completed")) {
			item.style.display = "flex";
		  } else {
			item.style.display = "none";
		  }
	  }
	});
}


