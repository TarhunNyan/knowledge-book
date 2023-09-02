const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 1000;
canvas.width = 1000;
let result = [];

let shiftx = 0, shifty = 0, scale = 1, rotate = 0;

const img = new Image();
img.onload = drawImage;

img.src = './02-Image.png';

function drawImage() {
    const w = canvas.width;
    const h = canvas.height;
    const widthNormalize = w / img.width;
    const heightNormalize = h / img.height;
    result.push((
        i = img,
        imgx = 0, imgy = 0, imgx2 = img.width, imgy2 = img.height,
        cvsx = w / 2 - img.width / 4 * widthNormalize, cvsy = h / 2 - img.height / 4 * heightNormalize,
        cvsx2 = img.width / 2 * widthNormalize, cvsy2 = img.height / 2 * heightNormalize
    ) => {
        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(shiftx, shifty);
        ctx.rotate(rotate);
        ctx.drawImage(i, imgx, imgy, imgx2, imgy2, cvsx, cvsy, cvsx2, cvsy2);
        ctx.restore();
    }
    );
}
function drawGrid(x, y, x2, y2, isMain = true) {
    ctx.strokeStyle = isMain ? '#33d4FF' : '#adadad';
    ctx.lineCup = "round";

    let lineWidth = 1

    lineWidth = (x2 - x) / 100;
    lineWidth = lineWidth < 1 ? 1 : lineWidth;
    ctx.lineWidth = lineWidth;

    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo((x2 - x) / 3 * i + x, y);
        ctx.lineTo((x2 - x) / 3 * i + x, y2);
        ctx.stroke();
        ctx.closePath();
    }

    lineWidth = (y2 - y) / 100;
    lineWidth = lineWidth < 1 ? 1 : lineWidth;
    ctx.lineWidth = lineWidth;

    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x, (y2 - y) / 3 * i + y);
        ctx.lineTo(x2, (y2 - y) / 3 * i + y);
        ctx.stroke();
        ctx.closePath();
    }
}

function makeCommand(cmd) {
    isShow = true;
    let x = 0, x2 = canvas.width;
    let y = 0, y2 = canvas.height;
    const dictConvert = {
        "u": [0, 0], "i": [1, 0], "o": [2, 0], "j": [0, 1], "k": [1, 1], "l": [2, 1], "m": [0, 2], ",": [1, 2], ".": [2, 2]
    };
    if (cmd[0] === 'm' || cmd[0] === 's') {
        for (let i = 0; i < cmd.length; i++) {
            console.log(cmd[i]);
            if (cmd[i] === 'm' || cmd[i] === 's') {
                const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
                result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
            } else if (cmd[i] === 'h') {
                isShow = !isShow;
            } else {
                const block = dictConvert[cmd[i].toLowerCase()];
                const sizeX = (x2 - x) / 3;
                const sizeY = (y2 - y) / 3;

                x2 = sizeX * (block[0] + 1) + sizeX / 4 + x;
                y2 = sizeY * (block[1] + 1) + sizeY / 4 + y;

                x = sizeX * block[0] - sizeX / 4 + x;
                y = sizeY * block[1] - sizeY / 4 + y;

                const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
                result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
            }
        }
        if (isShow === false) {
            result = result.slice(0, 1);
        }
    }
}

function finishCommand(cmd) {
    let x = 0, x2 = canvas.width;
    let y = 0, y2 = canvas.height;
    const dictConvert = {
        "u": [0, 0], "i": [1, 0], "o": [2, 0], "j": [0, 1], "k": [1, 1], "l": [2, 1], "m": [0, 2], ",": [1, 2], ".": [2, 2]
    };
    if (cmd[0] === 'm' || cmd[0] === 's') {
        for (let i = 0; i < cmd.length; i++) {
            if (cmd[i] === 'm' || cmd[i] === 's') {
                const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
                result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
            } else {
                const block = dictConvert[cmd[i].toLowerCase()];
                const sizeX = (x2 - x) / 3;
                const sizeY = (y2 - y) / 3;

                x2 = sizeX * (block[0] + 1) + sizeX / 4 + x;
                y2 = sizeY * (block[1] + 1) + sizeY / 4 + y;

                x = sizeX * block[0] - sizeX / 4 + x;
                y = sizeY * block[1] - sizeY / 4 + y;
            }
        }
    }

    if (cmd === "mm") {
        shiftx = 0;
        shifty = 0;
        return;
    }

    if (cmd === "ss") {
        shiftx += canvas.width / 2
        shifty += canvas.height / 2

        scale = 1;
        return;
    }

    if (cmd[0] === 'm') {
        shiftx -= (x2 + x) / 2 - (canvas.width / 2);
        shifty -= (y2 + y) / 2 - (canvas.height / 2);
    }

    if (cmd[0] === 's') {
        shiftx -= x / scale;
        shifty -= y / scale;
        scale = (canvas.width * scale) / (x2 - x);
    }
}

// function makeCommand(cmd) {
//     isShow = true;
//     let x = 0, x2 = canvas.width;
//     let y = 0, y2 = canvas.height;
//     const dictConvert = {
//         "i": [0, 0], "o": [1, 0], "p": [2, 0], "k": [0, 1], "l": [1, 1], ";": [2, 1], ",": [0, 2], ".": [1, 2], "/": [2, 2]
//     };
//     if (cmd[0] === 'm' || cmd[0] === 's') {
//         for (let i = 0; i < cmd.length; i++) {
//             console.log(cmd[i]);
//             if (cmd[i] === 'm' || cmd[i] === 's') {
//                 const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
//                 result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
//             } else if (cmd[i] === 'h') {
//                 isShow = !isShow;
//             } else {
//                 const block = dictConvert[cmd[i].toLowerCase()];
//                 const sizeX = (x2 - x) / 3;
//                 const sizeY = (y2 - y) / 3;

//                 x2 = sizeX * (block[0] + 1) + x;
//                 y2 = sizeY * (block[1] + 1) + y;

//                 x = sizeX * block[0] + x;
//                 y = sizeY * block[1] + y;

//                 const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
//                 result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
//             }
//         }
//         if (isShow === false) {
//             result = result.slice(0, 1);
//         }
//     }
// }

// function finishCommand(cmd) {
//     let x = 0, x2 = canvas.width;
//     let y = 0, y2 = canvas.height;
//     const dictConvert = {
//         "i": [0, 0], "o": [1, 0], "p": [2, 0], "k": [0, 1], "l": [1, 1], ";": [2, 1], ",": [0, 2], ".": [1, 2], "/": [2, 2]
//     };
//     if (cmd[0] === 'm' || cmd[0] === 's') {
//         for (let i = 0; i < cmd.length; i++) {
//             if (cmd[i] === 'm' || cmd[i] === 's') {
//                 const fx = x, fy = y, fx2 = x2, fy2 = y2, fisMain = i === cmd.length - 1;
//                 result.push(() => drawGrid(fx, fy, fx2, fy2, fisMain));
//             } else {
//                 const block = dictConvert[cmd[i].toLowerCase()];
//                 const sizeX = (x2 - x) / 3;
//                 const sizeY = (y2 - y) / 3;

//                 x2 = sizeX * (block[0] + 1) + x;
//                 y2 = sizeY * (block[1] + 1) + y;

//                 x = sizeX * block[0] + x;
//                 y = sizeY * block[1] + y;
//             }
//         }
//     }

//     if (cmd[0] === 'm') {
//         shiftx -= (x2 + x) / 2 - (canvas.width / 2);
//         shifty -= (y2 + y) / 2 - (canvas.height / 2);
//     }

//     if (cmd[0] === 's') {
//         shiftx -= x / scale;
//         shifty -= y / scale;
//         scale = (canvas.width * scale) / (x2 - x);
//     }
// }

function drawAll(cmd) {
    result = [];
    ctx.clearRect(0, 0, 1000, 1000);
    drawImage();
    makeCommand(cmd);
    console.log(result);
    for (let f of result) {
        f();
    }
}
