//background color must be white

window.onload = function() {

    //INITIAL VARIABLE DECLERATIONS

	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        time = 0;
        
		width = canvas.width = window.innerWidth,       //width of the canvas
        height = canvas.height = window.innerHeight,   //height of the canvas
        size = 40,                                    //determins size of each square

        //logic is included to make sure columnLimit is an odd number, this will make sure each row starts will the opposite of how to previous row started
        columnLimit =  (Math.ceil(width/size) % 2 == 0) ? Math.ceil(width/size) + 1: Math.ceil(width/size),     //how many columns in the grid

        rowLimit = ((height/size) + 2),    //how many rows in the grid
        columnCycles = 0,                 //handles if too many columns of squares have been made on a row
        rowsCycles = 0,                  //handles if too many rows of squares have been made on the grid
        startWithWhite = true,          //switches from true to flase for each row to make sure the pattern is alike to a checker/chess board

        originx = 0, originy = 0,

        p1 = {x: originx, y: originy}, p2 = {x: size + originx, y: originy}, p3 = {x: size + originx, y: size + originy}, p4 = {x: originx, y: size + originy},
        squares = [];

        //ANIMATION CYCLE
        
        //work for 30%
        // columnLimit -= 290;
        // rowLimit -= 140;

        // works for 100%
        // columnLimit -= 82;
        // rowLimit -= 33;

        columnLimit = 101;
        rowLimit = 10;

        let angle = 0, angleSwitch = true;

        context.translate(0, height/2);
        
        animate()
        function animate() {
            time++
            clear()

            create_bg()

            create_grid()
            
            // context.scale(1.01,1.014);

            // size += .1

            set_origins()
            // context.translate(size*2,size)

            let angleLim = Math.PI/4, angleInc = .02;
            
            if (angle < Infinity && angleSwitch == true) {

                console.log('up', angle);
        
                angle += angleInc;
                
            } else if (angle >= angleLim) {
                console.log('toplim');
                
                angleSwitch = false;
                angle = angleLim - angleInc;

            } else if (angle > 0 && angleSwitch == false) {
                console.log('dwn');
                
                angle -= angleInc/2;

            } else if (angle <= 0 && angleSwitch == false) {
                console.log('btmlim');
                angle = .01;
                angleSwitch = true;
                
            }

            setTimeout(window.requestAnimationFrame, 10, (animate));
        }

        // FUNCTIONS

        function clear() { 
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.restore();
        }

        function set_origins() {
            p1 = {x: originx, y: originy};
            p2 = {x: size + originx, y: originy};
            p3 = {x: size + originx, y: size + originy};
            p4 = {x: originx, y: size + originy}
        }


        function create_square(p1,p2,p3,p4) {
            
            context.save()

            context.beginPath();
            context.translate((p1.x + p3.x)/2,(p1.y + p3.y)/2);
            context.rotate(angle)
            context.translate(-(p1.x + p3.x)/2,-(p1.y + p3.y)/2);

            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.lineTo(p3.x, p3.y);
            context.lineTo(p4.x, p4.y);
            context.lineTo(p1.x,p1.y);

            context.translate(-p3.x,-p3.y);

            // console.log((p1.x + p3.x)/2,(p1.y + p3.y)/2);
            
            
            
            

            if (startWithWhite) {

                context.fillStyle = 'white';
                // context.fillStyle = 'hsl(' + (time*7) + ', 100%, 60%)';

                context.fill();
                startWithWhite = false;
            } else {

                context.fillStyle = 'black';

                context.fill();
                startWithWhite = true;
            }

            

            context.restore()

        }

        function create_row(){
            

            while (columnCycles < columnLimit) {
                create_square(p1,p2,p3,p4);
                context.translate(size, 0);
                columnCycles++
            }

            columnCycles = 0
            
        }

        function create_grid() {

            context.save()

            while (rowsCycles < rowLimit) {
                context.save()
                create_row()
                context.restore()
                context.translate(0,size);
                rowsCycles++
            }
            rowsCycles = 0;


            context.restore()

        }

        function create_bg() {
            context.beginPath()
            context.rect(0,0, size*columnLimit, size*rowLimit);
            context.fillStyle = 'hsl(' + (time) + ', 100%, 70%)'
            context.fill()

        }

       


}

//a test to see if the context is in the right postion
// context.strokeStyle = 'white';
//             context.beginPath()
//             context.moveTo(0,0);
//             context.lineTo(width,height);
            
//             context.stroke()