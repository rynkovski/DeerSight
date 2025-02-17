
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export function useSignOut() {
  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return signOut;
}