 /*
		EURI PARTIKULAK SORTZEKO KODIGOA
    */
    window.onload = function() {

         var canvas = document.createElement("canvas");
         var context = canvas.getContext("2d");
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         document.body.appendChild(canvas);

         var posX = 0,
             posY = 0,
             ballPosX = canvas.width/7,
             ballPosY = canvas.height/2;

         // particles objektua
         var particles = {},
             particleIndex = 0,
             settings = {
               density: 50,
               startingX: canvas.width,
               startingY: -10,
               gravity: 2.5
             };

         // partikulak sortzeko funtzioa
         function Particle() {
           this.x = settings.startingX * Math.random();
           this.y = settings.startingY;
           this.vy = Math.random() * 10;

           // index-ean partikula berri bat sortu
           particleIndex ++;
           particles[particleIndex] = this;
           this.id = particleIndex;
           this.life = 0;
           this.maxLife = 100;
         }

         Particle.prototype.draw = function() {
           this.y += this.vy;

           this.vy += settings.gravity;

           this.life++;

           // partikula zaharregia bada, ezabatu
           if (this.life >= this.maxLife) {
             delete particles[this.id];
           }

           // euri partikula
           context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);

           context.beginPath();
           context.fillStyle = "#6dc3c4";
           context.fillRect(this.x, this.y, 2, 20);
           context.closePath();
           context.fill();

           if(pythagoras(this.x, this.y, ballPosX, ballPosY) < 20) {
             delete particles[this.id];

               var posX = ballPosX,
                   posY = ballPosY-40;

               var vx = (-10) * random(),
                   vy = -10,
                   gravity = 1;

               // euri tantak
               setInterval(function() {

                 posX += vx;
                 posY += vy;
                 vy += gravity;

                 context.beginPath();
                 context.fillStyle = "#6dc3c4";

                 context.arc(posX, posY, 2, 0, Math.PI*2, true);
                 context.closePath();
                 context.fill();

               }, 30);
           }
         }

         function random() {
           var i = Math.round(Math.random());

           if (i == 0) {
             i = -1;
           } else i = 1;

           return i;
         }

         function pythagoras(x1, y1, x2, y2) {

           let xDistance = x2 - x1;
           let yDistance = y2 - y1;

           return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance, 2));

         }

         function drawBola() {
           context.beginPath();
           context.arc(ballPosX, ballPosY, 20, 0, Math.PI * 2, false);
           context.fillStyle = "green";
           context.fill();

         }

         setInterval(function() {
           context.clearRect(0, 0, canvas.width, canvas.height);

           drawBola();
           ballPosX += 1;

           // marraztu partikulak
           for (var i = 0; i < settings.density; i++) {
             if (Math.random() > 0.97) {
               new Particle();
             }
           }

           for (var i in particles) {
             particles[i].draw();
           }
         }, 30);

       };
