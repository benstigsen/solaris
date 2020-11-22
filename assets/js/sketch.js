/*
  to-do:
    fix focus point center (currently completely centered, which is wrong)
*/

const WIDTH             = window.innerWidth - 50;
const HEIGHT            = window.innerHeight - 50;
const CENTER            = new Point(WIDTH / 2, HEIGHT / 2);
const ANGLE_INCREASE    = 0.001;

const SCALE_DIVISOR     = 10000;
const SCALE_INCREASE    = 0.1;
const SCALE_MIN         = 0.1;
const SCALE_MAX         = 2.5;

const G                 = 6.67430;

let scale               = 1.0;
let realisticVisuals    = true; // true = realistic, false = planet 50x
let realisticSpeed      = false;

function decrementScale()
{
  if (!(scale <= SCALE_MIN)) 
  {
    scale -= SCALE_INCREASE;
    scale = +scale.toFixed(1);
  }
}

function incrementScale()
{
  if (!(scale >= SCALE_MAX)) 
  {
    scale += SCALE_INCREASE;
    scale = +scale.toFixed(1);
  }
}

function adjustDiameters()
{
  realisticVisuals = !realisticVisuals;

  // Realistic
  if (realisticVisuals) 
  {
    for (let i = 0; i < planets.length; i++)
    {
      planets[i].r = (planets[i].d / 2) / SCALE_DIVISOR;
    }
  }
  // Planets 50x
  else
  {
    for (let i = 0; i < planets.length; i++)
    {
      planets[i].r = ((planets[i].d / 2) / SCALE_DIVISOR) * 50;
    }
  }
}

function adjustSpeed()
{
  realisticSpeed = !realisticSpeed;

  // Realistic
  if (realisticSpeed) 
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].speed = getPeriodRealSpeed(planets[i]);}
  }
  // Non-Realistic
  else
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].speed = getEarthSpeedRatio(planets[i]);}
  }
}

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  adjustDiameters();

  // Create scaling buttons
  createButton('Zoom In').mousePressed(incrementScale).position(30, 50);
  createButton('Zoom Out').mousePressed(decrementScale).position(30, 80);
  createButton('Realistic').mousePressed(adjustDiameters).position(30, 110);
  createButton('Speed').mousePressed(adjustSpeed).position(30, 140);

  // Set semi-minor axis <b> for each planet
  for (let i = 0; i < planets.length; i++)
  {
    let planet    = planets[i];
    planet.a      = planet.a / 1_000_000;
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
