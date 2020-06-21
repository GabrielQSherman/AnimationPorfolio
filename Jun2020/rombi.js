
const Noise = toxi.math.noise.simplexNoise.noise;
let seed = Math.random();

// alert('CONTROLS\nPress R to toggle object rotation\nPress S to toggle frame screen clear\nPress O to ( Hide / Show ) circles\nPress P to ( Hide / Show ) lines\nPress Space to ( Pause / Play ) animation\nUse T & Y to cycle through the diffrent animation variariations')
//VARS FOR CANVAS AND TIMING EVENTS
let canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight,

      time = 0,

      timeMax = 777,

      timeForward = true,

      strokeW = 1,
      
      showArcs = false,

      autoRotate = false,

      showLines = true,

      clearScreen = true,
      
      pauseAnimation = false,

      tiltWindow = false,

      Meta = 4,
      
      colorIndex = 0,

      colorPairs = [['hotpink', 'lime'], ['lightsalmon', 'skyblue'], ['darkslategrey', 'lightgoldenrodyellow'], ['plum', 'yellow']];

context.strokeStyle = 'white';
context.fillStyle = 'white';

context.lineWidth = strokeW;

canvas.style = ` display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto`;

canvas.style = `display: block;
                // position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin:auto;
                background-color: black`;

document.body.style = `margin: 0`;

document.body.appendChild(canvas)

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {
        case 'KeyO':

            showArcs = !showArcs;
            
            break;
        case 'KeyP':

            showLines = !showLines;

            break;

        case 'KeyT':

            Meta = Meta > 0 ? Meta-1 : 7;
            console.log(Meta);         
            break;
        case 'KeyY':

            Meta = Meta < 11 ? Meta+1 : 0;
            console.log(Meta);         
            break;
    
        case 'KeyR':

            autoRotate = !autoRotate;

            break;
        case 'KeyS':

            clearScreen = !clearScreen;
    
            break;
        case 'KeyE':

            tiltWindow = !tiltWindow;

            console.log(tiltWindow);
            
    
            break;
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;
    
    }

    
    
}

//SET THE CANVAS ORIGIN TO THE MIDDLE OF THE WINDOW
      context.translate(width/2, height/2)

//ANIMAITON CYCLE

        render()

        function render() {

        if (timeForward && time < timeMax) {
            time+=.37
            // console.log('time++', time);
        } else if (timeForward && time >= timeMax) {

            setTimeout(()=>{timeForward = false;}, 100)

        } else if (!timeForward && time > 1) {
            time-=.3
        } else if ( time <= 1){

            timeForward = true;
            time = 1.1
            seed = Math.random()
        }

        if(clearScreen) clearFullScreen()

        createImg(time)

        if (!pauseAnimation) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

function createImg(s) { 

    

    let mNoise = Noise(s/300+seed,s/300+seed)*10,
        light = mapNumber(time, 0, timeMax, 0, 100);

    context.lineWidth = 1.5;
    context.strokeStyle = `hsl(0, 0%, ${light}%)`

    // s = 130
    // time = 150
    // console.log(Meta);
    
    context.save()

    if (tiltWindow) context.rotate(Math.PI/2);

    switch (Meta) {
        case 0:
            createRombi({size: s, angle: mNoise/3})
            createRombi({size: s, angle: -mNoise/3})

            break;
        case 1:
            createRombi({size: s, angle: -mNoise/2})
            createRombi({size: s, angle: mNoise/2})
            createRombi({size: s, angle: mNoise/2+Math.PI/2})
            createRombi({size: s, angle: -mNoise/2+Math.PI/2})        
            
            break;
        case 2:
            mNoise/=2;
            seven_meta_cubes(s, mNoise)
            seven_meta_cubes(s, mNoise+Math.PI)
            seven_meta_cubes(s, -mNoise)
            seven_meta_cubes(s, -mNoise+Math.PI)
            
            break;
        case 3:
            mNoise/=2;
            seven_meta_cubes(s, mNoise)
            seven_meta_cubes(s, mNoise+Math.PI/3)
            seven_meta_cubes(s, mNoise-Math.PI/3)
            seven_meta_cubes(s, -mNoise)
            seven_meta_cubes(s, -mNoise+Math.PI/3)
            seven_meta_cubes(s, -mNoise-Math.PI/3)
            break;
        case 4:
            const maxSize = time/5+10 < height ? time/5+10 : height;
            context.rotate(mNoise/4)
            for (let i = 2; i <maxSize; i*= (1.2)* (1+Math.abs(mNoise/50))) {
                const light = maxSize-i,
                    size = (i*10);
                    
                createRombi({size: size, light: light})
            }
            break;
        case 5:
            const mNoise2 = Noise(s/170+seed,s/170+seed)*17
            let count = 0, intDiv = 1/(time/100) > 1.4 * (1+mNoise2/100)? 1/(time/100) :1.4 * (1+mNoise2/100);
            for (let i = 100; i > 1 && count < 1000 ; i/= intDiv) {
                count++
                let light = i*3;
                context.lineWidth = i/10 < 2 ? i/10 : 2;
                createRombi({size: (s/(1+i/7)+3)*3, light: light})
            }
            break;
        case 6:
            for (let i = 1+s/1000; i < width; i*=1.27*(1+s/500)) {
                let light = 50-i/200; 
                context.save()
                context.rotate(Math.PI/2)
                createRombi({size: i, light: light})
                context.restore()
            }
            break;
        case 7:
            for (let i = 1; i < 777; i*=1+(.7+time/300)) {
                context.save()
                context.rotate(Math.PI*(i/777))
                createRombi({size: (s/(1+i/7)+3)*3*1.07})
                context.restore()
            }
            break;
        case 8:
        context.save()
            context.rotate(Math.PI/2)
            context.lineWidth = .8;
            const divd = time/17;
            for (let z = 0; z < divd; z++) {
                context.rotate(Math.PI/divd)
                for (let i = 1; i < 1000+time/1; i*=1+(.2+time/2222)) {
                    context.strokeStyle = 'white'//`hsl(0,0%,${z+i})`
                    context.save()
                    context.rotate(Math.PI*(i/12222)*(1+time/100))
                    createRombi({size: (s/(1+i/70)+3)*3*1.07})
                    context.restore()
                }
            }    
            context.beginPath()
            context.arc(0,0,1,0,7)
            context.stroke()
        context.restore()
            break;
        case 9:

            for (let i = 1; i < 1000+time/1; i*=1+(.7+time/2222)) {
                context.save()
                context.rotate(Math.PI*(i/12222)*(1+time/100))
                createRombi({size: (s/(1+i/70)+3)*3*1.07})
                context.restore()
            }
            
            break;
    
        default:
            break;
    }

    context.restore()

    if (autoRotate) {
        
        context.rotate(.01)
        
    }

}

function seven_meta_cubes(s, a) {

    let m = 6.93;

    a/=2;

    context.save()

        context.translate(-s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        context.translate(s*m/4*1.07, 0)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(-s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

    context.save()

        context.translate(s*m/8*1.0714, -s*m*Math.sqrt(3)/8*1.2)
        createRombi({size: s, angle: a})
        context.translate(0, s*3*1.2)
        createRombi({size: s, angle: a})
        
    context.restore()

}

function createRombi(rombiObj) {
    const {size, angle, light} = rombiObj;
    context.save()
    if (light) {
        context.strokeStyle = `hsl(0,0%,${light}%)`;
    }
    if (angle) context.rotate(angle);
        context.beginPath()
        context.arc(0,0,size,0,Math.PI*2)
    if (showArcs) {
        context.stroke()
    }
    if (showLines) {
        context.save()
            context.beginPath()
            context.moveTo(size/2,0);
            context.lineTo(0,-size)
            context.lineTo(-size/2,0)
            context.lineTo(0,size)
            context.lineTo(size/2,0)
                context.stroke()
        context.restore()
    }
    context.restore()
}


function clearFullScreen() {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};