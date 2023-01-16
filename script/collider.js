//main function for collider objects
function Collider(x, y, w, h, a) {
    //converts degrees to radians
    var ang = (a * PI) / 180;
    console.log(ang);
    //stops it from moving and sets angle in radians
    properties = {
      isStatic: true,
      angle: ang,
    };
    //creates the body
    this.body = Bodies.rectangle(x, y, w, h, properties);
    //console.log(this.body);
    //stores width and height for rendering later on
    this.w = w;
    this.h = h;
    //adds the body to the active simulation
    Composite.add(engine.world, this.body);
  
    //function for displaying the bodies
    this.show = function () {
      //loads position and angle for collider objects and converts angle to deg
      var pos = this.body.position;
      var angle = this.body.angle; //(PI/180);
      //pushes the translate and rotate to an empty array [makes it so that i can "pop" it so that the translation and rotation reset to before]
      push();
      //translates the origin
      translate(pos.x, pos.y);
      //rotates the origin
      rotate(angle);
      //sets it to draw the rectangle from the center as thats how the physics engine solves it
      rectMode(CENTER);
      //removes the outline
      noStroke();
      //sets the fill to a grey scale colour, you can replace it with a colour by adding 2 more numbers and separating it by commas, 12,63,248.
      fill(170);
      //draws the rectangle according to the saved values
      rect(0, 0, this.w, this.h);
      pop();
    };
    //basic function to move the colliders if needed, e.g rescaling the window
    this.move = function (x2, y2, w2, h2) {
      var pos2 = Matter.Vector.create(x2, y2);
      Body.setPosition(this.body, pos2);

      // var currentWidth = this.body.bounds.max.x - this.body.bounds.min.x;
      // var currentHeight = this.body.bounds.max.y - this.body.bounds.min.y;
      // var widthScale = w2/currentWidth;
      // var heightScale = h2/currentHeight;
      // //console.log(this.body);
      // Body.scale(this.body, widthScale, heightScale);
      
    };
  }
  