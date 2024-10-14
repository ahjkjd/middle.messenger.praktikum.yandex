import { Input } from './Input';
import { Button } from './Button';
import { IMessage, Message } from './Message';
import Block from '../framework/Block';

export interface IChat {
  name: string,
  Messages: IMessage[],
}

export class Chat extends Block {
  constructor(props: IChat) {
    super({
      MessageInput: new Input({
        disabled: false,
        id: 'message',
        class: 'chat',
        type: 'text',
        placeholder: 'Сообщение',
        onBlur: () => {},
        onChange: (event) => this.props.newMessage = ((event.target as HTMLInputElement).value),
      }),
      OptionsButton: new Button({
        text: '',
        disabled: false,
        class: 'chat__options',
        type: 'button',
        onClick: () => {},
      }),
      AttachButton: new Button({
        text: '',
        disabled: false,
        class: 'chat__attach',
        type: 'button',
        onClick: () => {},
      }),
      SendButton: new Button({
        text: '',
        disabled: false,
        class: 'chat__send',
        type: 'submit',
        onClick: (event) => {
          event.preventDefault();
          this.addMessage();
        },
      }),
      name: props.name,
      newMessage: '',
      Messages: props.Messages.map((item) => new Message(item)),
    });
  }

  addMessage(): void {
    const newMessage = new Message({
      id: 'message-' + this.lists.Messages.length,
      text: this.props.newMessage,
      time: '',
    });
    const messages = this.lists.Messages as Array<Message>;
    messages.push(newMessage);
    this.setLists({ Messages: messages });
  }

  override render(): string {
    return `
    <div class="chat">
      <div class="chat__header">
        <div class="chat__user">
          <img class="chat__avatar" src="/src/images/avatar.svg" alt="Аватар"/>
          <p class="chat__name">{{name}}</p>
        </div>
        {{{ OptionsButton }}}
      </div>
      <ul class="chat__messages">
        {{{ Messages }}}
      </ul>
      <form class="chat__footer">
        {{{ AttachButton }}}
        {{{ MessageInput }}}
        {{{ SendButton }}}
      </form>
    </div>`;
  }
}
