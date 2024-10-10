import { Button } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import { Select } from '../../components/select/Select';
import Block from '../../framework/Block';

const mockQuestions = [
  'Do you enjoy outdoor activities?',
  'Are you a morning person?',
];

const moreMockQuestions = [
  'Do you prefer coffee or tea?',
  'Have you traveled abroad in the last year?',
  'Do you have any pets?',
];

export class AnswerPage extends Block {
  constructor() {
    
    super({
      Footer: new Footer(),
      Button: new Button({
        disabled: false,
        id: 'submit-answers',
        text: 'Submit Answers',
        onClick: () => this.addNewQuestions(),
      }),
      Questions: mockQuestions.map((item) => new Select({ id: mockQuestions.indexOf(item) + ' i', question: item })),
    });
  }

  addNewQuestions(): void {
    let questions = (this.lists.Questions as Array<Select>).concat(
      moreMockQuestions.map((item) => new Select({ id: moreMockQuestions.indexOf(item) + ' i', question: item })),
    );
    this.setLists({ Questions: questions });
  }

  override render() {
    return `
    <div class="app">
      <h1>Answer Questionnaire</h1>
      <div class="answer-questionnaire">
        {{{ Questions }}}
      </div>
      {{{ Button }}}
      {{{ Footer }}}
    </div>`;
  }
}
