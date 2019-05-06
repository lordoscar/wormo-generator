let canvas;
let ctx;

//parts
let bgimg;

console.log(document.fonts.check('40px Proxima Nova Light'));

$(function () {
    let teams = $.getJSON('../assets/teams/teams.json');
    console.log(teams);
});

document.fonts.ready.then(function () {
    var cw = $('.canvas-container').width();
    $('.canvas-container').css({ 'height': cw + 'px' });

    // Handler for .ready() called.
    canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');
    fitToContainer(canvas);

    ctx.fillStyle = 'white';

    function fitToContainer(canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    bgimg = new Image();
    bgimg.onload = function () {
        drawImage(bgimg);
    }

    bgimg.src = "img/bg.jpg";
});

function drawImage() {
    ctx.drawImage(bgimg,
        canvas.width / 2 - bgimg.width / 2,
        canvas.height / 2 - bgimg.height / 2
    );
    var overlayimg = document.querySelector('.overlay-img');
    ctx.drawImage(overlayimg, 0, 0, overlayimg.width, overlayimg.height,     // source rectangle
        0, 0, canvas.width, canvas.height);

    ctx.font = ((canvas.height / 100) * 4) + "px Proxima Nova";
    ctx.textAlign = "center";
    ctx.fillText('DIVISION 4 VÄSTRA', canvas.width/2, (canvas.height / 100) * 5);

    ctx.font = "italic " + ((canvas.height / 100) * 8) + "px Proxima Nova Bold";
    ctx.fillText('RUBRIK!', canvas.width/2, (canvas.height / 100) * 20);

    let home = 'wormo';
    let away = 'besa';

    if(home == 'wormo'){
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText('HEMMALAG', canvas.width/2, (canvas.height / 100) * 38);
    }else{
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova";
        ctx.fillText('HEMMALAG', canvas.width/2, (canvas.height / 100) * 38);
    }
    
    ctx.font = "italic "+ ((canvas.height / 100) * 5) + "px Proxima Nova Bold";
    ctx.textAlign = "center";
    ctx.fillText('vs', canvas.width/2, (canvas.height / 100) * 48);

    if(away == 'wormo'){
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText('BORTALAG', canvas.width/2, (canvas.height / 100) * 63);
    }else{
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova Light";
        ctx.fillText('BORTALAG', canvas.width/2, (canvas.height / 100) * 63);
    }
}