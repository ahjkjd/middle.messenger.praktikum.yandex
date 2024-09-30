export default `<li class="{{class}}__container">
  <p class="{{class}}__caption">{{caption}}</p>
  <input id="{{id}}" name="{{id}}" type="{{type}}" value="{{value}}" class="{{class}}__input"
    {{#if disabled}}disabled{{/if}}/>
  <p class="{{class}}__error">{{error}}</p>
</li>`;
