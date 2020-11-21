const WIDTH   = window.innerWidth - 50;
const HEIGHT  = window.innerHeight - 50;
const CENTER  = new Point(WIDTH / 2, HEIGHT / 2);
const SCALE   = 1_496_000;

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  console.log(CENTER);
}

// Function to handle logic
function update(dt)
{
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
  fill("#FFFFFF");

  // Draw the planets
  for (let i = 0; i < planets.length; i++)
  {
    fill(planets[i].color);
    circle(CENTER.x + 50 + (i * 20) + (20 * planets[i].au), CENTER.y, planets[i].r);
  }
  
  // Sun
  fill(sun.color);
  circle(CENTER.x - (sun.r / 2), CENTER.y, sun.r);
}
