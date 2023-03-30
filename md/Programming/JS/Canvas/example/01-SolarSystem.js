  
function background(ctx, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
}

function setPosition(ctx, planet, time) {
    ctx.save();
    if( planet.parent === undefined ) {
        const posX = planet.posX===undefined ? 0 : planet.posX;
        const posY = planet.posY===undefined ? 0 : planet.posY;
        ctx.translate(posX, posY);
    }
    if( planet.startOrbit!=undefined ) {
        const startOrbit = planet.startOrbit;
        ctx.rotate( startOrbit );
    }
    if( planet.orbitFrequency!=undefined ) {
        const rotation = planet.orbitFrequency * time * 2 * Math.PI;
        ctx.rotate( rotation );
    }
    {
        const orbitRadius = planet.orbitRadius===undefined ? 0 : planet.orbitRadius;
        ctx.translate( 0, orbitRadius );
    }
}

function setColor(ctx, color) {
    color = color===undefined ? "red" : color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

function drawPlanet(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI*2);
    ctx.fill();
}

function drawOrbit(ctx, isVisible, radius) {
    if(!isVisible) { return; }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI*2);
    ctx.stroke();
}

function draw(options, planetsOptions) {
    background(options.ctx, options.canvas.w, options.canvas.h);    
    const time = options.animation.getTime();
    const order = planetsOptions.order;
    const planets = planetsOptions.planets;
    let planetsHistory = [];

    order.forEach(planetName => {
        const planet = planets[planetName];
        while( planetsHistory[planetsHistory.length - 1] != planet.parent && planetsHistory.length > 0 ) {
            planetsHistory.pop();
            ctx.restore();
        }
        
        setColor( ctx, planet.color );
        drawOrbit( ctx, planet.isOrbitVisible, planet.orbitRadius );
        setPosition( ctx, planet, time );
        drawPlanet( ctx, planet.radius );
        planetsHistory.push( planetName );
    });

    while( planetsHistory.length > 0 ) {
        planetsHistory.pop();
        ctx.restore();
    }

    window.requestAnimationFrame(drawCallback)
}


var canvas = document.getElementById("canvas-solar-system");
var ctx = canvas.getContext("2d");

canvas.height = canvas.width;


options = {
    ctx: ctx,
    canvas: {
        w: canvas.width,
        h: canvas.height,
    },
    animation: {
        startTime: new Date(),
        getTime: function() {
            return ((new Date()) - this.startTime) / 1000;
        }
    },
    
    planetsOptions: {
        getOrder: function() {
            let result = [];
            const names = Object.keys( this.planets );
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                const parentName = this.planets[name].parent;
                if(parentName === undefined) {
                    result.unshift(name);
                    continue;
                }

                const index = result.indexOf(parentName);
                if( index != -1 ) {
                    result.splice( index + 1, 0, name );
                    continue;
                }
                if( index===-1 ) {
                    names.push(name);
                }
                if( names[i-2]===names[i-1] ) {
                    console.error(`Parent("${parentName}") of planet("${name}") is not exist`)
                    break;
                }
            }
            return result;
        },
        order: undefined,
        planets: {
            "Sun": {
                parent: undefined,
                color: "yellow",
                radius: 50,
                orbitFrequency: 1 / 120,
                posX: canvas.width/2,
                posY: canvas.height/2,
            },
            "Moon": {
                parent: "Earth",
                color: "white",
                radius: 5,
                orbitRadius: 20,
                orbitFrequency: 1 / 2,
            },
            "Earth": {
                parent: "Sun",
                color: "blue",
                radius: 10,
                orbitRadius: 100,
                orbitFrequency: 1 / 10,
                startOrbit: 0.5,
                isOrbitVisible: true,
            }
        }
    }
};

options.planetsOptions.order = options.planetsOptions.getOrder();

function drawCallback() { draw( options, options.planetsOptions ); }

window.requestAnimationFrame(drawCallback);
