let canvas;
let ctx;

let bgimg;

$(function () {
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
    ctx.fillText(document.querySelector('.division-textarea').innerHTML.toUpperCase(), canvas.width/2, (canvas.height / 100) * 5);

    ctx.font = "italic " + ((canvas.height / 100) * 8) + "px Proxima Nova Bold";
    ctx.fillText(document.querySelector('.title-textarea').innerHTML.toUpperCase(), canvas.width/2, (canvas.height / 100) * 20);

    let home = document.querySelector('.home-team-select').value;
    let away = document.querySelector('.away-team-select').value;

    if(home == 'IK Wormo'){
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText(home.toUpperCase(), canvas.width/2, (canvas.height / 100) * 38);
    }else{
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova";
        ctx.fillText(home.toUpperCase(), canvas.width/2, (canvas.height / 100) * 38);
    }
    
    ctx.font = "italic "+ ((canvas.height / 100) * 5) + "px Proxima Nova Bold";
    ctx.textAlign = "center";
    ctx.fillText('vs', canvas.width/2, (canvas.height / 100) * 48);

    if(away == 'IK Wormo'){
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText(away.toUpperCase(), canvas.width/2, (canvas.height / 100) * 63);
    }else{
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova Light";
        ctx.fillText(away.toUpperCase(), canvas.width/2, (canvas.height / 100) * 63);
    }

    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Semibold";
    let datex = ctx.measureText(document.querySelector('.date-textarea').value.toUpperCase());
    console.log('datex: ' + datex.width);
    let stadiumx = ctx.measureText(' EXERCISFÄLTET');
    console.log('stadiumx: ' + stadiumx.width);

    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Semibold";
    ctx.fillText(document.querySelector('.date-textarea').value.toUpperCase(), canvas.width/2 - stadiumx.width/2, (canvas.height / 100) * 75);
    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Light";
    ctx.fillText('EXERCISFÄLTET', canvas.width/2 + datex.width/2, (canvas.height / 100) * 75);

}