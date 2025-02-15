// utils/validation.ts
import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive(),
  category: z.enum(['food', 'transport', 'other']),
  date: z.string().datetime(),
  user_id: z.string().uuid(),
});

