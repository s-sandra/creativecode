/*
* Income Clock
* @author Sandra Shtabnaya
* DGST 301C, Fall 2019: Creative Coding
*/
var SECONDS = 60 * 525600; // number of seconds in day
var lastSecond;
var countries = [];
var labelFont;
var dollarFont;
var tagWidth;

function preload() {
  labelFont = loadFont("Poppins-SemiBold.ttf");
  dollarFont = loadFont("Segment7Standard.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var flag;

  // 2019 median household incomes obtained from
  // worldpopulationreview.com/countries/median-income-by-country/
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg");
  countries.push(new Country("Liberia", flag, 781))
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg");
  countries.push(new Country("Ghana", flag, 2050))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg");
  countries.push(new Country("India", flag, 3168))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg");
  countries.push(new Country("China", flag, 6180))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg");
  countries.push(new Country("Brazil", flag, 7522))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg");
  countries.push(new Country("Russia", flag, 11724))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg");
  countries.push(new Country("Saudi Arabia", flag, 24980))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg");
  countries.push(new Country("Japan", flag, 33822))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg");
  countries.push(new Country("United States", flag, 43585))
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg");
  countries.push(new Country("Sweden", flag, 50514))
  
  var maxWidth = 0;
  textSize(height / 23);
  textFont(labelFont);
  
  for (var i = 0; i < countries.length; i++) {
    var len = textWidth(countries[i].name.toUpperCase());
    if (len > maxWidth) {
      maxWidth = len;
    }
  }
  tagWidth = maxWidth;
}

class Country {
  constructor(name, flag, salary) {
    this.name = name;
    this.flag = flag;
    this.salary = salary;
    this.rate = calcSalaryPerSecond(salary);
    this.earnings = calcMoney(this.rate);
  }
  
  addEarnings() {
    this.earnings += this.rate;
  }
}

/*
* Given annual income, calculates how much money
* earned per second.
*/
function calcSalaryPerSecond(income) {
  return income / SECONDS;
}

/*
* Converts number to two digit format
*/
function format(num) {
  if (num < 10) {
     return "0" + num;
  }
  return num;
}

/*
* Calculates total accumulated money since midnight
*/
function calcMoney(rate) {
  // number of seconds since midnight
  var totalSeconds = (hour() * 60 * 60) + (minute() * 60); 
  return (totalSeconds + second()) * rate;
}

function draw() {
  
  background(color(50, 72, 168));
  var textHeight = height / 30;
  textSize(textHeight);
  textFont(dollarFont);
  
  var dollarWidth = textWidth("$ 000.000"); // max width of earning amounts
  var dateWidth = textWidth("00 00");
  var flagWidth = 50 + (width / 100);
  var padding = height / 40;
  
  var col1 = width/2.5 - (tagWidth / 1.5);
  var col0 = col1 - flagWidth;
  var col2 = col1 + tagWidth + padding + 10;
  var col3 = col2 + dollarWidth + padding + 20;
  
  fill('white');
  textFont(labelFont);
  text("DAILY", col2 - padding + (textWidth("EARNINGS") / 4), height - (height - (height / 10)) - textHeight);
  text("EARNINGS", col2 - padding, height - (height - (height / 10)));
  text("SALARY", col3, height - (height - (height / 10)));
  
  // if the second has changed, increment country earnings
  if (second() != lastSecond) {
    for (var i = 0; i < countries.length; i++) {
      countries[i].addEarnings();
    }
  }
  lastSecond = second();
  
  for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var row = height - (height/5 + (i * (height / 14)));
    var top = row - textHeight - (textHeight/4);
        
    /* Draws earnings for each country */
    fill('black');
    rect(col2 - padding, top, dollarWidth + padding, textHeight + padding);
    textFont(dollarFont);
    fill(color(255, 110, 117));
    text(format(country.earnings.toFixed(3)), col2, row);
    
    /* Draws yearly income for each country */
    fill('black');
    rect(col3 - padding, top, dollarWidth + padding, textHeight + padding);
    textFont(dollarFont);
    fill(color(255, 110, 117));
    text(format(country.salary), col3, row);
    
    /* Draws flag and label for each country */
    image(country.flag, col0 - flagWidth/5, top, flagWidth, textHeight + padding);
    fill('white');
    noStroke();
    rect(col1 - padding, top, tagWidth + padding, textHeight + padding);
    
    fill('black');
    textFont(labelFont);
    text(country.name.toUpperCase(), col1, row);
    text("$", col1 + tagWidth - padding - (padding/2), row);
  }
  
  /* Draws date label */
  fill("white");
  text("DATE", col1, height - (height / 10));
  fill("black");
  rect(col1 - padding, height - (height / 10) + textHeight/2, dateWidth + padding, textHeight + padding);
  
  /* Draws date */
  fill(color(255, 110, 117));
  textFont(dollarFont);
  text(month() + " " + day(), col1 - padding, height - textHeight*1.2);
}
