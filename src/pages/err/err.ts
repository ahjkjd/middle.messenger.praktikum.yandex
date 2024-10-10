import Block from '../../framework/Block';

interface IError {
  number: number,
  message: string,
}

export class Err extends Block {
  constructor(props: IError) {

    super({
      number: props.number,
      message: props.message,
    });
  }

  override render() {
    return `
    <main class="error-page">
      <h1 class="error-page__number">{{number}}</h1>
      <p class="error-page__text">{{message}}</p>
      <a href="#" class="error-page__link" data-page="chats">Назад к чатам</a>
    </main>`;
  }
}
