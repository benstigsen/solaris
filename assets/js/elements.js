function incrementZoom()
{if (zoom < SCALE_MAX) {zoom = (+zoom + SCALE_INCREASE).toFixed(1);}}

function decrementZoom()
{if (zoom > SCALE_MIN) {zoom = (+zoom - SCALE_INCREASE).toFixed(1);}}

function togglePlanetSize()
{
  let choice = planetSize.value();

  if (choice == "50x") 
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].r = planets[i].r * 50;}
  }
  else if (choice == "Real Size")
  {
    for (let i = 0; i < planets.length; i++)
    {planets[i].r = planets[i].r / 50;}
  }
}

function changeOrbitalTime()
{
  let choice = orbitalTime.value();

  if      (choice == "1 Year (Real Time)")
  {speedMultiplier = 360 / (365.256 * 86400);}
  else if (choice == "1 Day (365x)")
  {speedMultiplier = 360 / 86400;}
  else if (choice == "1 Hour (8,766x)")
  {speedMultiplier = 360 / 3600;}
  else if (choice == "5 Minutes (105,192x)")
  {speedMultiplier = 360 / (5 * 60);}
  else if (choice == "15 Seconds (2,045,433x)")
  {speedMultiplier = 360 / 15;}
}

function addPlanetSizeOptions()
{
  createP("Planet Size").position(30, 75);
  planetSize = createSelect();
  planetSize.option("Real Size");
  planetSize.option("50x");
  planetSize.selected("50x");
  planetSize.position(30, 110);
  planetSize.changed(togglePlanetSize);
}

function addOrbitalTimeOptions()
{
  createP("Orbital Time (Earth)").position(30, 135);
  orbitalTime = createSelect();
  orbitalTime.option("1 Year (Real Time)");
  orbitalTime.option("1 Day (365x)");
  orbitalTime.option("1 Hour (8,766x)");
  orbitalTime.option("5 Minutes (105,192x)");
  orbitalTime.option("15 Seconds (2,045,433x)");
  orbitalTime.selected("15 Seconds (2,045,433x)");
  orbitalTime.position(30, 170);
  orbitalTime.changed(changeOrbitalTime);
}

function addPlanetSelectionOptions()
{
  createP("Planet Selection").position(30, 195);
  planetSelection = createSelect();
  planetSelection.option("All Planets");
  planetSelection.position(30, 230);

  for (let i = 0; i < planets.length; i++)
  {
    planetSelection.option(planets[i].name);
  }
}

function addZoomButtons()
{
  createP("Zoom Level").position(30, 15);
  createButton('+').mousePressed(incrementZoom).position(30, 50);
  createButton('-').mousePressed(decrementZoom).position(100, 50);
}

function addHohmannTransferToggle()
{
  hohmannCheckbox = createCheckbox('Show Hohmann transfer', false);
  hohmannCheckbox.position(25, 290);
}
