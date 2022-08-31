class Particle {
    constructor(c) {
        if (!this.pos) {
            this.pos = createVector(windowWidth/2, 0)
        }
        this.rays = [];
        var space = 360/c;
        for (let a = 0; a < 360; a+= space) {
            this.rays.push(new Ray(this.pos.x, this.pos.y, radians(a)));
            //console.log(this.pos);
        }
    }

    new(c) {
        this.rays = [];
        var space = 360/c;
        for (let a = 0; a < 360; a+= space) {
            this.rays.push(new Ray(this.pos.x, this.pos.y, radians(a)));
        }
    }

    update(x, y) {
        this.pos.set(x, y);
        //console.log(this.pos);
        for (let ray of this.rays) {
            ray.pos.set(x, y);
            //console.log(ray.pos);
        }
    }

    look(pinballs, colliders) {
        for (var i = 0; i < pinballs.length; i++) {
            pinballs[i].body.ray = false;
        }
        for (let ray of this.rays) {
            ray.Cast(pinballs, colliders);
        }
    }


    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
            //ray.Cast(pinballs, colliders);
        }
    }
}