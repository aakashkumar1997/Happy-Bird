$(function () {

    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole1 = $('#pole1');
    var pole2 = $('#pole2');
    var score_span = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');
    
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_width = parseInt(pole.width());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var go_up = false;
    var speed = 20;
    var score = 0;
    var flag = true;
    var game_over = false;
    
    speed_span.text(speed);
    score_span.text(score);
    
    var the_game = setInterval(function () {
        if(collision(bird,  pole1) || collision(bird , pole2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) >= container_height - bird_height){
            stop_the_game();
            game_over = true;
        }
        else{
            var pole_current_position = parseInt(pole.css('right'));
            
            if(container_width - bird_left < pole_current_position && flag){
                score = score + 1;
                speed = speed + 1;
                score_span.text(score);
                speed_span.text(speed);
                flag = false;
            }
            
            if(pole_current_position > container_width){
                var new_height = parseInt(Math.random() * 100);
                var fact = Math.floor(10 * Math.random());
                var fact2 = Math.random();
                pole1.css('height' , pole_initial_height + Math.pow(-1 , fact) * (fact2 * new_height));
                pole2.css('height' , pole_initial_height - Math.pow(-1 , fact) * (fact2 * new_height));
                pole_current_position = pole_initial_position;
                flag = true;
            }
            
            pole.css('right' , pole_current_position + speed);

            if(go_up === false){
                go_down();
            }
            
            $(document).on('keydown', function(e)   {
                var key = e.keyCode; 
                if(key === 32 && go_up === false && game_over === false){
                    go_up = setInterval(up,50);
                }
            });

            $(document).on('keyup', function(e)   {
                var key = e.keyCode; 
                if(key === 32){
                    clearInterval(go_up);
                    go_up = false;
                }
            }); 
        }
    } , 40);
    
    function go_down(){
        bird.css('top' , parseInt(bird.css('top')) + 5);
    }
    function up(){
        if(game_over === false)
        bird.css('top' , parseInt(bird.css('top')) - 5)
    }
    function stop_the_game(){
        clearInterval(the_game);
        restart_btn.slideDown();
    }
    restart_btn.click(function () {
        location.reload();
    });
    
    function collision ($div1 , $div2){
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        
        if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)    return false;
        return true;
    }

});