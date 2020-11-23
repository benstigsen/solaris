/*
  to-do:
    fix focus point center (currently completely centered, which is wrong)
*/

const WIDTH             = window.innerWidth - 50;
const HEIGHT            = window.innerHeight - 50;
const CENTER            = new Point(WIDTH / 2, HEIGHT / 2);

const SCALE_DIVISOR     = 10000;
const SCALE_INCREASE    = 0.1;
const SCALE_MIN         = 0.1;
const SCALE_MAX         = 2.5;

const G                 = 6.67430;

let speedMultiplier     = (360 / 15); // 15 second orbit

let scale               = 1.0;
let realisticVisuals    = false; // true = realistic, false = size 50x
let realisticSpeed      = false; // true = realistic, false = speed 30,681,504x

function decrementScale()
{
  if (!(scale <= SCALE_MIN)) 
  {scale = (+scale - SCALE_INCREASE).toFixed(1);}
}

function incrementScale()
{
  if (!(scale >= SCALE_MAX)) 
  {scale = (+scale + SCALE_INCREASE).toFixed(1);}
}

function toggleRealDiameter()
{
  realisticVisuals = !realisticVisuals;

  // Realistic
  if (realisticVisuals) 
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].r = planets[i].r / 50;}
  }
  // Planets 50x
  else
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].r = planets[i].r * 50;}
  }
}

function toggleRealSpeed()
{
  realisticSpeed = !realisticSpeed;

  if (realisticSpeed) {speedMultiplier = 360 / (365.256 * 84000);}
  else                {speedMultiplier = 360 / 15;}
}

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  // Change angle mode to degrees
  angleMode(DEGREES);

  // Create scaling buttons
  createButton('Zoom In').mousePressed(incrementScale).position(30, 50);
  createButton('Zoom Out').mousePressed(decrementScale).position(30, 80);
  createButton('Diameter').mousePressed(toggleRealDiameter).position(30, 110);
  createButton('Speed').mousePressed(toggleRealSpeed).position(30, 140);

  // Set semi-minor axis <b> for each planet
  for (let i = 0; i < planets.length; i++)
  {
    let planet    = planets[i];
    planet.a      = planet.a / 1_000_000;
    planet.r      = Math.ceil(((planet.d / 2) / SCALE_DIVISOR) * 50);
    planet.ae     = getFocusPoint(planet);
    planet.b      = getSemiMinorAxis(planet);
    planet.focus  = getFocusPoint(planet);
    planet.speed  = getEarthSpeedRatio(planet);
    planet.period = getPeriod(planet);
    planet.angle  = 0;
    planet.x      = planet.a;
    planet.y      = 0;
  }
}

// Function to handle logic
function update(dt)
{
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];

    let angle = planet.angle;
    let e = planet.e;
    let focus = planet.focus;

    //angle = (angle + ((speedMultiplier * planet.speed))) % 360;
    angle += (speedMultiplier * planet.speed) * (dt / 1000);

    let r = (planet.a * (1 - (e * e))) / (1 + e * cos(angle));
    let x = r * cos(angle) + focus;
    let y = r * sin(angle);

    let area = getTriangleArea(-focus, 0, planet.x, planet.y, x, y);

    planet.x = x;
    planet.y = y;
    planet.angle = angle;
  }
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
  text(realisticVisuals, 80, 100);
  text(realisticSpeed, 80, 130);

  // Translate everything from center of screen
  translate(CENTER.x, CENTER.y)

  // Draw the planets
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    fill(planet.color);

    // Planet with a minimum radius of 5 pixels
    circle(
      (planet.ae * scale) + (planet.x * scale),
      planet.y * scale, 
      Math.max(5, (planet.r * scale))
    );
    noFill();
    ellipse(planet.ae * scale, 0, (planet.a * 2) * scale, (planet.b * 2) * scale);
  }

  // Sun
  fill(sun.color);
  circle(0, 0, sun.r * scale);
}
