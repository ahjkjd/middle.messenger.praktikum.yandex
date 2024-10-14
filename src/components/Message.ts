import Block from '../framework/Block';

export interface IMessage {
  id: string,
  text: string,
  time: string,
  // ofThisUser: boolean,
}

export class Message extends Block {
  constructor(props: IMessage) {
    super({
      ...props,
    });
  }

  override render(): string {
    return `
    <li class="message" id="{{id}}">
      <p class="message__text">{{text}}</p>
      <span class="message__time">{{time}}</span> 
    </li>`;
  }
}
