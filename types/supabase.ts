
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          name: string
          balance: number
          currency: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          balance: number
          currency: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          balance?: number
          currency?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color: string
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          icon?: string
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          wallet_id: string
          category_id: string
          amount: number
          type: 'INCOME' | 'EXPENSE'
          description: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wallet_id: string
          category_id: string
          amount: number
          type: 'INCOME' | 'EXPENSE'
          description: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wallet_id?: string
          category_id?: string
          amount?: number
          type?: 'INCOME' | 'EXPENSE'
          description?: string
          date?: string
          created_at?: string
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string
          amount: number
          period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          amount: number
          period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
          start_date: string
          end_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          amount?: number
          period?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
          start_date?: string
          end_date?: string
          created_at?: string
        }
      }
    }
  }
}