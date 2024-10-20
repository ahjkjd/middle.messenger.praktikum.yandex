import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Block from '../../framework/Block';
import { validateLogin, validatePassword } from '../../utils/validation';

export class Login extends Block {
  constructor() {
    
    super({
      LoginInput: new Input({
        disabled: false,
        id: 'login',
        class: 'sign',
        type: 'text',
        onBlur: (event) => this.validateLogin((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.login = ((event.target as HTMLInputElement).value),
      }),
      PasswordInput: new Input({
        disabled: false,
        id: 'password',
        class: 'sign',
        type: 'password',
        onBlur: (event) => this.validatePassword((event.target as HTMLInputElement).value),
        onChange: (event) => this.props.formData.password = ((event.target as HTMLInputElement).value),
      }),
      SubmitButton: new Button({
        text: 'Войти',
        disabled: false,
        class: 'submit-button',
        // Submitting the form with Enter throws strange error
        onClick: (event) => {
          event.preventDefault();
          this.validateLogin(this.props.formData.login);
          this.validatePassword(this.props.formData.password);
          console.log(this.props.formData);
        },
      }),
      loginError: '',
      passwordError: '',
      formData: {
        login: '',
        password: '',
      },
    });
  }

  validateLogin(value: string): void {
    this.setProps({
      loginError: validateLogin(value),
    });
  }

  validatePassword(value: string): void {
    this.setProps({
      passwordError: validatePassword(value),
    });
  }

  override render() {
    return `
    <main class="sign">
      <h2 class="sign__heading">Вход</h2>
      <form class="sign__form">
        <ul class="sign__inputs">
          <li class="sign__container">
            <p class="sign__caption">Логин</p>
            {{{ LoginInput }}}
            <p class="sign__error">{{loginError}}</p>
          </li>
          <li class="sign__container">
            <p class="sign__caption">Пароль</p>
            {{{ PasswordInput }}}
            <p class="sign__error">{{passwordError}}</p>
          </li>
        </ul>
        <div>
          {{{ SubmitButton }}}
        </div>
      </form>
      <a href="#" class="sign__link" data-page="register">Нет аккаунта?</a>
    </main>`;
  }
}
