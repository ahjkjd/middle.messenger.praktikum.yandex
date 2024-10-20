import Block from '../framework/Block';

interface IChatPreview {
  id: number,
  name: string,
  text: string,
  time: string,
  unread: number,
  onClick: (e: Event) => void,
}

export class ChatPreview extends Block {
  constructor(props: IChatPreview) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
    <li class="chat-preview" id="{{id}}">
      <img class="chat-preview__avatar" src="/src/images/avatar.svg" alt="Аватар"/>
      <div class="chat-preview__container">
        <p class="chat-preview__name">{{name}}</p>
        <p class="chat-preview__text">{{text}}</p>
      </div>
      <div>
        <span class="chat-preview__time">{{time}}</span> 
        <span class="chat-preview__unread">{{unread}}</span>
      </div>
    </li>`;
  }
}
