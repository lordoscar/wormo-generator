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
    document.querySelector('.scorer-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.insta-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.fb-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.hashtag-textarea').addEventListener("keyup", drawImage);
    document.querySelector('.home-team-select').addEventListener("change", drawImage);
    document.querySelector('.away-team-select').addEventListener("change", drawImage);
    document.querySelector('.home-team-goals').addEventListener("change", drawImage);
    document.querySelector('.away-team-goals').addEventListener("change", drawImage);


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

    ctx.font = ((canvas.height / 100) * 3) + "px Proxima Nova";
    ctx.textAlign = "center";
    ctx.fillText(document.querySelector('.division-textarea').value.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 8);

    ctx.font = "italic " + ((canvas.height / 100) * 8) + "px Proxima Nova Bold";
    ctx.fillText(document.querySelector('.title-textarea').value.toUpperCase(), canvas.width / 2, (canvas.height / 100) * 20);

    let homeimg = new Image();
    homeimg.onload = function () {
        ctx.drawImage(homeimg, 0, 0, homeimg.width, homeimg.height, canvas.width / 2 - (canvas.width / 100) * 37, (canvas.height / 100) * 33, (canvas.width / 100) * 15, (canvas.height / 100) * 15);
    }
    homeimg.src = '../assets/teams/' + home.img;
    let awayimg = new Image();
    awayimg.onload = function () {
        ctx.drawImage(awayimg, 0, 0, awayimg.width, awayimg.height, canvas.width / 2 + (canvas.width / 100) * 22, (canvas.height / 100) * 33, (canvas.width / 100) * 15, (canvas.height / 100) * 15);
    }
    awayimg.src = '../assets/teams/' + away.img;

    ctx.font = ((canvas.height / 100) * 18) + "px AvantGarde Demi";
    ctx.fillText(document.querySelector('.home-team-goals').value, canvas.width / 2 - (canvas.width / 100) * 29 , (canvas.height / 100) * 65);
    ctx.fillText(document.querySelector('.away-team-goals').value, canvas.width / 2 + (canvas.width / 100) * 29 , (canvas.height / 100) * 65);

    ctx.font = ((canvas.height / 100) * 3.5) + "px Proxima Nova Bold";
    ctx.fillText("MÅLSKYTTAR", canvas.width / 2, (canvas.height / 100) * 37);

    let scorers = document.querySelector('.scorer-textarea').value.split('\n');
    console.log(scorers.length);

    ctx.font = ((canvas.height / 100) * 3.5) + "px Proxima Nova";

    let row = 0;
    scorers.forEach(scorer => {
        ctx.fillText(scorer.toUpperCase(), canvas.width / 2, (canvas.height / 100) * (41 + 4 * row));
        row++;
    });

    var instaimg = document.querySelector('.insta-icon');
    ctx.drawImage(instaimg, 0, 0, instaimg.width, instaimg.height,
        (canvas.width / 100) * 5, (canvas.height / 100) * 85, (canvas.width / 100) * 3, (canvas.height / 100) * 3);

    ctx.font = "italic " + ((canvas.height / 100) * 2.5) + "px Proxima Nova Semibold";
    ctx.fillText(document.querySelector('.insta-textarea').value.toLowerCase(), (canvas.width / 100) * 17.8, (canvas.height / 100) * 87.5);

    var fbimg = document.querySelector('.fb-icon');
    ctx.drawImage(fbimg, 0, 0, fbimg.width, fbimg.height,
        (canvas.width / 100) * 5, (canvas.height / 100) * 90, (canvas.width / 100) * 3, (canvas.height / 100) * 3);

    ctx.fillText(document.querySelector('.fb-textarea').value.toLowerCase(), (canvas.width / 100) * 14.8, (canvas.height / 100) * 92.5);

    ctx.font = ((canvas.height / 100) * 5) + "px Mighty Brush";

    let textx = ctx.measureText(document.querySelector('.hashtag-textarea').value.replace("#","").toUpperCase());
    console.log('textx: ' + textx.width);
    ctx.font = ((canvas.height / 100) * 5) + "px Edo SZ";
    let hashtagx = ctx.measureText('#');
    console.log('hashtagx: ' + hashtagx.width);

    ctx.font = ((canvas.height / 100) * 5) + "px Mighty Brush";
    ctx.fillText('#', canvas.width / 2 - textx.width / 2 - 15, (canvas.height / 100) * 90);

    ctx.font = ((canvas.height / 100) * 5) + "px Edo SZ";
    ctx.fillText(document.querySelector('.hashtag-textarea').value.replace("#","").toUpperCase(), canvas.width / 2 + hashtagx.width / 2, (canvas.height / 100) * 90);
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

    download("poster.png", canvas.toDataURL());

    if (!screenShot) {
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

// must be called in a click handler or some other user action
var download = function(filename, dataUrl) {
    var element = document.createElement('a')

    var dataBlob = dataURLtoBlob(dataUrl)
    element.setAttribute('href', URL.createObjectURL(dataBlob))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    var clickHandler;
    element.addEventListener('click', clickHandler=function() {
        // ..and to wait a frame
        requestAnimationFrame(function() {
            URL.revokeObjectURL(element.href);
        })

        element.removeAttribute('href')
        element.removeEventListener('click', clickHandler)
    })

    document.body.removeChild(element)
}


// from Abhinav's answer at  https://stackoverflow.com/questions/37135417/download-canvas-as-png-in-fabric-js-giving-network-error/
var dataURLtoBlob = function(dataurl) {
    var parts = dataurl.split(','), mime = parts[0].match(/:(.*?);/)[1]
    if(parts[0].indexOf('base64') !== -1) {
        var bstr = atob(parts[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }

        return new Blob([u8arr], {type:mime})
    } else {
        var raw = decodeURIComponent(parts[1])
        return new Blob([raw], {type: mime})
    }
}