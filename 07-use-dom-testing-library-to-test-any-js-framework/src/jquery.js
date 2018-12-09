import $ from 'jquery';

$.fn.countify = function countify(selector = 'button') {
  const $button = this.find(selector);

  $button._count = 0;

  $button.click(() => {
    $button._count++;
    $button.text($button._count);
  });
};
