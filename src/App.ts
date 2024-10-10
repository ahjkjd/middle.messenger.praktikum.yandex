import Handlebars from 'handlebars';
import * as Pages from './pages/index.js';
import { Err } from './pages/err/err';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';

interface User {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

interface AppState {
  currentPage: string;
  user: User;
  profileEdit?: object;
}

const testUser: User = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+71234567890',
};

export default class App {
  private state: AppState;

  private appElement: HTMLElement;
  
  constructor() {
    this.state = {
      currentPage: 'menu',
      profileEdit: {
        disabled: true,
        changingData: false,
        changingPassword: false,
      },
      user: testUser,
    };
    this.appElement = document.getElementById('app') as HTMLElement;
  }

  render() {
    let template;
    if (this.state.currentPage === 'menu') {
      template = Handlebars.compile(Pages.Menu);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'notFound') {
      const notFoundPage = new Err({
        number: 404,
        message: 'Не туда попали',
      });
      this.appElement.replaceChildren(notFoundPage.getContent());
    } else if (this.state.currentPage === 'serverError') {
      const serverErrorPage = new Err({
        number: 500,
        message: 'Мы уже фиксим',
      });
      this.appElement.replaceChildren(serverErrorPage.getContent());
    } else if (this.state.currentPage === 'login') {
      const LoginPage = new Login();
      this.appElement.replaceChildren(LoginPage.getContent());
    } else if (this.state.currentPage === 'register') {
      const RegisterPage = new Register();
      this.appElement.replaceChildren(RegisterPage.getContent());
    } else if (this.state.currentPage === 'profile') {
      // template = Handlebars.compile(Pages.Profile);
      // this.appElement.innerHTML = template({
      //   user: this.state.user,
      //   profileEdit: this.state.profileEdit,
      // });

      const ProfilePage = new Profile(testUser);
      this.appElement.replaceChildren(ProfilePage.getContent());
      console.log(ProfilePage);
    } else if (this.state.currentPage === 'chats') {
      template = Handlebars.compile(Pages.Chats);
      this.appElement.innerHTML = template({
        chats: [],
      });
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'profile') {
      if (this.state.profileEdit.disabled === true) {
        const profileEditButton = document.getElementById('profile-edit-button');
        const passwordEditButton = document.getElementById('password-edit-button');
        profileEditButton.addEventListener('click', () => this.enableProfileEdit());
        passwordEditButton.addEventListener('click', () => this.enablePasswordEdit());
      } else {
        const profileSaveButton = document.getElementById('profile-save-button');
        profileSaveButton.addEventListener('click', () => this.saveProfile());
      }
    }

    // Temporary, to be replaced with routing
    // Breaks whan a page rerenders
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });

    // Temporary, to be replaced by form submission
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.dataset.page) {
        button.addEventListener('click', (e: any) => {
          e.preventDefault();
          this.changePage(e.target.dataset.page);
        });
      }
    });
  }

  changePage(page: string) {
    this.state.currentPage = page;
    this.render();
  }

  enableProfileEdit() {
    this.state.profileEdit = {
      disabled: false,
      changingData: true,
      changingPassword: false,
    };
    this.render();
  }

  enablePasswordEdit() {
    this.state.profileEdit = {
      disabled: false,
      changingData: false,
      changingPassword: true,
    };
    this.render();
  }

  saveProfile() {
    this.state.profileEdit = {
      disabled: true,
      changingData: false,
      changingPassword: false,
    };
    this.render();
  }
}
