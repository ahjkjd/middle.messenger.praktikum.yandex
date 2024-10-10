import Block from '../framework/Block';

interface ButtonProps {
  disabled: boolean;
  class?: string;
  type?: string;
  text: string;
  onClick: (e: Event) => void,
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
    <button type="{{type}}" class="{{class}}" {{#if disabled}}disabled{{/if}}>{{text}}</button>`;
  }
}
