import Block from '../framework/Block';

interface InputProps {
  disabled: boolean;
  id: string;
  class?: string;
  type?: string;
  value?: string;
  placeholder? : string,
  onBlur: (e: Event) => void,
  onChange: (e: Event) => void,
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => props.onBlur(e),
        change: (e: Event) => props.onChange(e),
      },
    });
  }

  override render(): string {
    return `
    <input id="{{id}}" name="{{id}}" type="{{type}}" value="{{value}}" class="{{class}}__input" placeholder="{{placeholder}}"
      {{#if disabled}}disabled{{/if}}/>`;
  }
}
