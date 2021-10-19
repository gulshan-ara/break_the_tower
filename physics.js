////////////////////////////////////////////////////////////////
function setupGround() {
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true,
        angle: 0
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
    push();
    fill(128);
    drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
    // your code here
    propeller = Bodies.rectangle(250, 480, 200, 15, {
        isStatic: true,
        angle: angle
    });
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
    push();
    // your code here
    fill(255);
    drawVertices(propeller.vertices);
    angle += angleSpeed;
    Body.setAngle(propeller, angle);
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
    var bird = Bodies.circle(mouseX, mouseY, 20, {
        friction: 0,
        restitution: 0.95
    });
    Matter.Body.setMass(bird, bird.mass * 10);
    World.add(engine.world, [bird]);
    birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
    push();
    //your code here
    fill(255, 0, 0, 180);
    for (var i = 0; i < birds.length; i++) {
        drawVertices(birds[i].vertices);

        if (isOffScreen(birds[i])) {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
            i--;
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {

    //you code here
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            var box = Bodies.rectangle(700 + j * 80, 140 + i * 80, 80, 80, {
                angle: 0,
                restitution: 0.95,
                friction: 0.9
            });

            World.add(engine.world, [box]);
            boxes.push(box);

            var colour = color(0, random(0, 255), 0);
            colors.push(colour);
        }
    }
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
    push();
    //your code here
    for (let i = 0; i < boxes.length; i++) {
        stroke(255);
        fill(colors[i]);
        drawVertices(boxes[i].vertices);

        if (isOffScreen(boxes[i])) {
            removeFromWorld(boxes[i]);
            boxes.splice(i, 1);
            i--;
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
    //your code here

    slingshotBird = Bodies.circle(250, 120, 20, {
        friction: 0,
        restitution: 0.95
    });
    Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);
    slingshotConstraint = Constraint.create({
        pointA: { x: 250, y: 120 },
        bodyB: slingshotBird,
        pointB: { x: -10, y: -10 },
        stiffness: 0.01,
        damping: 0.0001
    });
    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
    push();
    // your code here
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05 }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}