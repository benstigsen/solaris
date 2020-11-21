const WIDTH             = window.innerWidth - 50;
const HEIGHT            = window.innerHeight - 50;
const CENTER            = new Point(WIDTH / 2, HEIGHT / 2);
const ANGLE_INCREASE    = 0.001;

const SCALE_INCREASE    = 0.1;
const SCALE_MIN         = 0.3;
const SCALE_MAX         = 1.5;
let scale               = 1.0;

function decrementScale()
{if (!(scale <= SCALE_MIN)) {scale -= SCALE_INCREASE; scale = +scale.toFixed(1);}}

function incrementScale()
{if (!(scale >= SCALE_MAX)) {scale += SCALE_INCREASE; scale = +scale.toFixed(1);}}

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  // Create scaling buttons
  createButton('Zoom In').mousePressed(incrementScale).position(30, 50);
  
  createButton('Zoom Out').mousePressed(decrementScale).position(30, 80);

  // Set semi-minor axis <b> for each planet
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    planet.b = getSemiMinorAxis(planet);
    planet.focus = getFocusPoint(planet);
    planet.speed = getEarthSpeedRatio(planet);
    planet.angle = 0.0;
    planet.x = planet.a;
    planet.y = 0;
  }

  console.log(earth.focus);
}

// Function to handle logic
function update(dt)
{
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];

    let angle = planet.angle;
    let a = planet.a;
    let e = planet.e;
    let focus = planet.focus;

    angle += ((ANGLE_INCREASE * planet.speed) * dt) % 360;

    let r = (a * (1 - (e * e))) / (1 + e * Math.cos(angle));
    let x = r * cos(angle) + focus;
    let y = r * sin(angle);

    let area = getTriangleArea(-focus, 0, planet.x, planet.y, x, y);

    planet.x = x;
    planet.y = y;
    planet.angle = angle;
  }
  // Update position

}

// Function to handle drawing
function draw()
{
  // Handle logic
  update(deltaTime);


  // Clear canvas and reset colors
  clear();
  background(220);
  
  fill("#000000");
  text(scale, 30, 20);
  
  fill("#FFFFFF");

  // Draw the planets
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    fill(planet.color);
    circle(CENTER.x + (planet.x * scale), CENTER.y + (planet.y * scale), planet.r * scale);
    noFill();
    ellipse(CENTER.x, CENTER.y, (planet.a * 2) * scale, (planet.b * 2) * scale);
  }

  // Sun
  fill(sun.color);
  circle(CENTER.x - ((sun.r / 2) * scale), CENTER.y, sun.r * scale);
}
