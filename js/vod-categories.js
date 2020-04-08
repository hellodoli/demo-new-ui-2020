var indexMovieCurrent = 0;
var tempIndexMovieCurrent1 = -1;
var tempIndexMovieCurrent2 = -1;
var tempIndexMovieCurrent3 = -1;
var indexRowCurrent = 0;
// page
var numPageRow1 = 1;
var numPageRow2 = 1;
var numPageRow3 = 1;

var isHandleMore = false; // #movieMoreList
var indexMovieCurrentMore = 0;
var itemsMore = null;

function getCurrentMovieM (isJquery) {
  if (itemsMore && itemsMore.length > 0) {
    if (typeof isJquery == 'undefined') isJquery = true;
    var currentMoview = itemsMore[indexMovieCurrentMore];
    if (isJquery) return $(currentMoview);
    return currentMoview;  
  }
  return null;
}

function setCurrentMovieActiveM () {
  var $currentMovie = getCurrentMovieM();
  if ($currentMovie.length > 0) {
    $('#movieMoreList .stt-movie-row-item').removeClass('active');
    $currentMovie.addClass('active');
  }
}

function setSlideToFocusM () {
  var $currentMovie = $('#movieMoreList .stt-movie-row-item.active');
  var pos = $currentMovie.children('.stt-img-holder-ratio').offset();
  $('.stt-movie-row-item-focus-2').css({
    top: pos.top - 12,
    left: pos.left - 12,
    transition: 'all .2s ease'
  });
}

function setActiveM () {
  setCurrentMovieActiveM();
  setTimeout(setSlideToFocusM, 10);
}

//
function getCurrentMovie (isJquery) {
  var rowMovies = document.getElementsByClassName('stt-movie-row');
  var currentMoview = rowMovies[indexRowCurrent].getElementsByClassName('stt-movie-row-item')[indexMovieCurrent];
  if (typeof isJquery == 'undefined') isJquery = true;
  if (isJquery) return $(currentMoview);
  return currentMoview;
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
  setTimeout(setSlideToFocus, 10);
}

function setActiveWithScroll () {
  if (indexRowCurrent == 2) {
    setActive();
    return;
  }

  setCurrentMovieActive();
  if (indexRowCurrent == 0) {
    $('.stt-section-overlay.is-top').hide();
    $('.stt-section-overlay.is-bottom').show();
  } else if (indexRowCurrent == 1) {
    $('.stt-section-overlay.is-top').show();
    $('.stt-section-overlay.is-bottom').show();
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
    total = 16;
    numPage = numPageRow1;
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
  $('#movieMoreList').css({ transition: 'all .2s ease' });
  setCurrentMovieActive();
  var $movieFocus = $('.stt-movie-row-item-focus');
  if ($movieFocus.length > 0) {
    $movieFocus
      .css({ transition: '' })
      .css({ transition: 'all .2s ease' });
    setTimeout(setSlideToFocus, 10);
  }
}

function controlLeft () {
  if (!isHandleMore) {
    var rowMovies = document.getElementsByClassName('stt-movie-row');
    var $a = $(rowMovies[indexRowCurrent]).find('.stt-movie-row-list');
    var trans = (138 + 30)*7;

    if (indexMovieCurrent > 0) {
      indexMovieCurrent -= 1;
      if ((indexMovieCurrent + 1) % 7 == 0) {
        var numPage = 0;
        if (indexRowCurrent == 0) {
          numPageRow1 -= 1;
          numPage = numPageRow1;
        } else if (indexRowCurrent == 1) {
          numPageRow2 -= 1;
          numPage = numPageRow2;
        } else {
          numPageRow3 -= 1;
          numPage = numPageRow3;
        }

        $a.css({
          'transition': 'all .2s linear',
          'transform': 'translateX(' + (numPage - 1)*(-trans) +'px)'
        });
        $('.stt-movie-row-item-focus')
          .hide()
          .css({ 'transition': '' });
        setCurrentMovieActive();
        setTimeout(setSlideToFocusReset, 250);
        setPage();
      } else {
        setActive();
      }
    }
  } else {
    if (indexMovieCurrentMore > 0) {
      if (indexMovieCurrentMore % 7 == 0) return;
      indexMovieCurrentMore -= 1;
      setActiveM();
    }
  }
}

function controlRight () {
  if (!isHandleMore) {
    var rowMovies = document.getElementsByClassName('stt-movie-row');
    var movies = rowMovies[indexRowCurrent].getElementsByClassName('stt-movie-row-item');
    var $a = $(rowMovies[indexRowCurrent]).find('.stt-movie-row-list');
    var trans = (138 + 30)*7;

    if (indexMovieCurrent < movies.length - 1) {
      indexMovieCurrent += 1;
      if (indexMovieCurrent % 7 == 0) {
        var numPage = 0;
        if (indexRowCurrent == 0) {
          numPageRow1 += 1;
          numPage = numPageRow1;
        } else if (indexRowCurrent == 1) {
          numPageRow2 += 1;
          numPage = numPageRow2;
        } else {
          numPageRow3 += 1;
          numPage = numPageRow3;
        }
        
        $a.css({
          'transition': 'all .2s linear',
          'transform': 'translateX(' + (numPage - 1)*(-trans) +'px)'
        });

        $('.stt-movie-row-item-focus')
          .hide()
          .css({ 'transition': '' });
        setCurrentMovieActive();
        setTimeout(setSlideToFocusReset, 250);
        setPage();
      } else {
        setActive();
      }
    }
  } else {
    if (indexMovieCurrentMore < itemsMore.length - 1) {
      if ((indexMovieCurrentMore + 1) % 7 == 0) return;
      indexMovieCurrentMore += 1;
      setActiveM();
    }
  }
}

function controlUp () {
  if (!isHandleMore) {
    if (indexRowCurrent > 0) {
      indexRowCurrent -= 1;
      if (indexRowCurrent == 0) { // row 1
        tempIndexMovieCurrent2 = indexMovieCurrent; // lưu row 2
        indexMovieCurrent = ((numPageRow1 - 1)*7) + (tempIndexMovieCurrent2 % 7);
        setActiveWithScroll();
      } else if (indexRowCurrent == 1) {// row 2
        tempIndexMovieCurrent3 = indexMovieCurrent; // lưu row 3
        indexMovieCurrent = ((numPageRow2 - 1)*7) + (tempIndexMovieCurrent3 % 7);
        setActive();
      }
    }
  } else {
    if (indexMovieCurrentMore > 6) {
      var curRow = parseInt(indexMovieCurrentMore / 7);
      indexMovieCurrentMore -= 7;
      var $prevItem = $(itemsMore[(curRow - 1)*7]);
      if (($prevItem.offset().top < 0)) { // Start Slide
        trans += 230;
        setCurrentMovieActiveM();
        $('#movieMoreList')
          .css({
            'transform': 'translateY(' + trans + 'px)'
          });

        var $prevprevItem = $(itemsMore[(curRow - 2)*7]);
        if ($prevprevItem.length > 0) {
          $('.stt-section-overlay.is-top').show();
          $('.stt-section-overlay.is-bottom').show();
        } else {
          $('.stt-section-overlay.is-top').hide();
          $('.stt-section-overlay.is-bottom').show();
        }
        
      } else {
        setActiveM();
      }
    }
  }
}

var trans = 0;
function controlDown () {
  if (!isHandleMore) {
    if (indexRowCurrent < 2) {
      indexRowCurrent += 1;
      if (indexRowCurrent == 1) { // row 2
        tempIndexMovieCurrent1 = indexMovieCurrent; // lưu row 1
        indexMovieCurrent = ((numPageRow2 - 1)*7) + (tempIndexMovieCurrent1 % 7);
        setActiveWithScroll();
      } else if (indexRowCurrent == 2) {// row 3
        tempIndexMovieCurrent2 = indexMovieCurrent; // lưu row 2
        indexMovieCurrent = ((numPageRow3 - 1)*7) + (tempIndexMovieCurrent2 % 7);
        setActive();
      }
    }
  } else {
    var dataLength = itemsMore.length;
    var rowNumber = (dataLength % 7 == 0) ? (dataLength / 7) : (parseInt(dataLength / 7) + 1);
    var startLastRow = 7*(rowNumber - 1);
    if (indexMovieCurrentMore < startLastRow) {
      var curRow = parseInt(indexMovieCurrentMore / 7);
      indexMovieCurrentMore += 7;
      if (indexMovieCurrentMore > (dataLength - 1)) indexMovieCurrentMore = dataLength - 1;
      var $nextItem = $(itemsMore[(curRow + 1)*7]);
      if (($nextItem.offset().top + $nextItem.height()) > window.outerHeight) { // Start Slide
        trans -= 230;
        setCurrentMovieActiveM();
        $('#movieMoreList')
          .css({
            'transform': 'translateY(' + trans + 'px)'
          });
        
        var $nextnextItem = $(itemsMore[(curRow + 2)*7]);
        if ($nextnextItem.length > 0) {
          $('.stt-section-overlay.is-top').show();
          $('.stt-section-overlay.is-bottom').show();
        } else {
          $('.stt-section-overlay.is-top').show();
          $('.stt-section-overlay.is-bottom').hide();
        }
      } else {
        setActiveM();
      }
    }
  }
}

function controlEnter () {
  if (!isHandleMore) {
    if (indexRowCurrent == 0) {
      if ($('.stt-movie-row-item.is-add').hasClass('active')) {
        isHandleMore = true;
        $('.stt-section-overlay.is-top').hide();
        $('.stt-section-overlay.is-bottom').show();

        var list = document.getElementById('movieMoreList');
        itemsMore = list.getElementsByClassName('stt-movie-row-item');
        $('#movieMoreList').css({ 'transition': 'all .2s ease' });
        setCurrentMovieActiveM();
        setSlideToFocusM();
        $('.stt-movie-row-item-focus-2').show();
        $('.stt-movie-more').removeClass('is-hide');
      }
    }
  }
}

function controlBack () {
  if (isHandleMore == true) {
    isHandleMore = false;
    $('.stt-movie-row-item-focus-2').hide();
    $('.stt-section-overlay.is-top').hide();
    $('.stt-section-overlay.is-bottom').show();
    indexMovieCurrentMore = 0;
    trans = 0;
    $('#movieMoreList')
      .css({ 'transition': '' })
      .css({ 'transform': 'translateY(' + trans + 'px)' });
    $('.stt-movie-more').addClass('is-hide');
  }
}

$(document).ready(function () {
  console.log('vod Categories ready');

  keyDown.left = controlLeft;
  keyDown.right = controlRight;
  keyDown.down = controlDown;
  keyDown.up = controlUp;
  keyDown.enter = controlEnter;
  keyDown.back = controlBack;
  init();
});