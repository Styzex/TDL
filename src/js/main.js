import '/style.css';
import { getCredentials, signUp, signIn, signOut } from './auth-handling.js';

document.querySelector('#app').innerHTML = `
  <div>
    <div>
      <img src="/icons/user.svg" alt="user" />
      <form id="login" class="card">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Log in</button>
      </form>
      <form id="signup" class="card">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Sign up</button>
      </form>
      <form id="logout" class="card">
        <button type="submit">Log out</button>
      </form>
    </div>
    <div id="status">
    </div>
  </div>
`;

document.addEventListener('submit', async function(ev) {
  ev.preventDefault();
  const form = ev.target;
  if (!form) return;

  const status = document.getElementById('status');
  try {
    switch (form.id) {
      case 'signup': {
        const user = getCredentials();
        await signUp(user.email, user.password);
        status.textContent = 'Signup successful!';
        break;
      }
      case 'login': {
        const user = getCredentials();
        await signIn(user.email, user.password);
        status.textContent = 'Login successful!';
        break;
      }
      case 'logout': {
        await signOut();
        status.textContent = 'Logout successful!';
        break;
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
    status.textContent = 'Error: ' + error.message;
  }
});
