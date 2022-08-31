//base function for loading pinballs
function Pinball(x, y, r, imag) {
    //properties to define stuff
    properties = {
      friction: 0.2,
      //bounciness
      restitution: 0.33,
    };
    //creates the base circle
    this.body = Bodies.circle(x, y, r, properties);
    //saves the radius
    this.body.r = r;
    if (!imag) {
      this.c = random(imgs);
    } else {
      this.c = imag;
    }
    //saves a random image
    
    //adds the body to the simulation
    Composite.add(engine.world, this.body);

    //basic function to show the pinball
    this.show = function () {
      //loads the position and angle
      var pos = this.body.position;
      var angle = this.body.angle;
      //same as collider
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      //circle(0, 0, this.body.r*2);
      //draws the allocated pinball in the center of the circle and scales the image to that of the circle
      if (!this.body.ray) {
        tint(50, 50, 50);
      } else {
        tint(255);
      }
      image(this.c, -this.body.r, -this.body.r, 2 * this.body.r, 2 * this.body.r);
      //console.log(this.body);
      pop();
    };
    
    //function to remove bodys from the active simulation for if there are too many pinballs
    this.remove = function () {
      Composite.remove(engine.world, this.body);
    };
    //function to move pinballs, used for if they go offscreen
    this.move = function (x2, y2) {
      var pos2 = Matter.Vector.create(x2, y2);
      Body.setPosition(this.body, pos2);
    };

    this.checkPos = function() {
      var pos = this.body.position;
      if (pos.x > windowWidth*2 || pos.x < -windowWidth*2 || pos.y > windowHeight*2 || pos.y < -windowHeight*2) {
        var vel = Matter.Vector.create(this.body.velocity.x*0.1, this.body.velocity.y*0.1);
        Body.setVelocity(this.body, vel);
        this.move(random(0, windowWidth), random(50, windowHeight / 3));
      }
    }

    this.cycle = function() {
      var pos = this.body.position;
      var radius = this.body.r;
      var imag = this.c;
      this.remove();
      return new Pinball(pos.x, pos.y, radius, imag);
    }
  }
  