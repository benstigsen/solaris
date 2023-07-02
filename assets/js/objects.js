/*
  Script for data and calculations related to planets / moons / var suns

  Variables for each planet:
    a:      semi-major axis
    b:      semi-minor axis
    e:      eccentricity
    r:      radius
    T:      period (years)
    au:     astronomical units
    ae:     distance from center to focal point
    v:      velocity (earth ratio)
    angle:  angle (degrees)
    peri:   perihelion distance
    aphe:   aphelion distance
    time:   date till next perihelion (seconds)
*/

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}

function getPeriod(au) {
  return Math.sqrt(au * au * au);
}

function getPeriodSimulation(au) {
  return (360 / speedMultiplier) * Math.sqrt(au * au * au);
}

function getPeriodDays(T) {
  return 365.256 * (T / planets.get("Earth").T);
}

function getPerihelion(a, e) {
  return a / (1 + e);
}

function getAphelion(a, e) {
  return a / (1 - e);
}

function getAstronomicalUnit(a) {
  return a / earth.a;
}

function getEarthVelocityRatio(a) {
  let ratio = planets.get("Earth").a / a;
  return Math.sqrt(ratio * ratio * ratio);
}

function getSemiMajorAxis(a, e) {
  return (getPerihelion(a, e) + getAphelion(a, e)) / 2;
}

function getSemiMinorAxis(a, e) {
  return a * Math.sqrt(1 - (e * e));
}

function getFocusPoint(planet) {
  return planet.a * planet.e;
}

function getHohmannTransfer(planet1, planet2) {
  let avgAu             = (planet1.au + planet2.au) / 2;
  let transferTime      = getPeriod(avgAu);
  let transferTimeDays  = getPeriodDays(transferTime);
  let planetTimeDays    = getPeriodDays(planet2.T);
  let degreesPerDay     = 360 / planetTimeDays;
  let degreesMoved      = degreesPerDay * (transferTimeDays / 2);
  let degreesAtLaunch   = 180 - degreesMoved;

  return {
    "transferTime": transferTimeDays / 2,
    "degreesAtLaunch": degreesAtLaunch
  }
}

// https://nssdc.gsfc.nasa.gov/planetary/factsheet/
var sun = {
  r: 696_350 * SCALE_RADIUS,
  color: "#FFDD00"
}

let planetList = [
  {
    a:     57_900_000 * SCALE_MAJOR_AXIS,
    e:     0.205,
    au:    0.387,
    T:     getPeriod(0.387),
    r:     2439.5 * SCALE_RADIUS,
    color: "#B5721D",
    name:  "Mercury",
  },
  {
    a:     108_200_000 * SCALE_MAJOR_AXIS,
    e:     0.007,
    au:    0.723,
    T:     getPeriod(0.723),
    r:     6052 * SCALE_RADIUS,
    color: "#FDDCB4",
    name:  "Venus",
  },
  {
    a:     149_600_000 * SCALE_MAJOR_AXIS,
    e:     0.0167,
    au:    1.0,
    T:     getPeriod(1.0),
    r:     6378 * SCALE_RADIUS,
    color: "#00FF00",
    name:  "Earth",
  },
  {
    a:     227_956_000 * SCALE_MAJOR_AXIS,
    e:     0.094,
    au:    1.524,
    T:     getPeriod(1.524),
    r:     3396 * SCALE_RADIUS,
    color: "#FF7F00",
    name:  "Mars",
  },
  {
    a:     778_570_000 * SCALE_MAJOR_AXIS,
    e:     0.0489,
    au:    5.20,
    T:     getPeriod(5.20),
    r:     71492 * SCALE_RADIUS,
    color: "#DDB482",
    name:  "Jupiter",
  },
  {
    a:     1_433_500_000 * SCALE_MAJOR_AXIS,
    e:     0.057,
    au:    9.58,
    T:     getPeriod(9.58),
    r:     60268 * SCALE_RADIUS,
    color: "#FFFF00",
    name:  "Saturn",
  },
  {
    a:     2_872_500_000 * SCALE_MAJOR_AXIS,
    e:     0.046,
    au:    19.20,
    T:     getPeriod(19.20),
    r:     25559 * SCALE_RADIUS,
    color: "#ADD8E6",
    name:  "Uranus",
  },
  {
    a:     4_495_100_000 * SCALE_MAJOR_AXIS,
    e:     0.011,
    au:    30.05,
    T:     getPeriod(30.05),
    r:     24764 * SCALE_RADIUS,
    color: "#2288FF",
    name:  "Neptune",
  },
  {
    a:     5_906_400_000 * SCALE_MAJOR_AXIS,
    e:     0.244,
    au:    39.48,
    T:     getPeriod(39.48),
    r:     1185 * SCALE_RADIUS,
    color: "#CCCCCC",
    name:  "Pluto",
  }
];

var planets = new Map();
for (let planet of planetList) {
  planets.set(planet.name, planet);
}
