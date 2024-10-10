import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Block from '../../framework/Block';
import { validateEmail, validateLogin, validateName, validateSurname, validatePhone, validatePassword, validatePasswordRepeat } from '../../utils/validation';

export class Register extends Block {
  constructor() {
    
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
        onChange: (event) => this.props.formData.name = ((event.target as HTMLInputElement).value),
      }),
      SurnameInput: new Input({
        disabled: false,
        id: 'second_name',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validateSurname((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.surname = ((event.target as HTMLInputElement).value),
      }),
      PhoneInput: new Input({
        disabled: false,
        id: 'phone',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validatePhone((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.phone = ((event.target as HTMLInputElement).value),
      }),
      PasswordInput: new Input({
        disabled: false,
        id: 'password-2',
        class: 'sign',
        type: 'password',
        onBlur: (event) => this.validatePassword((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.password = ((event.target as HTMLInputElement).value),
      }),
      PasswordRepeatInput: new Input({
        disabled: false,
        id: 'password',
        class: 'sign',
        type: 'password',
        onBlur: (event) => this.validatePasswordRepeat((event.target as HTMLInputElement).value),
        onChange: () => {},
      }),
      SubmitButton: new Button({
        text: 'Зарегистрироваться',
        disabled: false,
        class: 'submit-button',
        // Submitting the form with Enter throws strange error
        onClick: (event) => {
          event.preventDefault();
          this.validateEmail(this.props.formData.email);
          this.validateLogin(this.props.formData.login);
          this.validateName(this.props.formData.name);
          this.validateSurname(this.props.formData.surname);
          this.validatePhone(this.props.formData.phone);
          this.validatePassword(this.props.formData.password);
          this.validatePasswordRepeat(this.props.formData.passwordRepeat);
          console.log(this.props.formData);
        },
      }),
      emailError: '',
      loginError: '',
      nameError: '',
      surnameError: '',
      phoneError: '',
      passwordError: '',
      passwordRepeatError: '',
      password: '',
      formData: {
        email: '',
        login: '',
        name: '',
        surname: '',
        phone: '',
        password: '',
      },
    });
  }

  validateEmail(value: string): void {
    this.setProps(validateEmail(value));
  }

  validateLogin(value: string): void {
    this.setProps(validateLogin(value));
  }

  validateName(value: string): void {
    this.setProps(validateName(value));
  }

  validateSurname(value: string): void {
    this.setProps(validateSurname(value));
  }

  validatePhone(value: string): void {
    this.setProps(validatePhone(value));
  }

  validatePassword(value: string): void {
    this.setProps(validatePassword(value));
  }

  validatePasswordRepeat(value: string): void {
    this.setProps(validatePasswordRepeat(value, this.props.formData.password));
  }

  override render() {
    return `
    <main class="sign">
      <h2 class="sign__heading">Регистрация</h2>
      <form class="sign__form">
        <ul class="sign__inputs">
          <li class="sign__container">
            <p class="sign__caption">Почта</p>
            {{{ EmailInput }}}
            <p class="sign__error">{{emailError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Логин</p>
            {{{ LoginInput }}}
            <p class="sign__error">{{loginError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Имя</p>
            {{{ NameInput }}}
            <p class="sign__error">{{nameError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Фамилия</p>
            {{{ SurnameInput }}}
            <p class="sign__error">{{surnameError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Телефон</p>
            {{{ PhoneInput }}}
            <p class="sign__error">{{phoneError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Пароль</p>
            {{{ PasswordInput }}}
            <p class="sign__error">{{passwordError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Пароль (ещё раз)</p>
            {{{ PasswordRepeatInput }}}
            <p class="sign__error">{{passwordRepeatError}}</p>
          </li>
        </ul>
        <div>
          {{{ SubmitButton }}}
        </div>
      </form>
      <a href="#" class="sign__link" data-page="register">Войти</a>
    </main>`;
  }
}
