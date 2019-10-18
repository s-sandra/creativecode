var colours = []; // stores colors for circles
var events = []; // stores random circle objects
var maxEvents = 500; // the max size of events

function setup() {

  /* rgb color values for circles */
  var orange = {
    red: 255,
    green: 198,
    blue: 120
  };
  var yellow = {
    red: 255,
    green: 243,
    blue: 110
  };
  var lemon = {
    red: 117,
    green: 255,
    blue: 121
  };
  var teal = {
    red: 150,
    green: 255,
    blue: 251
  };
  colours = [orange, yellow, lemon, teal];
  createCanvas(windowWidth, windowHeight);
  background(100);
}

/* Class for circles */
class Event {

  constructor(x, y, colour, size, delta) {
    /* coordinates */
    this.x = x;
    this.y = y;
    
    this.size = 1;
    this.maxSize = size;
    this.sizeDelta = 1; // change in size
    
    this.colour = colour;
    this.alpha = 1; // transparency of circle
    this.alphaDelta = delta; // change in transparency
  }

  /*
  * Draws this circle on the canvas. Returns true if circle is still visible.
  * (alpha is greater than 0).
  */
  draw() {
    
    // if circle has grown past its max size, begin shrinking
    if (this.size > this.maxSize) {
      this.sizeDelta = -this.sizeDelta;
    }

    // if circle has reached its max opacity, begin fading out
    if (this.alpha > 200) {
      this.alphaDelta = -this.alphaDelta;
    }

    this.size += this.sizeDelta;
    this.alpha += this.alphaDelta;
    this.y += this.alphaDelta;
    
    fill(this.colour.red, this.colour.green, this.colour.blue, this.alpha);
    noStroke();
    circle(this.x, this.y, this.size);
    return this.alpha > 0;
  }
}

/* 
* Generates a new circle with random coordinates, color, size and change in alpha.
*/
function nextEvent() {
  var xPos = random(0, width);
  var yPos = random(0, height);
  var colour = colours[int(random(0, colours.length))]; // picks random color from color list
  return new Event(xPos, yPos, colour, random(0, 20), random(1, 5));
}

 
function draw() {
 
  // if list of circles has not exceeded its capacity
  if(events.length < maxEvents) {
    newEvent = nextEvent(); // create a new circle
    events.push(nextEvent()); // add circle to list of circles
  }

  background(100);
  for (var i = 0; i < events.length; i++) {
    event = events[i];
    
    // if circle has disappeared
    if(!event.draw()) {
      events[i] = nextEvent(); // replace with new circle
    }
  }
}
