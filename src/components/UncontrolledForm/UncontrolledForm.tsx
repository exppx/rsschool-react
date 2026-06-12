import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import type { StoredUser, User } from '@/types/users';
import type { PasswordStrength } from '@/types/password';
import { toBase64 } from '@/utils/toBase64';
import { getPasswordStrength } from '@/utils/getPasswordStrength';
import { addUser, resetRecentUser, selectCountries } from '@/store/usersSlice';
import { getUserSchema } from '@/schemas/userSchema';
import { ModalContext } from '@/contexts/ModalContext';

import styles from './UncontrolledForm.module.scss';

type UncontrolledFormErrors = Record<keyof User, null | string>;

const defaultErrors: UncontrolledFormErrors = {
  name: null,
  email: null,
  age: null,
  sex: null,
  image: null,
  password: null,
  repeatedPassword: null,
  country: null,
  termsAndConditions: null,
};

function UncontrolledForm() {
  const [errors, setErrors] = useState<UncontrolledFormErrors>(defaultErrors);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);

  function handlePasswordStrength(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordStrength(getPasswordStrength(event.target.value));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');
    const sex = formData.get('sex');
    const image = formData.get('image');
    const password = formData.get('password');
    const repeatedPassword = formData.get('repeatedPassword');
    const country = formData.get('country');
    const termsAndConditions = formData.get('termsAndConditions');

    try {
      setErrors(defaultErrors);

      const userSchema = getUserSchema(countries);
      const rawUser = await userSchema.validate(
        {
          name,
          email,
          age,
          sex,
          image,
          password,
          repeatedPassword,
          country,
          termsAndConditions,
        },
        { abortEarly: false }
      );

      const base64Image = await toBase64(rawUser.image);
      const user: StoredUser = {
        id: crypto.randomUUID(),
        name: rawUser.name,
        email: rawUser.email,
        age: rawUser.age,
        sex: rawUser.sex,
        image: base64Image,
        password: rawUser.password,
        country: rawUser.country,
      };

      dispatch(addUser(user));
      setTimeout(() => {
        dispatch(resetRecentUser());
      }, 3000);

      event.target.reset();
      closeModal();
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((error) => {
          const errorName = error.path;

          if (errorName === undefined) return;

          setErrors((errors) => {
            const key = errorName as keyof UncontrolledFormErrors;

            if (errors[key] === null) {
              return { ...errors, [key]: error.message };
            } else {
              return errors;
            }
          });
        });
      } else {
        console.error(error);
      }
    }
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['form__line']}>
        <label htmlFor="name">Name*</label>
        <input id="name" type="text" name="name" />
        {
          <div className={styles['form__error']}>
            {errors.name && errors.name}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="email">Email*</label>
        <input id="email" type="text" name="email" />
        {
          <div className={styles['form__error']}>
            {errors.email && errors.email}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="age">Age*</label>
        <input id="age" type="number" name="age" />
        {
          <div className={styles['form__error']}>
            {errors.age && errors.age}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <span>Sex*</span>
        <fieldset className={styles['form__fieldset']}>
          <div className={styles['form__horizontal-line']}>
            <input id="sex-male" type="radio" value="male" name="sex" />
            <label htmlFor="sex-male">Male</label>
          </div>

          <div className={styles['form__horizontal-line']}>
            <input id="sex-female" type="radio" value="female" name="sex" />
            <label htmlFor="sex-female">Female</label>
          </div>

          <div className={styles['form__horizontal-line']}>
            <input
              id="sex-not-specified"
              type="radio"
              value="not specified"
              name="sex"
            />
            <label htmlFor="sex-not-specified">Not specified</label>
          </div>
        </fieldset>
        {
          <div className={styles['form__error']}>
            {errors.sex && errors.sex}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="image">Image*</label>
        <input id="image" type="file" name="image" />
        {
          <div className={styles['form__error']}>
            {errors.image && errors.image}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="password">Password*</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordStrength}
        />
        {
          <div className={styles['form__error']}>
            {errors.password && errors.password}
          </div>
        }
        <span
          className={
            styles[`form__password-strength_${passwordStrength ?? ''}`]
          }
        >
          {passwordStrength}
        </span>
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="repeatedPassword">Confirm password*</label>
        <input id="repeatedPassword" type="password" name="repeatedPassword" />
        {
          <div className={styles['form__error']}>
            {errors.repeatedPassword && errors.repeatedPassword}
          </div>
        }
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="country">Country*</label>
        <input id="country" type="text" list="countries" name="country" />
        {
          <div className={styles['form__error']}>
            {errors.country && errors.country}
          </div>
        }
      </div>

      <datalist id="countries">
        {countries.map((country) => (
          <option value={country} key={country}></option>
        ))}
      </datalist>

      <div className={styles['form__terms-and-conditions']}>
        <input
          id="termsAndConditions"
          type="checkbox"
          name="termsAndConditions"
        />
        <label htmlFor="termsAndConditions">
          I accept terms and conditions
        </label>
      </div>
      {
        <div className={styles['form__error']}>
          {errors.termsAndConditions && errors.termsAndConditions}
        </div>
      }

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
