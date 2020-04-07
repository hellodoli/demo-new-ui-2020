var indexMovieCurrent = 0;
var tempIndexMovieCurrent1 = -1;
var tempIndexMovieCurrent2 = -1;
var startLoop2 = false;
var tempIndexMovieCurrent3 = -1;
var startLoop3 = false;
var indexRowCurrent = 0;

var numPageRow2 = 1;
var numPageRow3 = 1;
function controlRight () {
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

function controlLeft () {
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

function controlDown() {
  if (indexRowCurrent < 2) {
    indexRowCurrent += 1;
    if (indexRowCurrent == 1) { // row 2
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

function controlUp() {
  if (indexRowCurrent > 0) {
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
    }
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

  keyDown.left = controlLeft;
  keyDown.right = controlRight;
  keyDown.down = controlDown;
  keyDown.up = controlUp;
  init();
});