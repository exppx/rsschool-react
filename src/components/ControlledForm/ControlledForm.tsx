import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { StoredUser, User } from '@/types/users';
import type { PasswordStrength } from '@/types/password';
import { toBase64 } from '@/utils/toBase64';
import { getPasswordStrength } from '@/utils/getPasswordStrength';
import { addUser, resetRecentUser, selectCountries } from '@/store/usersSlice';
import { getUserSchema } from '@/schemas/userSchema';
import { ModalContext } from '@/contexts/ModalContext';

import styles from './ControlledForm.module.scss';

function ControlledForm() {
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: yupResolver(getUserSchema(countries)),
    mode: 'onChange',
  });

  function handlePasswordStrength(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordStrength(getPasswordStrength(event.target.value));
  }

  const onSubmit: SubmitHandler<User> = async (formData: User) => {
    const name = formData.name;
    const email = formData.email;
    const age = formData.age;
    const sex = formData.sex;
    const image = formData.image;
    const password = formData.password;
    const country = formData.country;

    const base64Image = await toBase64(image);

    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      age: age,
      sex: sex,
      image: base64Image,
      password: password,
      country: country,
    };

    dispatch(addUser(user));
    setTimeout(() => {
      dispatch(resetRecentUser());
    }, 3000);

    reset();
    closeModal();
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['form__line']}>
        <label htmlFor="name">Name*</label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && (
          <div className={styles['form__error']}>{errors.name.message}</div>
        )}
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="email">Email*</label>
        <input id="email" type="text" {...register('email')} />
        {errors.email && (
          <div className={styles['form__error']}>{errors.email.message}</div>
        )}
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="age">Age*</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && (
          <div className={styles['form__error']}>{errors.age.message}</div>
        )}
      </div>

      <div className={styles['form__line']}>
        <span>Sex*</span>
        <fieldset className={styles['form__fieldset']}>
          <div className={styles['form__horizontal-line']}>
            <input
              id="sex-male"
              type="radio"
              value="male"
              {...register('sex')}
            />
            <label htmlFor="sex-male">Male</label>
          </div>

          <div className={styles['form__horizontal-line']}>
            <input
              id="sex-female"
              type="radio"
              value="female"
              {...register('sex')}
            />
            <label htmlFor="sex-female">Female</label>
          </div>

          <div className={styles['form__horizontal-line']}>
            <input
              id="sex-not-specified"
              type="radio"
              value="not specified"
              {...register('sex')}
            />
            <label htmlFor="sex-not-specified">Not specified</label>
          </div>
        </fieldset>
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="image">Image*</label>
        <input id="image" type="file" {...register('image')} />
        {errors.image && (
          <div className={styles['form__error']}>{errors.image.message}</div>
        )}
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="password">Password*</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          onChange={handlePasswordStrength}
        />
        {errors.password && (
          <div className={styles['form__error']}>{errors.password.message}</div>
        )}
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
        <input
          id="repeatedPassword"
          type="password"
          {...register('repeatedPassword')}
        />
        {errors.repeatedPassword && (
          <div className={styles['form__error']}>
            {errors.repeatedPassword.message}
          </div>
        )}
      </div>

      <div className={styles['form__line']}>
        <label htmlFor="country">Country*</label>
        <input
          id="country"
          type="text"
          list="countries"
          {...register('country')}
        />
        {errors.country && (
          <div className={styles['form__error']}>{errors.country.message}</div>
        )}
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
          {...register('termsAndConditions')}
        />
        <label htmlFor="termsAndConditions">
          I accept terms and conditions
        </label>
      </div>
      {errors.termsAndConditions && (
        <div className={styles['form__error']}>
          {errors.termsAndConditions.message}
        </div>
      )}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default ControlledForm;
