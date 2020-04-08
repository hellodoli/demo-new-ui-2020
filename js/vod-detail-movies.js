var focusUp = 0;
var focusItem = 1;
var left = 0;
var countLeft = 0;
document.addEventListener('keydown', myFunctionkey);
function myFunctionkey(e){
    switch(e.keyCode){
        case 13:
            if(focusUp == 2){
                location.href = location.origin + '/vod-detail-series-movies.html';
            }
            break;
        case 8:
            window.history.back()
            break;
        case 38: //Up
            if(focusUp == 2){
                $('.state').removeClass('hidden');
                focusUp--;
                document.getElementsByClassName('button')[focusUp].classList.add('hover');                
            }else if(focusUp > 0){
                document.getElementsByClassName('button')[focusUp].classList.remove('hover');
                focusUp--;
                document.getElementsByClassName('button')[focusUp].classList.add('hover');
            }
        break;

        case 40: //Down
            if(focusUp >= 0){
                document.getElementsByClassName('button')[focusUp].classList.remove('hover');
                focusUp++;
                if(focusUp == 2){
                    $('.state').addClass('hidden');
                    document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
                }else{
                    document.getElementsByClassName('button')[focusUp].classList.add('hover');
                }
            }
        break;

        case 37:                        
            if(focusItem > 1){
                document.getElementsByClassName('border')[focusItem - 1].classList.remove('hidden');
                focusItem--;
            }
            if((focusItem - 1) == 0){
                left = 0;
                countLeft = 0;
                $('.list-item').css('left', left +'px');
                document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
            }else{
                document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
                if(focusItem % 8 == 0){
                    left += 160;
                    $('.list-item').css('left', left +'px');
                }
            }
        break;

        case 39:
            document.getElementsByClassName('border')[focusItem - 1].classList.remove('hidden');
            focusItem++;
            if(document.getElementsByClassName('border')[focusItem - 1]){
                if((focusItem - 1) == 0){
                    left = 0;
                    $('.list-item').css('left', left +'px');
                    document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
                }else{
                    document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
                    var lengthArray = $('.border').length;
                    if(focusItem % 8 == 0){
                        if( (focusItem/8) > countLeft ){
                            left -= 160;
                            $('.list-item').css('left', left +'px');  
                            countLeft = focusItem/8;
                        }
                    }
                }
            }else{                            
                focusItem--;
                document.getElementsByClassName('border')[focusItem - 1].classList.add('hidden');
            }
        break;
    }
}