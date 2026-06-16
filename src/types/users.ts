import { getUserSchema } from '@/schemas/userSchema';
import type { InferType } from 'yup';

export type User = InferType<ReturnType<typeof getUserSchema>>;
export type StoredUser = Omit<
  User,
  'image' | 'repeatedPassword' | 'termsAndConditions'
> & { image: string; id: string };
