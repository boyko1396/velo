$(document).ready(function() {
  triggerCopy();
  animatedMainInit();
  downloadReceiptEvent();

  $('.aside__slide:first').show();
  $('.js-step-1').click(function() {
    $('body').addClass('is-animation-active is-page-check');
    $('.main__content').hide();
    $(this).parents('.aside__slide').slideToggle(450);
    $(this).parents('.aside__slide').next().slideToggle(450);
  });

  $('.js-progress-hook').click(function() {
    $(this).parents('.aside__slide').slideToggle(450);
    $(this).parents('.aside__slide').next().slideToggle(450);
    $('.js-progress').toggleClass('is-active');
    setTimeout(function() {
      $('body').addClass('is-animation');
    }, 550);
    setTimeout(function() {
      $('.main').addClass('main--bg-dark');
      $('.main__inner').hide(0);
      $('.main__result').slideToggle(400);
    }, 1700);
  });

  // result nav
  $(function() {
    $('.js-btn-method').click(function() {
      $('.layout__protect-block').hide();
      $('.main__transfer-wrap').show();
    });
  });

  $(function() {
    $('#' + $('.js-payment-method:checked').val()).show();
    $('.js-payment-method').change(function(){
      $('.main__payments--2').hide();
      $('#' + $(this).val()).show();
    });
  });

  // copy el
  function triggerCopy() {
    $('.js-copy-trigger').click(function() {
      var copyText = $(this).data('copy');
      var copyTextCopied = $(this).data('copy-text');
      var copyCurrent = $(this);

      var $copyCopy = $(this);
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val($copyCopy.text()).select();
      document.execCommand('copy');
      $temp.remove();

      copyCurrent.addClass('is-copied');
      setTimeout(function() {
        copyCurrent.removeClass('is-copied');
      }, 1500);
    });
  }

  // event after download receipt
  function downloadReceiptEvent() {
    $('.js-download-receipt-input').change(function() {
      $('.main__transfer-wrap, .layout__protect').hide();
      $('.main').addClass('is-completed');
      $('.main__success').addClass('is-show');
    });
  }

  $('.js-faq-toggle').click(function() {
    $('.main__content').slideToggle(350);
    $('.main__header-content-security').toggleClass('is-active');
    $('.main__aside').toggleClass('is-faq-active');
  });

  // animation main page
  function animatedMainInit() {
    setTimeout(function() {
      $('body').addClass('is-animation-el');
    }, 550);
  }

  $('.js-form-init').click(function() {
    $('body').addClass('is-payment');
    $('.main__result').hide();
    $('.layout__protect').show();
    $('.main').removeClass('main--bg-dark');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var dropdownBtn = document.querySelector('.js-dropdown-block-btn');
  dropdownBtn.addEventListener('click', function() {
    var dropdownBlock = this.closest('.dropdown-block');
    dropdownBlock.classList.toggle('is-active');
  });
});

// faq collapsed
var toggleButtons = document.querySelectorAll('.js-faq-item-toggle');

toggleButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var listItem = this.closest('.main__content-faq-list-item');

    listItem.classList.toggle('is-show');
  });
});

// countdown
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');;
const progressLine = document.querySelector('.course-card__footer-counter-line');

let minutes = parseInt(localStorage.getItem('minutes')) || 59;
let seconds = parseInt(localStorage.getItem('seconds')) || 58;

function updateCounter() {
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');

  seconds--;

  if (seconds < 0) {
    if (minutes === 0) {
      clearInterval(interval);
      return;
    }
    seconds = 59;
    minutes--;
  }

  localStorage.setItem('minutes', minutes.toString());
  localStorage.setItem('seconds', seconds.toString());

  const totalSeconds = minutes * 60 + seconds;
  const progress = (totalSeconds / (59 * 60)) * 100;
  progressLine.style.width = progress + '%';
}

const interval = setInterval(updateCounter, 1000);