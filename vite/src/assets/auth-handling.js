import supabase from './supabaseClient.js';

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { data, error } = await supabase.auth.signOut();
  if (error) throw error;
  return data;
}

export function getCredentials(form) {
  return {
    email: form.querySelector('[name="email"]').value,
    password: form.querySelector('[name="password"]').value
  };
}

document.addEventListener('submit', async function(ev) {
  ev.preventDefault();
  const form = ev.target;
  const status = document.getElementById('status');
  try {
    if (form.id === 'signup-form') {
      const user = getCredentials(form);
      await signUp(user.email, user.password);
      status.textContent = 'Signup successful! Please check your email to confirm your account.';
    } else if (form.id === 'login-form') {
      const user = getCredentials(form);
      await signIn(user.email, user.password);
      status.textContent = 'Login successful!';
      window.location.href = '/html/dashboard.html';
    } else if (form.id === 'logout-form') {
      await signOut();
      window.location.href = '/html/logout.html';
    }
  } catch (error) {
    console.error('Error:', error.message);
    status.textContent = 'Error: ' + error.message;
  }
});
