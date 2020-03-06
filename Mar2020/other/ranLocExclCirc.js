
//trying to figure out myself how to create random points that exclude a circle in the center of the screen with a given radius

let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),

      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

      render()
      function render() {

        //   clearFullScreen()

        //   rotate_about_the_center()

          ranCircle()


        //   setTimeout(window.requestAnimationFrame, 10, render)
      }


    function clearFullScreen() {

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
        
    }

    function ranCircle() {

        context.save()

        context.translate(width/2, height/2)

        let loops = 10000, outside = 0;

        for (let i = 0; i < loops; i++) {

                let radius = 200;

                let randomX = (Math.cos(i) * radius),
                    randomY = (Math.sin(i) * radius),

                    x =  randomX / (Math.random()*1.01),
                    y =  randomY / (Math.random()*1.01);

                    // x =  randomX / (Math.random() * 2.001),
                    // y =  randomY / (Math.random() * 2.001);

                if (x > width / 2 || x < -width / 2 || y > height/2 || y < -height/2 ) {
                   outside++
                    
                }
            
                context.beginPath()

                context.moveTo(x,y)

                context.lineTo(x+1,y+1)

                context.strokeStyle = 'white'

                context.stroke()
                
        }

        console.log(`Outside ${(outside/loops)*100}%`);
        

        context.restore()

    }


    function rotate_about_the_center() {

        // context.save()

        context.translate(width/2, height/2)

        context.rotate(.01)

        context.translate(-width/2, -height/2)

        // context.restore()
    }