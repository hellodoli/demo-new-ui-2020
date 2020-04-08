var KEYCODE = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    BACK: 8
};

var keyDown = {
    right: function () {},
    left: function () {},
    up: function () {},
    down: function () {},
    enter: function () {},
    back: function () {}
};

var urlDetailMovies = location.origin + '/vod-detail-movies.html';
var urlDetailSeriesMovies = location.origin + '/vod-detail-series-movies.html';
var urlCategoriesMovies = location.origin + '/vod-categories.html';
var urlHomeMoview = location.origin + '/vod-home.html';

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case KEYCODE.LEFT:
            console.log('Left key pressed');
            keyDown.left();
            break;
        case KEYCODE.UP:
            console.log('Up key pressed');
            keyDown.up();
            break;
        case KEYCODE.RIGHT:
            console.log('Right key pressed');
            keyDown.right();
            break;
        case KEYCODE.DOWN:
            console.log('Down key pressed');
            keyDown.down();
            break;
        case KEYCODE.ENTER:
            console.log('Enter key pressed');
            keyDown.enter(); 
            break;
        case KEYCODE.BACK:
            console.log('Back key pressed');
            keyDown.back(); 
            break;
    }
};
