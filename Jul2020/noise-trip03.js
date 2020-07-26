const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const Noise = toxi.math.noise.simplexNoise.noise;
let seed = 3333+Math.random()*100,
    time = 0,
    pauseAnimation = false;

document.body.style = `margin: 0`;
canvas.style = `display: block;
                position: static;
                top: 0px;
                left: 0px;
                cursor: none;
                margin: auto;
                background-color: black`;

document.body.appendChild(canvas);

context.translate(width/2, height/2);
context.strokeStyle = 'white';

const sin = Math.sin;
const cos = Math.cos;

//USER INPUT EVENT LISTENER
document.addEventListener('keydown', userInputEvent, false);

//USER INPUT LOGIC
function userInputEvent(input) {

    switch (input.code) {
        case 'Space':

            pauseAnimation = !pauseAnimation;

            if (!pauseAnimation) {
                render()
            }
            
            break;
    }
    
}

//ANIMAITON CYCLE

const renderImage = () => {

    context.save()
    for (let j = 0; j < 157; j++) {
    
        const 
            base = seed + j*2,
            yTransN = Noise(base/150+142,base/150+412)*(1+j/44);

        context.translate(0, yTransN);

        
        for (let i = 0; i < 51; i++) {

            if (i !== 0) {

                

                const p = i/51,
                      fc = Math.PI*2,
                      startA = mapNumber(i, 0, 100, 0, fc ),
                      endA = mapNumber(i+1, 0, 100, 0, fc ),
                      hue = (-p*360)+Math.abs(yTransN*88)+j*3+time/30;
                
                context.strokeStyle = `hsl(${hue}, 80%, ${110-(j*1.1/157)*100}%)`;
                context.beginPath()
                context.arc(yTransN, yTransN,j*2, startA, endA)
                context.stroke()

                context.rotate(Math.PI* (1+i))
            } else{
                context.rotate(Math.PI* (1+i))

            }
            
        }

    }

    context.restore()


}

const render = () => {
    seed-=3
    time++

    clearFullScreen()
    renderImage();

    // context.rotate(-.002)

    if (!pauseAnimation) {
        setTimeout(window.requestAnimationFrame, 0, render)
    }

}


const clearFullScreen = () => {

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    
}

const distance = (x1,x2,y1,y2) => {

    const subX = x1 - x2,
          subY = y1 - y2;

    return Math.sqrt( Math.pow(subX, 2) + Math.pow(subY, 2));
}

function mapNumber (number, min1, max1, min2, max2) {
    return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
};


render()