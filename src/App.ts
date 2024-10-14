import Handlebars from 'handlebars';
import { Err } from './pages/err/err';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Chats } from './pages/chats/chats';
import { Profile, User } from './pages/profile/profile';
import { menu } from './pages/menu/menu.js';

interface AppState {
  currentPage: string;
  user: User;
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
      user: testUser,
    };
    this.appElement = document.getElementById('app') as HTMLElement;
  }

  render() {
    let template;
    if (this.state.currentPage === 'menu') {
      template = Handlebars.compile(menu);
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
      const ProfilePage = new Profile(testUser);
      this.appElement.replaceChildren(ProfilePage.getContent());
    } else if (this.state.currentPage === 'chats') {
      const ChatsPage = new Chats();
      this.appElement.replaceChildren(ChatsPage.getContent());
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
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
    // Breaks whan a page rerenders
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
}
