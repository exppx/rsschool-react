import { boolean, mixed, number, object, string } from 'yup';

export function getUserSchema(countries: string[]) {
  return object({
    name: string()
      .required('This field is required')
      .test({
        name: 'starts-with-uppercase',
        message: 'Name must start with uppercase letter',
        test: (value) => {
          if (!value) return true;

          const firstChar = value[0];

          return firstChar.toLocaleUpperCase() === firstChar;
        },
      }),

    email: string()
      .required('This field is required')
      .test({
        name: 'has-at',
        message: 'Email must include one @ symbol',
        test: (value) => {
          if (!value) return true;

          return value.split('@').length === 2;
        },
      })
      .test({
        name: 'has-local-part',
        message: 'Local part must not be empty',
        test: (value) => {
          if (!value) return true;

          const localPart = value.split('@')[0];

          if (localPart === undefined) return true;

          return localPart.length !== 0;
        },
      })
      .test({
        name: 'domain-has-dot',
        message: 'Domain must include a dot',
        test: (value) => {
          if (!value) return true;

          const domain = value.split('@')[1];

          if (domain === undefined) return true;

          return domain.includes('.');
        },
      }),

    age: number()
      .transform((_, originalValue) => {
        return originalValue === '' ? undefined : Number(originalValue);
      })
      .required('This field is required')
      .positive('Age must be positive')
      .integer('Age must be of type integer'),

    sex: string()
      .required('This field is required')
      .oneOf(['male', 'female', 'not specified'] as const),

    image: mixed<File>()
      .required('This field is required')
      .test({
        name: 'file-format',
        message: 'File type must be PNG or JPEG',
        test: (value) => {
          if (!value) return true;

          const allowedTypes = ['image/png', 'image/jpeg'];

          return allowedTypes.includes(value.type);
        },
      })
      .test({
        name: 'file-size',
        message: 'File size must be less than 5 Mb',
        test: (value) => {
          if (!value) return true;

          return value.size <= 5 * 1024 * 1024;
        },
      }),

    password: string().required('This field is required'),

    repeatedPassword: string()
      .required('This field is required')
      .test({
        name: 'password-match',
        message: 'Passwords must match',
        test: function (value, context) {
          if (!value) return true;

          return value === context.parent.password;
        },
      }),

    country: string()
      .required('This field is required')
      .oneOf(countries, 'Country must be chosen from the list'),

    termsAndConditions: boolean()
      .defined()
      .transform((_, originalValue) => {
        return originalValue === 'on';
      })
      .oneOf([true], 'You must agree with terms and conditions'),
  }).required();
}
