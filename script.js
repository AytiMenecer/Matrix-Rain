let root = {
    wavecolor: {
        r: 125,
        g: 52,
        b: 253,
    },
    rainbowSpeed: 0.5,
    rainbow: true,
    matrixspeed: 40,
};

let c = document.getElementById("c");
let ctx = c.getContext("2d");

let hueFw = false;
let hue = -0.01;

c.height = window.innerHeight;
c.width = window.innerWidth;

let konkani =
    "QWERTYUIOPASDFGHJKLZCVBNM゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789";

let characters = konkani.split("");
let font_size = 14;
let columns = c.width / font_size;
let gradient = ctx.createLinearGradient(0, 10, 0, 200);
let drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = font_size + "px arial";

    for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = "rgba(10,10,10, 1)";
        ctx.fillStyle = "RGB (3, 160, 98)";
        ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
        let text = characters[Math.floor(Math.random() * characters.length)];

        if (root.rainbow) {
            hue += hueFw ? 0.01 : -0.01;
            let rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
            let rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
            let rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
            ctx.fillStyle = "#36ba01";
        } else {
            ctx.fillStyle =
                "rgba(" +
                root.wavecolor.r +
                "," +
                root.wavecolor.g +
                "," +
                root.wavecolor.b +
                ")";
        }

        ctx.fillText(text, i * font_size, drops[i] * font_size);
        drops[i]++;
        if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
    }
}

window.onresize = () => {
    location.reload();
};

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
    switch (name) {
        case "matrixColor":
            root.wavecolor = hexToRgb(val);
            break;
        case "rainBow":
            root.rainbow = val;
            break;
        case "rainbowSpeed":
            root.rainbowSpeed = val / 100;
            break;
    }
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } :
        null;
}