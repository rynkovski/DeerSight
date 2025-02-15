// lib/api-middleware.ts
import { supabase } from './supabase';
import { handleError } from '@/utils/error-handling';

export const withAuth = async <T>(
  callback: () => Promise<T>
): Promise<T | undefined> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Unauthorized');
    }

    return await callback();
  } catch (error) {
    handleError(error);
    return undefined;
  }
};