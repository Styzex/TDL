import supabase from './supabaseClient.js';

// Function to load blocks data from Supabase
export async function loadBlocks() {
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error('Error getting session:', sessionError.message);
    return null;
  }

  if (!session) {
    console.error('User not authenticated.');
    return null;
  }

  const { user } = session;

  try {
    const { data, error } = await supabase
      .from('blocks')
      .select('blocks')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error loading blocks:', error.message);
      return null;
    }

    if (data) {
      console.log('Blocks loaded successfully:', data);
      return data.blocks;
    }

    return null;
  } catch (error) {
    console.error('Error loading blocks:', error.message);
    return null;
  }
}

// Function to save blocks data to Supabase
export async function saveBlocks(blocks, user) {
  if (!user) {
    console.error('User not authenticated.');
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('blocks')
      .upsert([{ user_id: user.id, blocks }], { onConflict: { columns: ['user_id'], merge: ['blocks'] } });

    if (error) {
      console.error('Error saving blocks:', error.message);
      return false;
    }

    console.log('Blocks saved successfully:', data);
    return true;
  } catch (error) {
    console.error('Error saving blocks:', error.message);
    return false;
  }
}

// Function to delete old records for the same user
async function deleteOldRecords(userId) {
  try {
    const { data, error } = await supabase
      .from('blocks')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting old records:', error.message);
      return false;
    }

    console.log('Old records deleted successfully:', data);
    return true;
  } catch (error) {
    console.error('Error deleting old records:', error.message);
    return false;
  }
}
