let canvas;
let ctx;
let teams = [];

let bgimg;


$(function () {
    teams = JSON.parse(data);

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

    document.querySelector('.division-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.title-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.date-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.insta-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.fb-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.home-team-select').addEventListener("change", drawImage);
    document.querySelector('.away-team-select').addEventListener("change", drawImage);

    bgimg = new Image();
    bgimg.onload = function () {
        drawImage();
    };
    bgimg.src = "img/bg.jpg";
});

function changedImg() {
    var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();
    reader.onloadend = function () {
        bgimg.src = reader.result;
        drawImage();
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        bgimg.src = "img/bg.jpg";
    }
}

function drawImage() {
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
        canvas.width = 2000;
        canvas.height = 2000;
    }

    // get the scale
    var scale = Math.max(canvas.width / bgimg.width, canvas.height / bgimg.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (bgimg.width / 2) * scale;
    var y = (canvas.height / 2) - (bgimg.height / 2) * scale;
    ctx.drawImage(bgimg, x, y, bgimg.width * scale, bgimg.height * scale);

    var overlayimg = document.querySelector('.overlay-img');
    ctx.drawImage(overlayimg, 0, 0, overlayimg.width, overlayimg.height,     // source rectangle
        0, 0, canvas.width, canvas.height);

    let home;
    let away;
    let homename = document.querySelector('.home-team-select').value;
    let awayname = document.querySelector('.away-team-select').value;

    console.log(teams);

    teams.herr.forEach(element => {
        if (element.name == homename) {
            home = element;
        }
        if (element.name == awayname) {
            away = element;
        }
    });

    teams.dam.forEach(element => {
        if (element.name == homename) {
            home = element;
        }
        if (element.name == awayname) {
            away = element;
        }
    });

    ctx.font = ((canvas.height / 100) * 4) + "px Proxima Nova";
    ctx.textAlign = "center";
    ctx.fillText(document.querySelector('.division-textarea').value.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 5);

    ctx.font = "italic " + ((canvas.height / 100) * 8) + "px Proxima Nova Bold";
    ctx.fillText(document.querySelector('.title-textarea').value.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 20);

    ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova Light";
    ctx.fillText("____________", canvas.width / 2, (canvas.height / 100) * 26);

    if (home.name == 'IK Wormo') {
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText(home.name.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 38);
    } else {
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova";
        ctx.fillText(home.name.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 38);
    }

    ctx.font = ((canvas.height / 100) * 5) + "px Proxima Nova";
    ctx.textAlign = "center";
    ctx.fillText('vs', canvas.width / 2, (canvas.height / 100) * 46);

    if (away.name == 'IK Wormo') {
        ctx.font = "italic " + ((canvas.height / 100) * 10) + "px Proxima Nova Bold";
        ctx.fillText(away.name.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 58);
    } else {
        ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova";
        ctx.fillText(away.name.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 58);
    }

    ctx.font = ((canvas.height / 100) * 10) + "px Proxima Nova Light";
    ctx.fillText("____________", canvas.width / 2, (canvas.height / 100) * 62);

    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Semibold";
    let datex = ctx.measureText(document.querySelector('.date-textarea').value.toUpperCase());
    console.log('datex: ' + datex.width);
    let stadiumx = ctx.measureText(' ' + home.stadium.toUpperCase());
    console.log('stadiumx: ' + stadiumx.width);

    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Semibold";
    ctx.fillText(document.querySelector('.date-textarea').value.toUpperCase(), canvas.width / 2 - stadiumx.width / 2, (canvas.height / 100) * 70);
    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova Light";
    ctx.fillText(home.stadium.toUpperCase(), canvas.width / 2 + datex.width / 2, (canvas.height / 100) * 70);

    let homeimg = new Image();
    homeimg.onload = function () {
        ctx.drawImage(homeimg, 0, 0, homeimg.width, homeimg.height, canvas.width / 2 - (canvas.width / 100) * 17, (canvas.height / 100) * 75, (canvas.width / 100) * 15, (canvas.height / 100) * 15);
    }
    homeimg.src = '../assets/teams/' + home.img;
    let awayimg = new Image();
    awayimg.onload = function () {
        ctx.drawImage(awayimg, 0, 0, awayimg.width, awayimg.height, canvas.width / 2 + (canvas.width / 100) * 2, (canvas.height / 100) * 75, (canvas.width / 100) * 15, (canvas.height / 100) * 15);
    }
    awayimg.src = '../assets/teams/' + away.img;

    var instaimg = document.querySelector('.insta-icon');
    ctx.drawImage(instaimg, 0, 0, instaimg.width, instaimg.height,
        (canvas.width / 100) * 5, (canvas.height / 100) * 85, (canvas.width / 100) * 3, (canvas.height / 100) * 3);

    ctx.font = "italic " + ((canvas.height / 100) * 2.5) + "px Proxima Nova Semibold";
    ctx.fillText(document.querySelector('.insta-textarea').value.toLowerCase(), (canvas.width / 100) * 17.8, (canvas.height / 100) * 87.5);

    var fbimg = document.querySelector('.fb-icon');
    ctx.drawImage(fbimg, 0, 0, fbimg.width, fbimg.height,
        (canvas.width / 100) * 5, (canvas.height / 100) * 90, (canvas.width / 100) * 3, (canvas.height / 100) * 3);

    ctx.fillText(document.querySelector('.fb-textarea').value.toLowerCase(), (canvas.width / 100) * 14.8, (canvas.height / 100) * 92.5);
}

function saveImage() {
    var newCanvas, newContext; //I'm making these
    var scaleFactor = 2; //How much we scale?

    console.log('save image');
    let screenShot = true;
    if (screenShot) {
        if (!newCanvas) {
            newCanvas = document.createElement('canvas');
            newContext = newCanvas.getContext('2d');
        }
        newCanvas.width = canvas.width * scaleFactor;
        newCanvas.height = canvas.height * scaleFactor;

        newContext = ctx;
        newContext.scale(scaleFactor, scaleFactor); //Now all your previous drawing will autoscale
    }

    /*   all your old draw code goes here, 
    change all your context calls to ctx */

    if (screenShot) {
        var link = document.createElement("a");
        link.download = name;
        link.href = dataURLtoBlob(canvas.toDataURL("image/png"));
        console.log(link.href);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}