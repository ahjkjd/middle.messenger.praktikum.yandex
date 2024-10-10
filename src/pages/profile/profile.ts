import { Input } from '../../components/Input';
import Block from '../../framework/Block';

interface IUser {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export class Profile extends Block {
  constructor(props: IUser) {
    
    super({
      EmailInput: new Input({
        disabled: false,
        id: 'email',
        class: 'sign',
        type: 'email',
        onBlur: (event) => this.validateEmail((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.email = ((event.target as HTMLInputElement).value),
      }),
      LoginInput: new Input({
        disabled: false,
        id: 'login',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validateLogin((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.login = ((event.target as HTMLInputElement).value),
      }),
      NameInput: new Input({
        disabled: false,
        id: 'first_name',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validateName((event.target as HTMLInputElement).value),
      }),
      SurnameInput: new Input({
        disabled: false,
        id: 'second_name',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validateSurname((event.target as HTMLInputElement).value),
      }),
      PhoneInput: new Input({
        disabled: false,
        id: 'phone',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validatePhone((event.target as HTMLInputElement).value),
      }),
      PasswordInput: new Input({
        disabled: false,
        id: 'password-2',
        class: 'sign',
        type: 'password',
        onBlur: (event) => this.validatePassword((event.target as HTMLInputElement).value),
      }),
      PasswordRepeatInput: new Input({
        disabled: false,
        id: 'password',
        class: 'sign',
        type: 'password',
        onBlur: (event) => this.validatePasswordRepeat((event.target as HTMLInputElement).value),
      }),
      profileEditState: 'disabled',
      err: '',
      ...props,
    });
  }

  // Regex found online
  validateEmail(value: string): void {
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
      this.setProps({ emailError: 'Некорректный email адрес.' });
    } else {
      this.setProps({ emailError: '' });
    }
  }

  validateLogin(value: string): void {
    if (value.length < 3 || value.length > 20) {
      this.setProps({ loginError: 'Логин должен сожержать от 3 до 20 символов.' });
    } else if (!(/^[a-zA-Z0-9-_]{3,20}$/.test(value))) {
      this.setProps({ loginError: 'Допустимы только латиниские буквы, цифры, дефис и нижнее подчёркивание.' });
    } else if ((/^[0-9]*$/.test(value))) {
      this.setProps({ loginError: 'Логин не может состоять только из цифр.' });
    } else {
      this.setProps({ loginError: '' });
    }
  }

  validateName(value: string): void {
    if (!(/^[a-zA-Zа-яА-Я]+$/.test(value))) {
      this.setProps({ nameError: 'Допустимы только латиниские и кирилические буквы.' });
    } else if (!(/^[A-ZА-Я]/.test(value))) {
      this.setProps({ nameError: 'Первая буква должна быть заглавной.' });
    } else {
      this.setProps({ nameError: '' });
    }
  }

  // Repetitive code...
  validateSurname(value: string): void {
    if (!(/^[a-zA-Zа-яА-Я]+$/.test(value))) {
      this.setProps({ surnameError: 'Допустимы только латиниские и кирилические буквы.' });
    } else if (!(/^[A-ZА-Я]/.test(value))) {
      this.setProps({ surnameError: 'Первая буква должна быть заглавной.' });
    } else {
      this.setProps({ surnameError: '' });
    }
  }

  validatePhone(value: string): void {
    if (value.length < 10 || value.length > 15) {
      this.setProps({ phoneError: 'Длина номера от 10 до 15 символов.' });
    } else if (!(/^[0-9+][0-9]+$/.test(value))) {
      this.setProps({ phoneError: 'Допустимы только цифры и плюс в начале.' });
    } else {
      this.setProps({ phoneError: '' });
    }
  }

  // Writing the password to props to compare with the next input. There should be a better way to do it.
  validatePassword(value: string): void {
    if (value.length < 8 || value.length > 40) {
      this.setProps({
        password: value,
        passwordError: 'Пароль должен сожержать от 8 до 40 символов.',
      });
    } else if (!(/[A-Z]+/.test(value))) {
      this.setProps({
        password: value,
        passwordError: 'Пароль должен сожержать заглавную букву.',
      });
    } else if (!(/[0-9]+/.test(value))) {
      this.setProps({
        password: value,
        passwordError: 'Пароль должен сожержать цифру.',
      });
    } else {
      this.setProps({
        password: value,
        passwordError: '',
      });
    }
  }

  validatePasswordRepeat(value: string): void {
    if (value !== this.props.password) {
      this.setProps({ passwordRepeatError: 'Пароли не совпадают.' });
    } else {
      this.setProps({ passwordRepeatError: '' });
    }
  }

  override render() {
    return `
    <main class="profile">
      <button class="profile__avatar-container" id="avatar-edit-button">
        <img class="profile__avatar" src="/src/images/avatar.svg" alt="Аватар" />
       </button>`
      + (this.props.profileEditState === 'disabled'
        ?
        '<h2 class="profile__heading">{{first_name}}</h2>'
        :
        '')
        + `
        <form class="profile__form">
        <ul class="profile__inputs">`
        + (this.props.profileEditState === 'changingPassword' ?
          `
          {{> Input id="oldPassword" class="profile-input" type="password" caption="Старый пароль"}}
          {{> Input id="newPassword" class="profile-input" type="password" caption="Новый пароль"}}
          {{> Input id="newPassword-2" class="profile-input" type="password" caption="Повторите новый пароль"}}`
          : `
          {{> Input id="email" class="profile-input" type="email" value=user.email caption="Почта"}}
          {{> Input id="login" class="profile-input" type="text" value=user.login caption="Логин"}}
          {{> Input id="first_name" class="profile-input" type="text" value=user.first_name caption="Имя"}}
          {{> Input id="second_name" class="profile-input" type="text" value=user.second_name caption="Фамилия"}}
          {{> Input id="display_name" class="profile-input" type="text" value=user.display_name caption="Имя в чате"}}
          {{> Input id="phone" class="profile-input" type="text" value=user.phone caption="Телефон"}}
           `)
           + `
        </ul>
        <div class="profile__buttons">`
        + (this.props.profileEditState === 'disabled'
          ?
          `
          <button type="button" class="profile__edit-button" id="profile-edit-button">Изменить данные</button>
          <button type="button" class="profile__edit-button" id="password-edit-button">Изменить пароль</button>
          <button type="button" class="profile__exit-button" data-page="login">Выйти</button>`
          :
          `<button type="submit" class="submit-button" id="profile-save-button">Сохранить</button>
          <p class="profile__submit-error">{{err}}</p>`)
        + `
        </div>
      </form>
    </main>`;
  }
}
