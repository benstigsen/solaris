/*
  Script for data and calculations related to planets / moons / suns

  Variables for each planet:
    a:      semi-major axis
    b:      semi-minor axis
    e:      eccentricity
    r:      radius
    T:      period (years)
    au:     astronomical units
    focus:  distance from center to focal point
    speed:  speed (earth ratio)
    angle:  angle (degrees)
    peri:   perihelion distance
    aphe:   aphelion distance
*/

function getDistance(x1, y1, x2, y2)
{return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));}

function getPeriod(au)
{return Math.sqrt(au * au * au);}

function getPeriodSimulation(au)
{return (360 / speedMultiplier) * Math.sqrt(au * au * au);}

function getPeriodDays(T)
{return 365.256 * (T / earth.T);}

function getPerihelion(a, e)
{return a / (1 + e);}

function getAphelion(a, e)
{return a / (1 - e);}

function getAstronomicalUnit(a)
{return a / earth.a;}

function getEarthSpeedRatio(a)
{
  let ratio = earth.a / a;
  return Math.sqrt(ratio * ratio * ratio);
}

function getSemiMajorAxis(a, e)
{return (getPerihelion(a, e) + getAphelion(a, e)) / 2;}

function getSemiMinorAxis(a, e)
{return a * Math.sqrt(1 - (e * e));}

function getFocusPoint(planet)
{
  if (!(planet.b)) {return planet.a * planet.e;}
  return Math.sqrt((planet.a * planet.a) - (planet.b * planet.b));
}

function getTriangleArea(x1, y1, x2, y2, x3, y3)
{
  return 0.5 * Math.abs((x1 * (y2 - y3)) + (x2 * (y3 - y1)) + (x3 * (y1 - y2)));
}

function getAngle(planet)
{
  let days = 360 / getPeriodDays(planet.T);
  let degPerSecond = days / 86400;
  return (planet.time * degPerSecond) % 360;
}

function getAngleAtHohmannTransfer(planet1, planet2)
{
  let avgAu = (planet1.au + planet2.au) / 2;
  let transferTime = getPeriod(avgAu);
  let transferTimeDays = getPeriodDays(transferTime);
  let orbitTimeDays = getPeriodDays(mars.T);
  let degreesPerDay = 360 / orbitTimeDays;
  let degreesMoved = degreesPerDay * (transferTimeDays / 2);
  let degreesAtArrival = 180;
  let degreesAtLaunch = degreesAtArrival - degreesMoved;
  return degreesAtLaunch;
  /*
  return 44;
  */
  //let degreesAtLaunch = 
}

sun = {
  d:      1_392_700,
  r:      696_350, 
  color:  "#FFDD00"
}

mercury = {
  a:      57_900_000,
  e:      0.205,
  au:     0.387,
  d:      4879,
  color:  "#333333",
  name:   "Mercury",
  time:   1611878400
}

venus = {
  a:      108_200_000,
  e:      0.007,
  au:     0.723,
  d:      12104,
  color:  "#FFDDDD",
  name:   "Venus",
  time:   1623456000
}

earth = {
  a:      149_600_000,  // km
  e:      0.0167,
  au:     1.0,
  d:      12_756,       // km
  color:  "#00FF00",
  name:   "Earth",
  time:   1609718400
}

mars = {
  a:      227_920_000,
  e:      0.094,
  au:     1.52,
  d:      6792,
  color:  "#FF7F00",
  name:   "Mars",
  time:   1655769600
}

jupiter = {
  a:      778_570_000,
  e:      0.0489,
  au:     5.20,
  d:      142_984,
  color:  "#555555",
  name:   "Jupiter",
  time:   1674172800
}

saturn = {
  a:      1_433_500_000,
  e:      0.057,
  au:     9.58,
  d:      120_536,
  color:  "#FFFF00",
  name:   "Saturn",
  time:   1985212800
}

uranus = {
  a:      2_872_500_000,
  e:      0.046,
  au:     19.20,
  d:      51_118,
  color:  "#FFFF00",
  name:   "Uranus",
  time:   2544307200
}

neptune = {
  a:      4_495_100_000,
  e:      0.011,
  au:     30.05,
  d:      49528,
  color:  "#2288FF",
  name:   "Neptune",
  time:   2293315200
}

pluto = {
  a:      5_906_400_000,
  e:      0.244,
  au:     39.48,
  d:      2370,
  color:  "#2222FF",
  name:   "Pluto",
  time:   8575545600
}


// Array of planets for easy iteration
// Earth is first to apply setup changes to it
planets = [
  mercury, venus, earth,
  mars, jupiter, saturn, 
  uranus, neptune, pluto
];

// Dictionary of reference to each planet index in array
planetsRef = {}
for (let i = 0; i < planets.length; i++)
{
  planetsRef[planets[i].name] = i;
}
