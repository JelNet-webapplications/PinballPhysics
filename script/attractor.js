function Attractor(x, y) {
    this.magnet = 0;
    

    this.move = function() {
        //console.log(this.body);
        Body.translate(this.body, {
            x: (canvasMouse.position.x - this.body.position.x) * 0.25,
            y: (canvasMouse.position.y - this.body.position.y) * 0.25
        }); 
    }


    this.add = function(strength) {
        if (!(strength == null)) {
            str = strength * 1e-6;
            //console.log(str);
        } else {
            str = 1e-6;
            //console.log(strength);
        }
        if (this.magnet == 0) {
            //atractor stuff
            var Aoptions =     {
                isStatic: true,
                // example of an attractor function that 
                // returns a force vector that applies to bodyB
                plugin: {
                attractors: [
                    function(bodyA, bodyB) {
                    return {
                        x: (bodyA.position.x - bodyB.position.x) * str,
                        y: (bodyA.position.y - bodyB.position.y) * str
                    };
                    }
                ]
                }
            }
            // create a body with an attractor
            this.body = Bodies.circle(x, y, 15, Aoptions);
            this.body.collisionFilter = {
                'group': -1,
                'category': 2,
                'mask': 0,
            };
            Composite.add(engine.world, this.body);
            console.log("magnet added");
        }
        this.magnet = 1;
    }
    this.remove = function() {
        Composite.remove(engine.world, this.body);
        this.magnet = 0;
        console.log("magnet removed");
    }

    this.add();
}