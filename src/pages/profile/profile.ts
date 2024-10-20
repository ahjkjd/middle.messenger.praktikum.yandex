import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import Block from '../../framework/Block';
import { validateEmail, validateLogin, validateName, validatePhone, validatePassword, validatePasswordRepeat } from '../../utils/validation';

export interface User {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export class Profile extends Block {
  constructor(props: User) {
    
    super({
      EmailInput: new Input({
        disabled: true,
        id: 'email',
        class: 'profile-input',
        type: 'email',
        value: props.email,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.email = ((event.target as HTMLInputElement).value),
      }),
      LoginInput: new Input({
        disabled: true,
        id: 'login',
        class: 'profile-input',
        type: 'text',
        value: props.login,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.login = ((event.target as HTMLInputElement).value),
      }),
      NameInput: new Input({
        disabled: true,
        id: 'first_name',
        class: 'profile-input',
        type: 'text',
        value: props.first_name,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.first_name = ((event.target as HTMLInputElement).value),
      }),
      SurnameInput: new Input({
        disabled: true,
        id: 'second_name',
        class: 'profile-input',
        type: 'text',
        value: props.second_name,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.second_name = ((event.target as HTMLInputElement).value),
      }),
      DisplayNameInput: new Input({
        disabled: true,
        id: 'display_name',
        class: 'profile-input',
        type: 'text',
        value: props.display_name,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.display_name = ((event.target as HTMLInputElement).value),
      }),
      PhoneInput: new Input({
        disabled: true,
        id: 'phone',
        class: 'profile-input',
        type: 'text',
        value: props.phone,
        onBlur: () => this.validateData(),
        onChange: (event) => this.props.formData.phone = ((event.target as HTMLInputElement).value),
      }),
      OldPasswordInput: new Input({
        disabled: false,
        id: 'oldPassword',
        class: 'profile-input',
        type: 'password',
        onBlur: () => {},
        onChange: (event) => this.props.formData.oldPassword = ((event.target as HTMLInputElement).value),
      }),
      NewPasswordInput: new Input({
        disabled: false,
        id: 'newPassword',
        class: 'profile-input',
        type: 'password',
        onBlur: () => this.validatePassword(),
        onChange: (event) => this.props.formData.newPassword = ((event.target as HTMLInputElement).value),
      }),
      PasswordRepeatInput: new Input({
        disabled: false,
        id: 'newPassword-2',
        class: 'profile-input',
        type: 'password',
        onBlur: () => this.validatePassword(),
        onChange: (event) => this.props.formData.passwordRepeat = ((event.target as HTMLInputElement).value),
      }),
      SubmitButton: new Button({
        text: 'Сохранить',
        disabled: false,
        class: 'submit-button',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();
          this.save();
        },
      }),
      EditUserButton: new Button({
        text: 'Изменить данные',
        disabled: false,
        class: 'profile__edit-button',
        type: 'button',
        onClick: () => this.editData(),
      }),
      EditPasswordButton: new Button({
        text: 'Изменить пароль',
        disabled: false,
        class: 'profile__edit-button',
        type: 'button',
        onClick: () => this.editPassword(),
      }),
      error: '',
      formData: {
        ...props,
        oldPassword: '',
        newPassword: '',
        passwordRepeat: '',
      },
      profileEditState: 'disabled',
    });
  }

  validateData(): void {
    const err = validateEmail(this.props.formData.email) ||
    validateLogin(this.props.formData.login) ||
    validateName(this.props.formData.first_name) ||
    validateName(this.props.formData.second_name) ||
    validatePhone(this.props.formData.phone);
    this.setProps({ error: err });
  }

  validatePassword(): void {
    const err = validatePassword(this.props.formData.newPassword) ||
    validatePasswordRepeat(this.props.formData.newPassword, this.props.formData.passwordRepeat);
    this.setProps({ error: err });
  }

  // Repetitive code below?
  editData(): void {
    this.children.EmailInput.setProps({ disabled: false });
    this.children.LoginInput.setProps({ disabled: false });
    this.children.NameInput.setProps({ disabled: false });
    this.children.SurnameInput.setProps({ disabled: false });
    this.children.DisplayNameInput.setProps({ disabled: false });
    this.children.PhoneInput.setProps({ disabled: false });
    this.setProps({ profileEditState: 'changingData' });
  }

  editPassword(): void {
    this.children.OldPasswordInput.setProps({ disabled: false });
    this.children.NewPasswordInput.setProps({ disabled: false });
    this.children.PasswordRepeatInput.setProps({ disabled: false });
    this.setProps({ profileEditState: 'changingPassword' });
  }

  save(): void {
    if (this.props.profileEditState === 'changingPassword') {
      this.validatePassword();
    } else if (this.props.profileEditState === 'changingData') {
      this.validateData();
    } else {
      throw new Error('This is not supposed to happen.');
    }
    console.log(this.props.formData);
    this.children.EmailInput.setProps({ disabled: true });
    this.children.LoginInput.setProps({ disabled: true });
    this.children.NameInput.setProps({ disabled: true });
    this.children.SurnameInput.setProps({ disabled: true });
    this.children.DisplayNameInput.setProps({ disabled: true });
    this.children.PhoneInput.setProps({ disabled: true });
    this.children.OldPasswordInput.setProps({ disabled: true });
    this.children.NewPasswordInput.setProps({ disabled: true });
    this.children.PasswordRepeatInput.setProps({ disabled: true });
    this.setProps({ profileEditState: 'disabled' });
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
        + (this.props.profileEditState === 'changingPassword'
          ? `
          <li class="profile-input__container">
            <p class="profile-input__caption">Старый пароль</p>
            {{{ OldPasswordInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Новый пароль</p>
            {{{ NewPasswordInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Повторите новый пароль</p>
            {{{ PasswordRepeatInput }}}
          </li>`
          : `
           <li class="profile-input__container">
            <p class="profile-input__caption">Почта</p>
            {{{ EmailInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Логин</p>
            {{{ LoginInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Имя</p>
            {{{ NameInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Фамилия</p>
            {{{ SurnameInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Имя в чате</p>
            {{{ DisplayNameInput }}}
          </li>
          <li class="profile-input__container">
            <p class="profile-input__caption">Телефон</p>
            {{{ PhoneInput }}}
          </li>
           `)
           + `
        </ul>
        <div class="profile__buttons">`
        + (this.props.profileEditState === 'disabled'
          ? `
          {{{ EditUserButton }}}
          {{{ EditPasswordButton }}}
          <button type="button" class="profile__exit-button" data-page="login">Выйти</button>`
          : `
          {{{ SubmitButton }}}
          <p class="profile__submit-error">{{error}}</p>`)
        + `
        </div>
      </form>
    </main>`;
  }
}
