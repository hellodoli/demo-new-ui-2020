var indexMovieCurrent = 0;
var tempIndexMovieCurrent1 = -1;
var tempIndexMovieCurrent2 = -1;
var startLoop2 = false;
var tempIndexMovieCurrent3 = -1;
var startLoop3 = false;
var indexRowCurrent = 0;

var numPageRow2 = 1;
var numPageRow3 = 1;

var menuH = null;
var indexMenuCurrent = 0;

function resetButton () {
  $('.stt-movie-view-info .stt-btn.btn-1').removeClass('active');
  $('.stt-movie-view-info .stt-btn.btn-1')
    .find('img').attr('src', 'images/vod-home/icon/icon-play-normal.png');
  $('.stt-movie-view-info .stt-btn.btn-2').removeClass('active');
  $('.stt-movie-view-info .stt-btn.btn-2')
    .find('img').attr('src', 'images/vod-home/icon/icon-info-normal.png'); 
}

function swapButton () {
  if ($('.stt-movie-view-info .stt-btn.btn-1').hasClass('active')) {
    $('.stt-movie-view-info .stt-btn.btn-1').removeClass('active');
    $('.stt-movie-view-info .stt-btn.btn-1')
      .find('img').attr('src', 'images/vod-home/icon/icon-play-normal.png');
    $('.stt-movie-view-info .stt-btn.btn-2').addClass('active');
    $('.stt-movie-view-info .stt-btn.btn-2')
      .find('img').attr('src', 'images/vod-home/icon/icon-info-focus.png');
  } else {
    $('.stt-movie-view-info .stt-btn.btn-2').removeClass('active');
    $('.stt-movie-view-info .stt-btn.btn-2')
      .find('img').attr('src', 'images/vod-home/icon/icon-info-normal.png');
    $('.stt-movie-view-info .stt-btn.btn-1').addClass('active');
    $('.stt-movie-view-info .stt-btn.btn-1')
      .find('img').attr('src', 'images/vod-home/icon/icon-play-focus.png');
  }
}

function slideFocusMenu () {
  var pos = $('.menu-item.focus').position();
  $('.fake-indicator').css({
    left: pos.left,
    top: pos.top
  });
}

function setActiveMenu () {
  if (menuH.length > 0) {
    $('.menu-item').removeClass('focus');
    $(menuH[indexMenuCurrent]).addClass('focus');
  }
}

function activeMenu () {
  setActiveMenu();
  setTimeout(slideFocusMenu, 10);
}

function controlRight () {
  if (indexRowCurrent == -1) {
    swapButton();
  } else if (indexRowCurrent == -2) {
    if (indexMenuCurrent < 3) {
      indexMenuCurrent += 1;
      activeMenu();
    }
  } else {
    indexMovieCurrent += 1;
    if (indexRowCurrent == 0) { // max 6
      if (indexMovieCurrent > 5) {
        indexMovieCurrent = 5;
        return;
      }
    }

    if (indexMovieCurrent % 7 == 0) {
      var rowMovies = document.getElementsByClassName('stt-movie-row');
      var $a = $(rowMovies[indexRowCurrent]).find('.stt-movie-row-list');
      var trans = (138 + 30)*7;
      
      if (indexRowCurrent == 1) {
        startLoop2 = true;
        numPageRow2 += 1;
        if (numPageRow2 > 16) numPageRow2 = 1;
      } else if (indexRowCurrent == 2) {
        startLoop3 = true;
        numPageRow3 += 1;
        if (numPageRow3 > 16) numPageRow3 = 1;
      }
      
      // slide
      $a.css({ 'transform': 'translateX('+ (-trans)+ 'px)'});
      setTimeout(function () {
        $a.css({
          'transition': 'all .2s linear',
          'transform': 'translateX(' + 2*(-trans) +'px)'
        })
        setTimeout(function () {
          $a.css({ 'transition': '' });
        }, 200);
      }, 20);
      
      indexMovieCurrent = 14; // hack code
      $('.stt-movie-row-item-focus')
        .hide()
        .css({ 'transition': '' });
      setCurrentMovieActive();
      setCurrentMovieView();
      setTimeout(setSlideToFocusReset, 250);
      
      setPage();
    } else {
      setActive();
    }
  }
}

function controlLeft () {
  if (indexRowCurrent == -1) {
    swapButton();
  } else if (indexRowCurrent == -2) {
    if (indexMenuCurrent > 0) {
      indexMenuCurrent -= 1;
      activeMenu();
    }
  } else {
    if (indexMovieCurrent > 0) {
      indexMovieCurrent -= 1;
      if ((indexMovieCurrent + 1) % 7 == 0) {
        var rowMovies = document.getElementsByClassName('stt-movie-row');
        var $a = $(rowMovies[indexRowCurrent]).find('.stt-movie-row-list');
        var trans = (138 + 30)*7;

        if (indexRowCurrent == 1) {
          numPageRow2 -= 1;
          if (numPageRow2 < 1) numPageRow2 = 16;
        } else if (indexRowCurrent == 2) {
          numPageRow3 -= 1;
          if (numPageRow3 < 1) numPageRow3 = 16;
        }

        // slide
        $a.css({ 'transform': 'translateX('+ 3*(-trans)+ 'px)'});
        setTimeout(function () {
          $a.css({
            'transition': 'all .2s linear',
            'transform': 'translateX(' + 2*(-trans) +'px)'
          })
          setTimeout(function () {
            $a.css({ 'transition': '' });
          }, 200);
        }, 20);
        
        indexMovieCurrent = 20; // hack code
        $('.stt-movie-row-item-focus')
          .hide()
          .css({ 'transition': '' });
        setCurrentMovieActive();
        setCurrentMovieView();
        setTimeout(setSlideToFocusReset, 250);
        setPage();
      } else {
        setActive();
      }
    }
  }
}

function controlDown() {
  if (indexRowCurrent < 2) {
    indexRowCurrent += 1;
    if (indexRowCurrent == -1) {
      indexMenuCurrent = 0;
      $('.menu-item').removeClass('focus');
      $('.fake-indicator').hide();
      activeMenu();
      
      if (saveButton == 1) {
        $('.stt-movie-view-info .stt-btn.btn-1').addClass('active');
        $('.stt-movie-view-info .stt-btn.btn-1')
          .find('img').attr('src', 'images/vod-home/icon/icon-play-focus.png');
      } else {
        $('.stt-movie-view-info .stt-btn.btn-2').addClass('active');
        $('.stt-movie-view-info .stt-btn.btn-2')
          .find('img').attr('src', 'images/vod-home/icon/icon-info-focus.png');
      }
      saveButton = 0;
      return;
    } else if (indexRowCurrent == 0) {
      $('.stt-movie-view-info .stt-btn').removeClass('active');
      $('.stt-movie-view-info .stt-btn.btn-1').find('img').attr('src', 'images/vod-home/icon/icon-play-normal.png');
      $('.stt-movie-view-info .stt-btn.btn-2').find('img').attr('src', 'images/vod-home/icon/icon-info-normal.png');
      $('.stt-movie-row-item-focus').show();
      return;
    } else if (indexRowCurrent == 1) { // row 2
      tempIndexMovieCurrent1 = indexMovieCurrent; // lưu row 1
      if (startLoop2) {
        indexMovieCurrent = ((3 - 1)*7) + (tempIndexMovieCurrent1 % 7);
      } else {
        indexMovieCurrent = tempIndexMovieCurrent1;
      }
    } else if (indexRowCurrent == 2) { // row 3
      tempIndexMovieCurrent2 = indexMovieCurrent; // lưu row 2
      var curPage = startLoop3 ? 3 : 1; // hack code
      indexMovieCurrent = ((curPage - 1)*7) + (tempIndexMovieCurrent2 % 7);
    }
    // slide
    setActiveWithScroll();
  }
}

var saveButton = 0;
function controlUp() {
  if (indexRowCurrent > -2) {
    indexRowCurrent -= 1;
    if (indexRowCurrent == 0) { // row 1
      tempIndexMovieCurrent2 = indexMovieCurrent; // lưu row 2
      if ((tempIndexMovieCurrent2 % 7) > 5) {
        $('.stt-movie-row-item-focus')
          .hide()
          .css({ 'transition': '' });
        indexMovieCurrent = 5;
        setActiveWithScroll();
        setTimeout(setSlideToFocusReset, 250);
      } else {
        indexMovieCurrent = tempIndexMovieCurrent2 % 7;
        setActiveWithScroll();
      }
      return;
    } else if (indexRowCurrent == 1) { // row 2
      tempIndexMovieCurrent3 = indexMovieCurrent; // lưu row 3
      var curPage = startLoop2 ? 3 : 1; // hack code
      indexMovieCurrent = ((curPage - 1)*7) + (tempIndexMovieCurrent3 % 7);
      // slide
      setActiveWithScroll();
    } else if (indexRowCurrent == -1) {
      /*tempIndexMovieCurrent1 = indexMovieCurrent;
      indexMovieCurrent = -1;*/
      $('.stt-movie-row-item-focus').hide();

      $('.stt-movie-view-info .stt-btn').removeClass('active');
      $('.stt-movie-view-info .stt-btn.btn-1').addClass('active');
      $('.stt-movie-view-info .stt-btn.btn-1').find('img').attr('src', 'images/vod-home/icon/icon-play-focus.png');
    } else if (indexRowCurrent == -2) { // focus menu
      indexMenuCurrent = 0;
      if ($('.stt-btn.btn-1').hasClass('active')) {
        saveButton = 1;
      } else {
        saveButton = 2;
      }
      resetButton();
      $('.menu-item.active').addClass('focus');
      $('.fake-indicator').show();
    }
  }
}

function controlEnter () {
  if (indexRowCurrent == -2) {
    if ($('.menu-item.focus').html() == 'Khám phá') {
      console.log(urlCategoriesMovies);
      location.href = urlCategoriesMovies;
    }
    return;
  }
  if (indexRowCurrent == 1) {
    location.href = urlDetailMovies;
  } else {
    location.href = urlDetailSeriesMovies;
  }
}

function setCurrentMovieView () {
  var $currentMovie = getCurrentMovie();
  if ($currentMovie.length > 0) {
    var view = JSON.parse($currentMovie.attr('data-view'));
    // set Background
    var section = document.querySelector('.stt-movie-container');
    section.style.background = 'url(' + view.bigBg + ') no-repeat top center / 100% 100vh';

    // set View
    $('.movie-year').html(view.year);
    $('.movie-duration').html(view.duration);
    $('.movie-type').html(view.type);
    $('.movie-ban').html(view.ban);
  }
}

function setCurrentMovieActive () {
  var $currentMovie = getCurrentMovie();
  if ($currentMovie.length > 0) {
    $('.stt-movie-row-item').removeClass('active');
    $currentMovie.addClass('active');
  }
}

function setSlideToFocus () {
  var $currentMovie = $('.stt-movie-row-item.active');
  var pos = $currentMovie.children('.stt-img-holder-ratio').offset();
  $('.stt-movie-row-item-focus').css({
    top: pos.top - 12,
    left: pos.left - 12,
    transition: 'all .2s ease'
  });
}

function setSlideToFocusReset () {
  var $currentMovie = $('.stt-movie-row-item.active');
  var pos = $currentMovie.children('.stt-img-holder-ratio').offset();

  $('.stt-movie-row-item-focus')
    .show()
    .css({
      top: pos.top - 12,
      left: pos.left - 12
    });
}

function setActive () {
  setCurrentMovieActive();
  setCurrentMovieView();
  setTimeout(setSlideToFocus, 10);
}

function setActiveWithScroll () {
  setCurrentMovieActive();
  setCurrentMovieView();
  if (indexRowCurrent == 0) {
    $('.stt-section-overlay.is-top').hide();
    $('.stt-section-overlay.is-bottom').show();
  } else if (indexRowCurrent == 1) {
    $('.stt-section-overlay.is-top').show();
    $('.stt-section-overlay.is-bottom').show();
  } else if (indexRowCurrent == 2) {
    $('.stt-section-overlay.is-top').show();
    $('.stt-section-overlay.is-bottom').hide();
  }
  $('.stt-movie-container')
    .css({
      'transform': 'translateY(' + (-260*indexRowCurrent)+ 'px)'
    });
}

function setPage () {
  var rowMovies = document.getElementsByClassName('stt-movie-row');
  var total = 0;
  var numPage = 0;
  if (indexRowCurrent == 0) {
    total = 6;
    numPage = (indexMovieCurrent + 1);
  } else if (indexRowCurrent == 1) {
    total = 16;
    numPage = numPageRow2;
  } else if (indexRowCurrent == 2) {
    total = 16;
    numPage = numPageRow3;
  }
  $(rowMovies[indexRowCurrent]).find('.page').html( numPage + '/' + total);
}

function init () {
  $('.stt-movie-container').css({ transition: 'all .2s ease' });
  $('.stt-section-overlay.is-top').hide();
  $('.fake-indicator').hide();
  $('.fake-indicator').css({ transition: 'all .2s ease' });
  setCurrentMovieActive();
  setCurrentMovieView();

  var $movieFocus = $('.stt-movie-row-item-focus');
  if ($movieFocus.length > 0) {
    $movieFocus
      .css({ transition: '' })
      .css({ transition: 'all .2s ease' });
    setTimeout(setSlideToFocus, 10);
  }
}

function getCurrentMovie (isJquery) {
  var rowMovies = document.getElementsByClassName('stt-movie-row');
  var currentMoview = rowMovies[indexRowCurrent].getElementsByClassName('stt-movie-row-item')[indexMovieCurrent];
  if (typeof isJquery == 'undefined') isJquery = true;
  if (isJquery) return $(currentMoview);
  return currentMoview;
}

$(document).ready(function () {
  console.log('vod Home ready');
  menuH = document.querySelectorAll('.stt-section-header .menu-item');
  $(menuH[indexMenuCurrent]).removeClass('focus');


  keyDown.left = controlLeft;
  keyDown.right = controlRight;
  keyDown.down = controlDown;
  keyDown.up = controlUp;
  keyDown.enter = controlEnter;
  init();
});