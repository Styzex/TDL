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
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get credentials from form inputs
export function getCredentials() {
  return {
    email: document.querySelector('[name="email"]').value,
    password: document.querySelector('[name="password"]').value
  };
}
