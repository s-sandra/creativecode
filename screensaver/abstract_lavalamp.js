var colours = [];
var events = [];
var maxEvents = 500; 

function setup() {

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
  createCanvas(1920, 1080);
  background(100);
}

class Event {

  constructor(x, y, colour, size, delta) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.alpha = 1;
    this.size = 1;
    this.maxSize = size;

    this.alphaDelta = delta;
    this.sizeDelta = 1;
  }

  draw(index) {
    if (this.size > this.maxSize) {
      this.sizeDelta = -this.sizeDelta;
    }

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

function nextEvent() {
  var xPos = random(0, width);
  var yPos = random(0, height);
  var colour = colours[int(random(0, colours.length))];
  return new Event(xPos, yPos, colour, random(0, 20), random(1, 5));
}

 
function draw() {
 
  if(events.length < maxEvents) {
    newEvent = nextEvent();
    events.push(nextEvent());
  }

  background(100);
  for (var i = 0; i < events.length; i++) {
    event = events[i];
    if(!event.draw(i)) {
      events[i] = nextEvent();
    }
  }

}