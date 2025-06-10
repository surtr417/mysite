// Passive event listeners
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    'use strict';
    this.addEventListener('touchstart', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    'use strict';
    this.addEventListener('touchmove', handle, {
      passive: !ns.includes('noPreventDefault')
    });
  }
};

// Preloader js
$(window).on('load', function () {
  'use strict';
  $('.preloader').fadeOut(0);
});

$(document).ready(function () {
  'use strict';

  // Shuffle js filter and masonry
  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    // --- [ここから修正・追加] ---

    // 1. ユーザーがフィルターボタンをクリックした時の処理
    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);

        // URLのハッシュを更新する処理を追加
        if (history.pushState) {
          // 「All」ボタン(value='all')が選択された場合はハッシュを消す
          if (input.value && input.value !== 'all') {
            history.pushState(null, null, '#' + input.value);
          } else {
            // URLからハッシュ部分だけを削除する
            history.pushState(null, null, window.location.pathname + window.location.search);
          }
        }
      }
    });

    // 2. ページ読み込み時にURLハッシュを読み取り、初期フィルターを適用する処理
    var hash = window.location.hash.substring(1); // URLからハッシュ値を取得
    var initialFilterValue = '';

    // URLにハッシュが存在し、一致するフィルターボタンがあるか確認
    if (hash) {
      var $radioForHash = jQuery('input[name="shuffle-filter"][value="' + hash + '"]');
      if ($radioForHash.length > 0) {
        initialFilterValue = hash;
        // 全てのボタンの選択状態を一旦リセット
        jQuery('input[name="shuffle-filter"]').prop('checked', false).parent().removeClass('active');
        // ハッシュに一致するボタンを選択状態にする
        $radioForHash.prop('checked', true).parent().addClass('active');
      }
    }

    // ハッシュがない場合、HTMLでデフォルトでチェックされているボタン（例: "All"）の値を取得
    if (!initialFilterValue) {
      initialFilterValue = jQuery('input[name="shuffle-filter"]:checked').val() || 'all';
    }
    
    // 決定した初期フィルターを適用
    if (initialFilterValue) {
      myShuffle.filter(initialFilterValue);
    }
    
    // --- [修正・追加ここまで] ---
  }


  $('.portfolio-single-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000

  });

  $('.clients-logo').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('.testimonial-slider').slick({
    slidesToShow: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });

  //  Count Up
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

  // Turn cloaked e-mail addresses into clickable mailto links
  let emailSpans = document.getElementsByClassName("cloaked-e-mail");

  for (let emailSpan of emailSpans) {
    let emailLink = document.createElement("a");
    let emailAddress = emailSpan.attributes.getNamedItem("data-user").value.split('').reverse().join('') + "@" + emailSpan.attributes.getNamedItem("data-domain").value.split('').reverse().join('');
    emailLink.href = "mailto:" + emailAddress;
    emailLink.innerText = emailAddress;
    emailSpan.parentElement.insertBefore(emailLink, emailSpan);
    emailSpan.parentElement.removeChild(emailSpan)
  }

  // map initialize
  $(map);
});