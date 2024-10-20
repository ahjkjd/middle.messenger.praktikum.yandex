// Regex found online
export const validateEmail = (value: string): string => {
  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
    return 'Некорректный email адрес.';
  } else {
    return '';
  }
};

export const validateLogin = (value: string): string => {
  if (value.length < 3 || value.length > 20) {
    return 'Логин должен сожержать от 3 до 20 символов.';
  } else if (!(/^[a-zA-Z0-9-_]{3,20}$/.test(value))) {
    return 'Логин должен сожержать только латиниские буквы, цифры, дефис и нижнее подчёркивание.';
  } else if ((/^[0-9]*$/.test(value))) {
    return 'Логин не может состоять только из цифр.';
  } else {
    return '';
  }
};

export const validateName = (value: string): string => {
  if (!(/^[a-zA-Zа-яА-Я]+$/.test(value))) {
    return 'Имя может сожержать только латиниские и кирилические буквы.';
  } else if (!(/^[A-ZА-Я]/.test(value))) {
    return 'Первая буква имени должна быть заглавной.';
  } else {
    return '';
  }
};

export const validatePhone = (value: string): string => {
  if (value.length < 10 || value.length > 15) {
    return 'Длина номера от 10 до 15 символов.';
  } else if (!(/^[0-9+][0-9]+$/.test(value))) {
    return 'Номер должен сожержать только цифры и плюс в начале.';
  } else {
    return '';
  }
};

export const validatePassword = (value: string): string => {
  if (value.length < 8 || value.length > 40) {
    return 'Пароль должен сожержать от 8 до 40 символов.';
  } else if (!(/[A-Z]+/.test(value))) {
    return 'Пароль должен сожержать заглавную букву.';
  } else if (!(/[0-9]+/.test(value))) {
    return 'Пароль должен сожержать цифру.';
  } else {
    return '';
  }
};

export const validatePasswordRepeat = (value: string, password: string): string => {
  if (value !== password) {
    return 'Пароли не совпадают.';
  } else {
    return '';
  }
};
