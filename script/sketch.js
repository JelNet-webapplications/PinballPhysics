Matter.use('matter-attractors');


//assigns module aliases to make referencing easier
var Engine = Matter.Engine,
  //Render = Matter.Render,
  //Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Query = Matter.Query;
  Events = Matter.Events;
//creates an empty engine variable to later assign the active engine to
var engine;
//creates the array to store the pinball bodies and a counter to store the ammount(not really necasary, just makes 2 lines neater)
var pinballs = [];
var prevAdded = 0;
var wasAdded = 0;
//array for colliders
var colliders = [];
//array and temp single for ray cast stuff
var rayCount;
// let rayc;
let particle;
var rayOutput;

//variable for mouse thingy stuff
var mConstraint;
var canvasMouse;
var attractor1;
//image array
var imgs = [];

var magnet;
var magnetStr;
var magnetStrength;
var gravity;
var gravityVal;
var gravityValue;







//main onLoad() function
function setup() {
  //designates the canvas that is drawn to
  var canvas = createCanvas(windowWidth, windowHeight - 123);
  //creates the engine
  engine = Engine.create();

  //pinballs.push(new Pinball(200, 200, 25));
  //adds the colliders to the walls
    //base
  colliders.push(new Collider(0, windowHeight - 123, 5000, 40, 0));
    //left
  colliders.push(new Collider(0, windowHeight, 5000, 40, 90));
    //right
  colliders.push(new Collider(windowWidth, windowHeight, 5000, 40, 90));
    //top
  colliders.push(new Collider(windowWidth, -windowHeight*2, 5000, 40, 0));

  //adds mouse constraints so you can pick up pinballs
  canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  var mConstraintOptions = {
    mouse: canvasMouse
  } ;

  mConstraint = MouseConstraint.create(engine, mConstraintOptions);
  Composite.add(engine.world, mConstraint);

  //loads the images to the array
  imgs.push(loadImage("pinball-textures/brown-32x.png"));
  imgs.push(loadImage("pinball-textures/orange-32x.png"));
  imgs.push(loadImage("pinball-textures/green-32x.png"));
  imgs.push(loadImage("pinball-textures/pink-32x.png"));
  imgs.push(loadImage("pinball-textures/red-32x.png"));
  imgs.push(loadImage("pinball-textures/yellow-32x.png"));

  //loads the button into memory to know when its clicked
  var EurosButton = select("#submitEuros");
  EurosButton.mousePressed(UpdatePinballs);
  //loads the count into memory
  euros = select("#euros");




  //ray trace stuff
  rayCount = select('#rays');
  rayOutput = select('#rayOut');
  rayOutput.innerHTML = rayCount.value;
  rayCount.input(sliderCount);
  console.log(rayCount, rayOutput);
  // rayc = new Ray(windowWidth/2, windowHeight/2, 1.5);
  particle = new Particle(rayCount.elt.value);
  //particle = new Particle(180);


  //attractor stuff
  attractor1 = new Attractor(windowWidth/2, windowHeight/2);

  magnet = select("#magnet");
  var magnetButton = select("#submitMagnet");
  magnetStr = select('#magStrength');
  magnetButton.mousePressed(UpdateMagnet);
  UpdateMagnet();
  
  //console.log(magnet);
  gravity = select('#gravity');
  var gravityButton = select("#submitGravity");
  gravityVal = select('#gravityVal');
  gravityButton.mousePressed(UpdateGravity);
  UpdateGravity();
  



}


// function mouseDragged() {
//   pinballs.push(new Pinball(mouseX, mouseY, 5));
// }
//main function for adding and removing pinballs
function UpdatePinballs() {
  //new count that it needs to reach
  newCount = euros.value()*20;

  // the count it is currently at
  currentCount = pinballs.length;

  // if(newCount - currentCount == prevAdded) {
  //   newCount += prevAdded;
  //   //update input to show what it actually is
  //   //document.getElementById("euros").value = newCount/20;
  // }
  // else if(newCount == currentCount) {

  //   prevAdded == currentCount;
  //   newCount += currentCount;

  //   //console.log(document.getElementById("euros").value)
  //   //document.getElementById("euros").value = newCount/20;
  //   currentCount = newCount;

  // }
  // else if(newCount != currentCount) {
  //   prevAdded = newCount - currentCount;


  // }

  if(newCount != wasAdded) {
    //this means that it is a new manually entered value

    prevAdded = newCount;
    wasAdded = newCount;
  }
  else if(newCount == wasAdded) {
    //this means that the box is the same meaning a possible second button click
    
    newCount += prevAdded;
    wasAdded = newCount;
    document.getElementById("euros").value = newCount/20;
  }
  else if(newCount - prevAdded == wasAdded) {
    //this means that it has increased by prevAdded from what was added
    newCount + prevAdded;
    wasAdded = newCount;
    document.getElementById("euros").value = newCount/20;
  }







  //check to see if new count is too much
  if (newCount > 5000) {
    newCount = 5000;
  }
  //code to see if it needs to add or remove pinballs
  if (newCount < currentCount) {
    //old code for removing pinballs
    //     for (var n = 0; n < currentCount - newCount; n++) {
    //       console.log(n)
    //       pinballs[pinballs.length-1].remove()
    //       pinballs.pop()

    //       console.log("before:", currentCount);
    //       currentCount -= 1;
    //       console.log("now: ", currentCount);
    //     }
    //new code for removing pinballs
    while (pinballs.length > newCount) {
      pinballs[pinballs.length - 1].remove();
      pinballs.pop();
    }
  } else if (newCount > currentCount) {
    //code for adding pinballs
    while (newCount > currentCount) {
      pinballs.push(
        new Pinball(
          random(0, windowWidth), //X
          random(50, windowHeight / 3), //Y
          random(8, 16) //R
        )
        //time delay

      );
      //just logging stuff
      //console.log("before:", currentCount);
      currentCount++;
      //console.log("now: ", currentCount);
    }
    //do nothing so that it doesnt throw the error
  } else if (newCount == currentCount) {
  } else {
    //just incase an impossible case arrises from emtpy values
    console.log(
      "error in counts. current count is",
      str(currentCount) + ". New count is",
      str(newCount)
    );
  }
}

function UpdateMagnet() {
  magnetStrength = magnetStr.value();
  //console.log(magnetStrength);

  if (magnet.elt.checked) {
      attractor1.remove();
      attractor1.add(magnetStrength);
      cyclePinballs();
  }
}

function UpdateGravity() {
  gravityValue = gravityVal.value();
  console.log(gravityValue);
  if (gravity.elt.checked) {
    engine.gravity.scale = gravityValue*0.001;
  }
}

//called each tick
function draw() {
  //draws the background over everything so that there is no trailing effect, comment it out for fun
  background(12);
  //calls a frame update on the engine, doing this instead of just letting it run means that its synced with the renderer since we are loading our own renderer through p5 and not using its designated renderer so that we can easily add images
  Engine.update(engine);


  //Check if mouse is on canvas
  mouseOver = ((mouseX > 0) && (mouseX < windowWidth) &&
    (mouseY > 0) && (mouseY < windowHeight - 123))

  //ray trace stuff
  //particle.show();
  // rayc.Cast(pinballs, colliders);
  // rayc.show();
  // rayc.lookAt(mouseX, mouseY);
  particle.look(pinballs, colliders);



  //itterates through each pinball and collider object in the respective arrays and calls the show function
  for (var p = 0; p < pinballs.length; p++) {
    pinballs[p].show();
    pinballs[p].checkPos();
  }
  for (var c = 0; c < colliders.length; c++) {
    colliders[c].show();
  }

  //highlights clicked object
  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    fill(0, 255, 0);
    ellipse(pos.x + offset.x, pos.y + offset.y, mConstraint.body.r*0.8, mConstraint.body.r*0.8);
  }

  //atractor stuff
  //canvasMouse
  Events.on(engine, 'afterUpdate', function() {
    if (!canvasMouse.position.x) {
      return;
    }

    // smoothly move the attractor body towards the mouse
    //console.log(magnetStrength.value());
    attractor1.move();

  });

  if (magnet.elt.checked) {
    if (attractor1.magnet == 0) {
      attractor1.add(magnetStrength);
      //console.log(magnetStrength);
      cyclePinballs();
    }
  } else if (!magnet.elt.checked) {
    if (attractor1.magnet == 1) {
      attractor1.remove();
    }
  }
  // //gravity stuff
  if (gravity.elt.checked) {
       engine.gravity.scale = gravityValue*0.001;
    } else if (!gravity.elt.checked) {
       engine.gravity.scale = 0;
    }
}



function sliderCount() {
  rayOutput.html(rayCount.elt.value); //= rayCount.elt.value;
  // particle.rays = [];
  particle.new(rayCount.elt.value);
  //console.log(rayOutput, rayCount);
}
function cyclePinballs() {
  for (var i = 0; i < pinballs.length; i++) {
    pinballs[i] = pinballs[i].cycle();
  }
}

function mousePressed() {
  if (mouseButton == 'right') {
    particle.update(mouseX, mouseY);
  }
  //console.log(mouseButton)
}
//called when the window is resized to make the canvas scale with it and move the colliders to the edge of the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 123);
  //base
  colliders[0].move(0, windowHeight - 123, windowWidth, 40);
  //left
  colliders[1].move(0, windowHeight, 40, windowHeight);
  //right
  colliders[2].move(windowWidth, windowHeight, 40, windowHeight);
  //top
  colliders[3].move(windowWidth / 2, -windowHeight*2, windowWidth, 40);
}


