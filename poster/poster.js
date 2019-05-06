let canvas;
let ctx;

let bgimg;

$(function () {
    //$.getJSON('../assets/teams/teams.json'), function(data){
    let teams = JSON.parse(data);

    $('.home-team-select').append("<optgroup label='Herr'>");
    $('.away-team-select').append("<optgroup label='Herr'>");

    teams.herr.forEach(element => {
        //for each mens team
        $('.home-team-select').append("<option>" + element.name + "</option")
        $('.away-team-select').append("<option>" + element.name + "</option")
    });

    $('.home-team-select').append("</optgroup>");
    $('.away-team-select').append("</optgroup>");

    $('.home-team-select').append("<optgroup label='Dam'>");
    $('.away-team-select').append("<optgroup label='Dam'>");

    teams.dam.forEach(element => {
        //for each ladies team
        $('.home-team-select').append("<option>" + element.name + "</option")
        $('.away-team-select').append("<option>" + element.name + "</option")
    });
    $('.home-team-select').append("</optgroup>");
    $('.away-team-select').append("</optgroup>");
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

function changedImg(){
    var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();
    reader.onloadend = function(){
        bgimg.src = reader.result;
        drawImage(bgimg);
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        bgimg.src = "img/bg.jpg";
    }
}

function drawImage(bgimg) {
    // get the scale
    var scale = Math.max(canvas.width / bgimg.width, canvas.height / bgimg.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (bgimg.width / 2) * scale;
    var y = (canvas.height / 2) - (bgimg.height / 2) * scale;
    ctx.drawImage(bgimg, x, y, bgimg.width * scale, bgimg.height * scale);

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