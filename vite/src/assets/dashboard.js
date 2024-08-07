import { Clerk } from "@clerk/clerk-js";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(clerkPubKey);
await clerk.load();

async function checkAuthentication() {
  try {
    await clerk.session.load();
    if (clerk.session.signedIn) {
      showDashboard();
    } else {
      showSignIn();
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
}

function showDashboard() {
  console.log('User is authenticated. Show dashboard logic here.');
  // Add logic to render dashboard content
}

function showSignIn() {
  console.log('User is not authenticated. Show sign-in logic here.');
  // Add logic to render sign-in form or redirect to sign-in page
}

// Function to load blocks
async function loadBlocks() {
  try {
    await clerk.session.load();
    if (clerk.session.signedIn) {
      const blocksData = await fetchBlocksFromServer(); // Example function to fetch blocks from server
      return blocksData || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading blocks:', error);
    return [];
  }
}

// Function to save blocks
async function saveBlocks(blocks) {
  try {
    await clerk.session.load();
    if (clerk.session.signedIn) {
      await saveBlocksToServer(blocks); // Example function to save blocks to server
    }
  } catch (error) {
    console.error('Error saving blocks:', error);
  }
}

// Function to add a block
async function addBlock(event) {
  event.preventDefault();
  try {
    await clerk.session.load();
    if (clerk.session.signedIn) {
      let blocksContainer = document.getElementById('blocks-container');
      let block = document.createElement('div');
      block.className = 'block';
      block.id = generateUUID();

      let blockNameInput = document.createElement('input');
      blockNameInput.type = 'text';
      blockNameInput.value = 'New Block';
      blockNameInput.className = 'block-name';
      blockNameInput.placeholder = 'Rename Block';
      blockNameInput.addEventListener('input', function(event) {
        blockNameInput.value = event.target.value;
        saveBlocks(getBlocksData());
      });

      let todosContainer = document.createElement('div');
      todosContainer.className = 'todos';
      todosContainer.addEventListener('dragover', handleDragOver);
      todosContainer.addEventListener('drop', handleDrop);

      let addTodoButton = document.createElement('button');
      addTodoButton.innerHTML = '<img src="/vite/icons/square-plus.svg" alt="Add Todo"/>';
      addTodoButton.addEventListener('click', function(event) {
        event.preventDefault();
        addTodoToBlock(todosContainer);
      });

      let removeTodoButton = document.createElement('button');
      removeTodoButton.innerHTML = '<img src="/vite/icons/square-minus.svg" alt="Remove Todo"/>';
      removeTodoButton.addEventListener('click', function(event) {
        event.preventDefault();
        removeTodoFromBlock(todosContainer);
        saveBlocks(getBlocksData());
      });

      let removeBlockButton = document.createElement('button');
      removeBlockButton.innerHTML = '<img src="/vite/icons/trash.svg" alt="Remove Block"/>';
      removeBlockButton.addEventListener('click', function(event) {
        event.preventDefault();
        blocksContainer.removeChild(block);
        saveBlocks(getBlocksData());
      });

      block.appendChild(blockNameInput);
      block.appendChild(todosContainer);
      block.appendChild(addTodoButton);
      block.appendChild(removeTodoButton);
      block.appendChild(removeBlockButton);
      blocksContainer.appendChild(block);

      saveBlocks(getBlocksData());
    } else {
      console.log('User not authenticated. Redirect to sign-in page or handle accordingly.');
    }
  } catch (error) {
    console.error('Error adding block:', error);
  }
}

document.getElementById('add-block-button').addEventListener('click', addBlock);
document.getElementById('blocks-container').addEventListener('click', function(event) {
  if (event.target.matches('.remove-block-button')) {
    removeBlock(event);
  }
});

// Initialize the dashboard
checkAuthentication();
