document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            console.log('Left key pressed');
            break;
        case 38:
            console.log('Up key pressed');
            break;
        case 39:
            console.log('Right key pressed');
            break;
        case 40:
            console.log('Down key pressed');
            break;
        case 13: 
            console.log('Enter key pressed');
            break;
    }
};
