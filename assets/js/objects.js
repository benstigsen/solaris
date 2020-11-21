/*
  Script for data and calculations related to planets / moons / suns

  Variables:
    a:  semi-major axis
    b:  semi-minor axis
    e:  eccentricity
    r:  radius
    m:  mass
    au: astronomical units
*/ 

function getPerihelion(planet)
{return planet.a / (1 + planet.e);}

function getAphelion(planet)
{return planet.a / (1 - planet.e);}

function getAstronomicalUnit(planet)
{return planet.a / earth.a;}

function getSemiMajorAxis(planet)
{return (getPerihelion(planet) + getAphelion(planet)) / 2;}

sun = {
  m: 1.989,
  r: 40,
  color: "#FFDD00"
}

earth = {
  a:  149.6,
  e:  0.0167,
  au: 1,
  r:  20,
  color: "#00FF00"
}

mars = {
  a:  227.92,
  e:  0.094,
  au: 1.52,
  r:  20,
  color: "#FF7F00"
}

jupiter = {
  a:  778.57,
  e:  0.0489,
  au: 5.20,
  r:  30,
  color: "#555555"
}

// Array of planets for easy iteration
planets = [earth, mars, jupiter];
