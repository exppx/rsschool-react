export type Gender = 'male' | 'female' | 'not specified';

export type User = {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  imageBase64: string;
  password: string;
  country: string;
};
