import { Message } from '../../components/Message';
import { ChatPreview } from '../../components/ChatPreview';
import { Chat, IChat } from '../../components/Chat';
import Block from '../../framework/Block';

const mockChats = [
  {
    name: 'Name 1',
    Messages: [
      {
        id: '1-1',
        text: 'Message 1',
        time: '12:00',
      },
      {
        id: '1-2',
        text: 'Message 2',
        time: '12:01',
      },
    ],
  },
  {
    name: 'Name 2',
    Messages: [
      {
        id: '2-1',
        text: 'Message',
        time: '10:00',
      },
    ],
  },
];

export class Chats extends Block {
  constructor() {
    super({
      Chat: new Chat(mockChats[0] as IChat),
      ChatList: mockChats.map(item => new ChatPreview({
        id: mockChats.indexOf(item),
        name: item.name,
        text: item.Messages[item.Messages.length - 1].text,
        time: item.Messages[item.Messages.length - 1].time,
        unread: 0,
        onClick: () => {
          const id = mockChats.indexOf(item);
          this.setChat(id);
        },
      })),
      chatChosen: false,
    });
  }

  setChat(id: number): void {
    this.setProps({
      chatChosen: true,
    });
    // Updating name when opening another chat
    this.children.Chat.setProps(mockChats[id]);
    // Updating message list . Memory leak?
    this.children.Chat.setLists({ Messages: mockChats[id].Messages.map((item) => new Message(item)) });
    
  }

  override render() {
    return `
    <main class="chats">
      <div class="chats__left">
        <a href="#" class="chats__profile-link" data-page="profile">Профиль</a>
        <input class="chats__search" placeholder="Поиск"/>
        <ul class="chats__list">
          {{{ ChatList }}}
        </ul>
      </div>
      <div class="chats__right">`
      + (this.props.chatChosen
        ?
        '{{{ Chat }}}'
        :
        '<p class="chats__landing">Выберите чат чтобы отправить сообщение</p>')
        + `
      </div>
    </main>`;
  }
}
