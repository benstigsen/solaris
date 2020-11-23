/*
  Script for data and calculations related to planets / moons / suns

  Variables:
    a:      semi-major axis
    b:      semi-minor axis
    e:      eccentricity
    r:      radius
    m:      mass
    au:     astronomical units
    ae:     distance from center to focal point
    angle:  angle
    speed:  speed in (earth ratio)
    G:      gravitational constant
*/

function getDistance(planet)
{
  return Math.sqrt((
    ((CENTER.x + planet.x) - CENTER.x) ** 2) + 
    ((CENTER.y + planet.y) - CENTER.y) ** 2);
}

function getPeriod(planet)
{return Math.sqrt(planet.au * planet.au * planet.au);}

function getPeriodDays(planet)
{return 365.256 * (planet.period / earth.period);}

function getPerihelion(planet)
{return planet.a / (1 + planet.e);}

function getAphelion(planet)
{return planet.a / (1 - planet.e);}

function getAstronomicalUnit(planet)
{return planet.a / earth.a;}

function getEarthSpeedRatio(planet)
{return Math.sqrt((earth.a / planet.a) ** 3);}

function getSemiMajorAxis(planet)
{return (getPerihelion(planet) + getAphelion(planet)) / 2;}

function getSemiMinorAxis(planet)
{return planet.a * Math.sqrt(1 - (planet.e * planet.e));}

function getFocusPoint(planet)
{
  if (!(planet.b)) {return planet.a * planet.e;}
  return Math.sqrt((planet.a * planet.a) - (planet.b * planet.b));
}

function getTriangleArea(x1, y1, x2, y2, x3, y3)
{
  return 0.5 * Math.abs((x1 * (y2 - y3)) + (x2 * (y3 - y1)) + (x3 * (y1 - y2)));
}

sun = {
  m: 1.989,
  d: 1_392_700,
  r: 696_350 / SCALE_DIVISOR, 
  color: "#FFDD00"
}

mercury = {
  a: 57_900_000,
  e: 0.205,
  au: 0.387,
  d: 4879,
  color: "#333333"
}

venus = {
  a: 108_200_000,
  e: 0.007,
  au: 0.723,
  d: 12104,
  color: "#FFDDDD"
}

earth = {
  a:  149_600_000,  // km
  e:  0.0167,
  au: 1,
  d:  12_756,       // km
  color: "#00FF00"
}

mars = {
  a:  227_920_000,
  e:  0.094,
  au: 1.52,
  d:  6792,
  color: "#FF7F00"
}

jupiter = {
  a:  778_570_000,
  e:  0.0489,
  au: 5.20,
  d:  142_984,
  color: "#555555"
}

saturn = {
  a: 1_433_500_000,
  e: 0.057,
  au: 9.58,
  d: 120_536,
  color: "#FFFF00"
}

uranus = {
  a: 2_872_500_000,
  e: 0.046,
  au: 19.20,
  d: 51_118,
  color: "#FFFF00"
}

neptune = {
  a: 4_495_100_000,
  e: 0.011,
  au: 30.05,
  d: 49528,
  color: "#2288FF"
}

pluto = {
  a: 5_906_400_000,
  e: 0.244,
  au: 39.48,
  d: 2370,
  color: "#2222FF"
}


// Array of planets for easy iteration
// Earth is first to apply setup changes to it
planets = [earth, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto];
