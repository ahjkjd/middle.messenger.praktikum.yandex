// Regex found online
export const validateEmail = (value: string): object => {
  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
    return { emailError: 'Некорректный email адрес.' };
  } else {
    return { emailError: '' };
  }
};

export const validateLogin = (value: string): object => {
  if (value.length < 3 || value.length > 20) {
    return { loginError: 'Логин должен сожержать от 3 до 20 символов.' };
  } else if (!(/^[a-zA-Z0-9-_]{3,20}$/.test(value))) {
    return { loginError: 'Допустимы только латиниские буквы, цифры, дефис и нижнее подчёркивание.' };
  } else if ((/^[0-9]*$/.test(value))) {
    return { loginError: 'Логин не может состоять только из цифр.' };
  } else {
    return { loginError: '' };
  }
};

export const validateName = (value: string): object => {
  if (!(/^[a-zA-Zа-яА-Я]+$/.test(value))) {
    return { nameError: 'Допустимы только латиниские и кирилические буквы.' };
  } else if (!(/^[A-ZА-Я]/.test(value))) {
    return { nameError: 'Первая буква должна быть заглавной.' };
  } else {
    return { nameError: '' };
  }
};

export const validateSurname = (value: string): object => {
  if (!(/^[a-zA-Zа-яА-Я]+$/.test(value))) {
    return { surnameError: 'Допустимы только латиниские и кирилические буквы.' };
  } else if (!(/^[A-ZА-Я]/.test(value))) {
    return { surnameError: 'Первая буква должна быть заглавной.' };
  } else {
    return { surnameError: '' };
  }
};

export const validatePhone = (value: string): object => {
  if (value.length < 10 || value.length > 15) {
    return { phoneError: 'Длина номера от 10 до 15 символов.' };
  } else if (!(/^[0-9+][0-9]+$/.test(value))) {
    return { phoneError: 'Допустимы только цифры и плюс в начале.' };
  } else {
    return { phoneError: '' };
  }
};

// Writing the password to props to compare with the next input. There should be a better way to do it.
export const validatePassword = (value: string): object => {
  if (value.length < 8 || value.length > 40) {
    return {
      password: value,
      passwordError: 'Пароль должен сожержать от 8 до 40 символов.',
    };
  } else if (!(/[A-Z]+/.test(value))) {
    return {
      password: value,
      passwordError: 'Пароль должен сожержать заглавную букву.',
    };
  } else if (!(/[0-9]+/.test(value))) {
    return {
      password: value,
      passwordError: 'Пароль должен сожержать цифру.',
    };
  } else {
    return {
      password: value,
      passwordError: '',
    };
  }
};

export const validatePasswordRepeat = (value: string, password: string): object => {
  if (value !== password) {
    return { passwordRepeatError: 'Пароли не совпадают.' };
  } else {
    return { passwordRepeatError: '' };
  }
};