import type { PasswordStrength } from '@/types/password';

export function getPasswordStrength(password: string): PasswordStrength {
  let passwordScore = 0;

  if (password.match(/\d/g)) {
    passwordScore++;
  }

  if (password.match(/\.|,|\?|!|\+|=|_|-|:|;|&|\*|\$|#|@|\(|\)/g)) {
    passwordScore++;
  }

  if (
    password.split('').reduce((res, symbol) => {
      if (res) return res;
      if (symbol.toLocaleUpperCase() === symbol.toLocaleLowerCase()) return res;
      if (symbol.toLocaleUpperCase() === symbol) return true;
      return res;
    }, false)
  ) {
    passwordScore++;
  }

  if (
    password.split('').reduce((res, symbol) => {
      if (res) return res;
      if (symbol.toLocaleUpperCase() === symbol.toLocaleLowerCase()) return res;
      if (symbol.toLocaleLowerCase() === symbol) return true;
      return res;
    }, false)
  ) {
    passwordScore++;
  }

  switch (passwordScore) {
    case 0:
    case 1:
      return 'weak';
    case 2:
      return 'medium';
    case 3:
      return 'good';
    case 4:
      return 'strong';
    default:
      return 'weak';
  }
}
