var KEYCODE = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13
};

var keyDown = {
    right: function () {},
    left: function () {},
    up: function () {},
    down: function () {},
    enter: function () {}
};

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
            keyDown.enter(); 
            console.log('Enter key pressed');
            break;
    }
};
