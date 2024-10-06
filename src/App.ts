import Handlebars from 'handlebars';
import * as Pages from './pages/index.js';

// Register partials
import Input from './components/Input.js';

Handlebars.registerPartial('Input', Input);

const testUser = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+7 (123) 456 78 90',
};

export default class App {
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
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'menu') {
      template = Handlebars.compile(Pages.Menu);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'notFound') {
      template = Handlebars.compile(Pages.Err);
      this.appElement.innerHTML = template({
        number: 404,
        message: 'Не туда попали',
      });
    } else if (this.state.currentPage === 'serverError') {
      template = Handlebars.compile(Pages.Err);
      this.appElement.innerHTML = template({
        number: 500,
        message: 'Мы уже фиксим',
      });
    } else if (this.state.currentPage === 'login') {
      template = Handlebars.compile(Pages.Login);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'register') {
      template = Handlebars.compile(Pages.Register);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'profile') {
      template = Handlebars.compile(Pages.Profile);
      this.appElement.innerHTML = template({
        user: this.state.user,
        profileEdit: this.state.profileEdit,
      });
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

    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });

    // Temporary, to be replaced by form submission
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.dataset.page) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.changePage(e.target.dataset.page);
        });
      }
    });
  }

  changePage(page) {
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
