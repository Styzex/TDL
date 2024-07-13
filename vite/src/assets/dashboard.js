import { createClient } from '@supabase/supabase-js';
import { signOut } from './auth-handling.js';
import { loadBlocks, saveBlocks } from './user-data.js';

async function initializeDashboard() {
  const blocks = await loadBlocks();
  if (blocks && blocks.length > 0) {
    blocks.forEach(blockData => addBlockWithData(blockData));
  }
}

// Function to create a new block with provided data
function addBlockWithData(blockData) {
  let blocksContainer = document.getElementById('blocks-container');
  let block = document.createElement('div');
  block.className = 'block';
  block.id = blockData.id; // Assuming each block has an ID

  let blockNameInput = document.createElement('input');
  blockNameInput.type = 'text';
  blockNameInput.value = blockData.name || 'New Block';
  blockNameInput.className = 'block-name';
  blockNameInput.placeholder = 'Rename Block';
  blockNameInput.addEventListener('input', function(event) {
    blockData.name = event.target.value; // Update blockData with new name
  });

  let todosContainer = document.createElement('div');
  todosContainer.className = 'todos';
  todosContainer.addEventListener('dragover', handleDragOver);
  todosContainer.addEventListener('drop', handleDrop);

  if (blockData.todos && blockData.todos.length > 0) {
    blockData.todos.forEach(todoData => addTodoWithData(todosContainer, todoData));
  }

  // Add button to add todos to the block
  let addTodoButton = document.createElement('button');
  addTodoButton.innerHTML = '<img src="/vite/icons/square-plus.svg" alt="Add Todo"/>';
  addTodoButton.addEventListener('click', function(event) {
    event.preventDefault();
    addTodoToBlock(todosContainer);
  });

  // Add button to remove todos from the block
  let removeTodoButton = document.createElement('button');
  removeTodoButton.innerHTML = '<img src="/vite/icons/square-minus.svg" alt="Remove Todo"/>';
  removeTodoButton.addEventListener('click', function(event) {
    event.preventDefault();
    removeTodoFromBlock(todosContainer);
    saveBlocks(getBlocksData()); // Save after removing todo
  });

  // Add button to remove the block
  let removeBlockButton = document.createElement('button');
  removeBlockButton.innerHTML = '<img src="/vite/icons/trash.svg" alt="Remove Block"/>';
  removeBlockButton.addEventListener('click', function(event) {
    event.preventDefault();
    blocksContainer.removeChild(block);
    saveBlocks(getBlocksData()); // Save after removing block
  });

  block.appendChild(blockNameInput);
  block.appendChild(todosContainer);
  block.appendChild(addTodoButton);
  block.appendChild(removeTodoButton);
  block.appendChild(removeBlockButton);
  blocksContainer.appendChild(block);
}

// Function to add a todo with provided data
function addTodoWithData(todosContainer, todoData) {
  let todo = document.createElement('div');
  todo.className = 'todo';
  todo.draggable = true; // Enable draggable attribute
  todo.id = todoData.id; // Assuming each todo has an ID

  let todoNameInput = document.createElement('input');
  todoNameInput.type = 'text';
  todoNameInput.value = todoData.name || 'New Todo';
  todoNameInput.className = 'todo-name';
  todoNameInput.placeholder = 'Rename Todo';
  todoNameInput.addEventListener('input', function(event) {
    todoData.name = event.target.value; // Update todoData with new name
  });

  // Drag events for todo
  todo.addEventListener('dragstart', handleDragStart);
  todo.addEventListener('dragend', handleDragEnd);

  todo.appendChild(todoNameInput);
  todosContainer.appendChild(todo);
}

// Function to create a new block
function addBlock(event) {
  event.preventDefault(); // Prevent the form from submitting
  let blocksContainer = document.getElementById('blocks-container');
  let block = document.createElement('div');
  block.className = 'block';
  block.id = generateUUID(); // Generate a new unique ID for the block

  let blockNameInput = document.createElement('input');
  blockNameInput.type = 'text';
  blockNameInput.value = 'New Block';
  blockNameInput.className = 'block-name';
  blockNameInput.placeholder = 'Rename Block';
  blockNameInput.addEventListener('input', function(event) {
    blockNameInput.value = event.target.value;
  });

  let todosContainer = document.createElement('div');
  todosContainer.className = 'todos';
  todosContainer.addEventListener('dragover', handleDragOver);
  todosContainer.addEventListener('drop', handleDrop);

  // Add button to add todos to the block
  let addTodoButton = document.createElement('button');
  addTodoButton.innerHTML = '<img src="/vite/icons/square-plus.svg" alt="Add Todo"/>';
  addTodoButton.addEventListener('click', function(event) {
    event.preventDefault();
    addTodoToBlock(todosContainer);
  });

  // Add button to remove todos from the block
  let removeTodoButton = document.createElement('button');
  removeTodoButton.innerHTML = '<img src="/vite/icons/square-minus.svg" alt="Remove Todo"/>';
  removeTodoButton.addEventListener('click', function(event) {
    event.preventDefault();
    removeTodoFromBlock(todosContainer);
    saveBlocks(getBlocksData()); // Save after removing todo
  });

  // Add button to remove the block
  let removeBlockButton = document.createElement('button');
  removeBlockButton.innerHTML = '<img src="/vite/icons/trash.svg" alt="Remove Block"/>';
  removeBlockButton.addEventListener('click', function(event) {
    event.preventDefault();
    blocksContainer.removeChild(block);
    saveBlocks(getBlocksData()); // Save after removing block
  });

  block.appendChild(blockNameInput);
  block.appendChild(todosContainer);
  block.appendChild(addTodoButton);
  block.appendChild(removeTodoButton);
  block.appendChild(removeBlockButton);
  blocksContainer.appendChild(block);

  saveBlocks(getBlocksData()); // Save after adding block
}

// Function to add a todo to a block
function addTodoToBlock(todosContainer) {
  let todo = document.createElement('div');
  todo.className = 'todo';
  todo.draggable = true; // Enable draggable attribute
  todo.id = generateUUID(); // Generate a new unique ID for the todo

  let todoNameInput = document.createElement('input');
  todoNameInput.type = 'text';
  todoNameInput.value = 'New Todo';
  todoNameInput.className = 'todo-name';
  todoNameInput.placeholder = 'Rename Todo';
  todoNameInput.addEventListener('input', function(event) {
    todoNameInput.value = event.target.value;
  });

  // Drag events for todo
  todo.addEventListener('dragstart', handleDragStart);
  todo.addEventListener('dragend', handleDragEnd);

  todo.appendChild(todoNameInput);
  todosContainer.appendChild(todo);

  saveBlocks(getBlocksData()); // Save after adding todo
}

// Function to remove a todo from a block
function removeTodoFromBlock(todosContainer) {
  let todos = todosContainer.querySelectorAll('.todo');
  if (todos.length > 0) {
    let lastTodo = todos[todos.length - 1];
    todosContainer.removeChild(lastTodo);
    saveBlocks(getBlocksData()); // Save after removing todo
  }
}

// Drag and drop event handlers
let dragItem = null;

function handleDragStart(event) {
  dragItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  let target = event.target.closest('.todos');
  if (target) {
    target.appendChild(dragItem);
  } else {
    let todosContainer = event.target.closest('.todos');
    if (todosContainer) {
      todosContainer.appendChild(dragItem);
      saveBlocks(getBlocksData()); // Save after dropping
    }
  }
}

function handleDragEnd(event) {
  dragItem = null;
}

// Function to handle logout
async function logout() {
  try {
    await signOut(); // Call the signOut function
    window.location.href = '/index.html'; // Redirect to the main page after logout
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
}

// Function to get todos data within a block
function getTodosData(blockElement) {
  let todos = [];
  let todoElements = blockElement.querySelectorAll('.todo');
  todoElements.forEach((todoElement) => {
    let todoData = {
      id: todoElement.id, // assuming each todo has an id
      name: todoElement.querySelector('.todo-name').value
    };
    todos.push(todoData);
  });
  return todos;
}

// Function to get all blocks data
function getBlocksData() {
  let blocks = [];
  let blockElements = document.querySelectorAll('.block');
  blockElements.forEach((blockElement) => {
    let blockData = {
      id: blockElement.id, // assuming each block has an id
      name: blockElement.querySelector('.block-name').value,
      todos: getTodosData(blockElement)
    };
    blocks.push(blockData);
  });
  return blocks;
}

// Generate a unique UUID for new blocks and todos
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Event listeners
document.querySelector('.logout').addEventListener('click', logout);
document.getElementById('add-block-button').addEventListener('click', addBlock);
document.getElementById('blocks-container').addEventListener('click', function(event) {
  if (event.target.matches('.remove-block-button')) {
    removeBlock(event);
  }
});

// Save blocks data before window unloads
window.addEventListener('beforeunload', () => {
  saveBlocks(getBlocksData());
});

// Initialize the dashboard
initializeDashboard();