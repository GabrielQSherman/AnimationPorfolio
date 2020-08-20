// alert('\nControls:\n\nSpace To Pause\n\nA to toggle auto-rotation\n\nW to toggle visibilty of lines that pass through center point')

const pi = Math.PI; //shortcut because is gets used alot

let merkabahPoints = [];
//i like to create all my html elements in JS so this code can be run by simplying adding it in a script tag of an empty HTML file
let canvas = document.createElement('canvas');
    context = canvas.getContext('2d'),

    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,

    frames = 0, //keep count of how many render cycles have occured

    renderPaused = false,  //user can toggle animation
    autoRotate = true,    //roates z axis, can be toggle by user
    hideMidLines = true, //detirmins if lines through center are shown in render

    mosPos = {
        x: width/2,
        y: height/2,
    },
    
    point = { //obj to keep track of points when roating sphere
        x: 0,
        y: 0,
        z: 0
    };

    //set styling 

    document.body.style = 'cursor: none; margin: 0px;';

    canvas.style = `display: block; position: static; top: 0px; left: 0px; margin:auto`

    canvas.onmousemove = findObjectCoords;
    
    //event listener for user input
    document.addEventListener('keydown', (evn) => {

        if (evn.code == 'Space') {

            renderPaused = !renderPaused;
        
            if (!renderPaused) { 
                render()
            }
            
        } else if (evn.code == 'KeyA') {

            autoRotate = !autoRotate;
            
        } else if (evn.code == 'KeyW') {

            hideMidLines = !hideMidLines;
        }

    }, false)

    document.body.style.backgroundColor = 'black';

    document.body.appendChild(canvas);

    context.translate(width/2, height/2)

    context.fillStyle = 'white';
    context.strokeStyle = 'white';
   
   //ANIMATION CYCLE
     render()

      function render() {

        // console.log(frames);

        clearFullScreen() //clear the canvas of previous animation cycle
        calcPoints()
        createMerkabah() 

        //counts how many frames have occured
        frames++

        //user can toggle pausing of animation via 'spacebar'
        if (!renderPaused) {
            setTimeout(window.requestAnimationFrame, 0, render)
        }

      }

    //function used to map numbers from int into a radian range
    function mapNumber (number, min1, max1, min2, max2) {
        return ((number - min1) * (max2 - min2) / (max1 - min1) + min2);
    };

    function createMerkabah() {

        const points = [];

        // let count = 0;

        merkabahPoint.forEach(p => {
            // count++
            point = {
                x: p.x,
                y: p.y,
                z: p.z,
                c: p.c 
            }
            
            let xRotation = mosPos.x/111,
            yRotation = mosPos.y/111;
        
            //rotate the points to give the illusion of 3d
            rotateX(xRotation)
            rotateY(yRotation)
            rotateZ(pi/12)

            if (autoRotate) {
                rotateZ(frames/222)
                rotateX(frames/222)
                rotateY(frames/222)
            }

            points.push(point)

        });
        
        renderMerkabah(points)
        
    }
    
    function renderMerkabah (array) {

        array = array.sort( (a,b) => b.z-a.z);
        let maxZ = frames/5 < 120 ? frames/5 : 120;

        for (let i = 0; i < array.length; i++) {
            const p = array[i];
            array.forEach(e => {
                
                if (
                    !hideMidLines
                    ||
                    hideMidLines
                    && p.x != -e.x
                    && p.y != -e.y
                    && p.z != -e.z
                ) {
                    renderLine(p, e, maxZ)
                }
                
            });
        }
        for (let i = 0; i < array.length; i++) {
            const p = array[i];

            // renderPoint(p, maxZ)
        }

    }

    function calcPoints() {
        const size1 = frames/5 < 120 ? frames/5 : 120,
              size2 = frames/10 < 60 ? frames/10 : 60;

        merkabahPoint = [
            {x: size1, y: size1, z: size1,  c: 0},
            {x: size2, y: size1, z: -size1, c: 30},
            {x:-size1, y: size2, z: size1,  c: 60},
            {x: size1, y:-size1, z: size2,  c: 130},
 
            {x: -size1, y: -size1, z: -size1, c: 180},
            {x: -size2, y: -size1, z: size1,  c: 225},
            {x: size1,  y: -size2, z: -size1, c: 270},
            {x: -size1, y: size1,  z: -size2, c: 315},
        
            // {x: 0, y:0, z: 0, c: 123}, //centerpoint
        
        ]        

    }

    function renderPoint(o, mz) {

        let light = mapNumber(-o.z, -mz, mz, 10, 70);
        let alpha = mapNumber(-o.z, -mz, mz, .1, 1);

        context.fillStyle = `hsla(${o.c}, 100%, ${light }%, ${alpha})`

        let size = frames/100 < 6 ? frames/100 : 6;

        context.lineWidth = size/5

        context.beginPath()
        context.arc(o.x,o.y,size,0, pi*2)
        context.fill()
    
    }

    function renderLine(start, end, mz) {

        const segs = 44;//number of line segments that make up one line

        for (let i = 0; i < segs; i++) {

            startX = mapNumber(i/segs, 0, segs/i, start.x, end.x)
            startY = mapNumber(i/segs, 0, segs/i, start.y, end.y)
            endX = mapNumber((i+1)/segs, 0, segs/(i+1), start.x, end.x)
            endY = mapNumber((i+1)/segs, 0, segs/(i+1), start.y, end.y)

            const Z = (start.z + end.z)/2;
            const alpha = mapNumber(-Z, -mz, mz, .05, 1);

            const color = mapNumber(i, 0, segs, 0, 360)+frames*2;
            
            context.strokeStyle = `hsl(${color}, 100%, 50%, ${alpha})`

            context.beginPath()
            context.moveTo(startX, startY)
            context.lineTo(endX, endY)
            context.stroke()
            
        }
    }

    function rotateY(radians) {

        let y = point.y;
        point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateX(radians) {

        let x = point.x;
        point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
        point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
    }

    function rotateZ(radians) {

        let x = point.x;
        point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
        point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
    }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function findObjectCoords(mouseEvent) {

            let obj = canvas,
                obj_left = 0,
                obj_top = 0,
                xpos,
                ypos;

        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        if (mouseEvent)
        {
            xpos = mouseEvent.pageX;
            ypos = mouseEvent.pageY;
        }
        
        xpos -= obj_left;
        ypos -= obj_top;
        
        mosPos.x = xpos
        mosPos.y = ypos

    }

 