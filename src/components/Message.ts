import Block from '../framework/Block';

interface MessageProps {
  // ofThisUser: boolean,
  text: string,
  time: string,
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return `
    <li class="message">
      <p class="message__text">{{text}}</p>
      <span class="message__time">{{time}}</span>
    </li>`;
  }
}
