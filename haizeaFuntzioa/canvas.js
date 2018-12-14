 /*
		HAIZEA SORTZEKO KODIGOA
    */
    window.onload = function() {

         var canvas = document.createElement("canvas");
         var context = canvas.getContext("2d");
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         document.body.appendChild(canvas);

         var posX = 0,
             posY = 300,
             vx = 5;
             ballPosX = canvas.width/2,
             ballPosY = canvas.height/7;

         // particles objektua
         var particles = {},
             particleIndex = 0,
             settings = {
               density: 2,
               startingX: canvas.width,
               startingY: canvas.height,
               gravity: 0.5
             };

         // partikulak sortzeko funtzioa
         function Particle() {
           this.x = settings.startingX;
           this.y = settings.startingY * Math.random();
           this.vy = 2;
           this.vx = Math.random() * 5;

         // index-ean partikula berri bat sortu
           particleIndex ++;
           particles[particleIndex] = this;
           this.id = particleIndex;
           this.life = 0;
           this.maxLife = 200;
         }

         Particle.prototype.draw = function() {
           this.y += this.vy;
           this.x += -this.vx;

           this.vx += settings.gravity;

           this.life++;

           // partikula zaharregia bada, ezabatu
           if (this.life >= this.maxLife) {
             delete particles[this.id];
           }

           // haize partikula
           context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);

           context.beginPath();
           context.fillStyle = "#6dc3c4";
           context.fillRect(this.x, this.y, 40, 2);
           context.closePath();
           context.fill();
         }

         function drawBola() {

           context.beginPath();
           context.arc(ballPosX, ballPosY, 20, 0, Math.PI * 2, false);
           context.fillStyle = "green";
           context.fill();
         }

         setInterval(function() {

           var haizeaDago = 1;

           context.clearRect(0, 0, canvas.width, canvas.height);

           drawBola();
           if ((haizeaDago == 1) && (vx >= 0)) {
             vx -= 0.07;
             ballPosX -= vx;
           }

           // marraztu partikulak
           for (var i = 0; i < settings.density; i++) {
             if (Math.random() > 0.98) {
               new Particle();
             }
           }

           for (var i in particles) {
             particles[i].draw();
           }
         }, 30);
       };
