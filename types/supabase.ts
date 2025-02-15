// types/supabase.ts
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
      transactions: {
        Row: {
          id: string
          amount: number
          category: 'food' | 'transport' | 'other'
          date: string
          user_id: string
          created_at: string
        }
        Insert: {
          amount: number
          category: 'food' | 'transport' | 'other'
          date?: string
          user_id: string
        }
      }
    }
  }
}