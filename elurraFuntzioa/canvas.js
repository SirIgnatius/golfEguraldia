 /*
		ELUR PARTIKULAK SORTZEKO KODIGOA
    */
    window.onload = function() {

         var canvas = document.createElement("canvas");
         var context = canvas.getContext("2d");
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         document.body.appendChild(canvas);

         var posX = 0,
             posY = 0;

         // particles objektua
         var particles = {},
             particleIndex = 0,
             settings = {
               density: 20,
               startingX: canvas.width,
               startingY: -50,
               gravity: 0.01
             };

         // partikulak sortzeko funtzioa
         function Particle() {
           this.x = settings.startingX * Math.random();
           this.y = settings.startingY;
           this.vy = Math.random() * 3;

         // index-ean partikula berri bat sortu
           particleIndex ++;
           particles[particleIndex] = this;
           this.id = particleIndex;
           this.life = 0;
           this.maxLife = 700;
         }

         Particle.prototype.draw = function() {
           this.y += this.vy;

           this.vy += settings.gravity;

           this.life++;

           // partikula zaharregia bada, ezabatu
           if (this.life >= this.maxLife) {
             delete particles[this.id];
           }

           // elur partikula
           context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);

           context.beginPath();
           context.fillStyle = "#cef1ff";
           context.arc(this.x, this.y, 3, 0, 2*Math.PI);
           context.closePath();
           context.fill();
         }

         setInterval(function() {
           context.fillStyle = "rgba(10,10,10,0.8)";
           context.fillRect(0, 0, canvas.width, canvas.height);

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
