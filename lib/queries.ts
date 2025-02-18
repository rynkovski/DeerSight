import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';


type Tables = Database['public']['Tables'];
type Category = Tables['categories']['Row'];
type Wallet = Tables['wallets']['Row'];
type Transaction = Tables['transactions']['Row'];


export const categoryQueries = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  create: async (userId: string, category: Omit<Category, 'id' | 'created_at' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        ...category,
        user_id: userId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (categoryId: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'user_id'>>) => {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', categoryId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (categoryId: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);
    
    if (error) throw error;
  }
};

// Wallet Queries
export const walletQueries = {
  getAll: async (userId: string) => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  getById: async (walletId: string) => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('id', walletId)
      .single();
    
    if (error) throw error;
    return data;
  },

  create: async (userId: string, wallet: Omit<Wallet, 'id' | 'created_at' | 'user_id' | 'balance'>) => {
    const { data, error } = await supabase
      .from('wallets')
      .insert({
        ...wallet,
        user_id: userId,
        balance: 0 // Initial balance
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (walletId: string, wallet: Partial<Omit<Wallet, 'id' | 'created_at' | 'user_id'>>) => {
    const { data, error } = await supabase
      .from('wallets')
      .update(wallet)
      .eq('id', walletId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  updateBalance: async (walletId: string, amount: number) => {
    const { data, error } = await supabase.rpc('update_wallet_balance', {
      wallet_id: walletId,
      amount_change: amount
    });
    
    if (error) throw error;
    return data;
  },

  delete: async (walletId: string) => {
    const { error } = await supabase
      .from('wallets')
      .delete()
      .eq('id', walletId);
    
    if (error) throw error;
  }
};

// Transaction Queries
export const transactionQueries = {
  getAll: async (userId: string, options?: {
    startDate?: Date;
    endDate?: Date;
    walletId?: string;
    categoryId?: string;
    limit?: number;
    offset?: number;
  }) => {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories (id, name, icon, color),
        wallets (id, name)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (options?.startDate) {
      query = query.gte('date', options.startDate.toISOString());
    }
    if (options?.endDate) {
      query = query.lte('date', options.endDate.toISOString());
    }
    if (options?.walletId) {
      query = query.eq('wallet_id', options.walletId);
    }
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  create: async (
    userId: string,
    transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'> & { updateWalletBalance?: boolean }
  ) => {
    const { updateWalletBalance = true, ...transactionData } = transaction;
    
    // Start a Supabase transaction
    const { data, error } = await supabase.rpc('create_transaction', {
      transaction_data: {
        ...transactionData,
        user_id: userId
      },
      update_balance: updateWalletBalance
    });

    if (error) throw error;
    return data;
  },

  update: async (
    transactionId: string,
    transaction: Partial<Omit<Transaction, 'id' | 'created_at' | 'user_id'>>
  ) => {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', transactionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (transactionId: string, options?: { updateWalletBalance?: boolean }) => {
    const { error } = await supabase.rpc('delete_transaction', {
      transaction_id: transactionId,
      update_balance: options?.updateWalletBalance ?? true
    });
    
    if (error) throw error;
  }
};

