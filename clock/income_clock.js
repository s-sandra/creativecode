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
  dollarFont = loadFont("Connection.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var flag;

  /* 
  2019 median household incomes obtained from
  worldpopulationreview.com/countries/median-income-by-country/
  */
  
  /*
  2019 prices for goods and services obtained from
  traveltables.com/country/<COUNTRY NAME>/cost-of-living
  */
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg");
  var cost = [];
  cost["liter of gas"] = 0.58;
  cost["water bottle"] = 0.68;
  cost["milk jug"] = 0.99;
  cost["egg carton"] = 1.60;
  cost["rice bag"] = 1.34;
  cost["potato sack"] = 2.94;
  countries.push(new Country("Liberia", flag, 781, cost))
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg");
  cost = [];
  cost["bus ticket"] = 0.48;
  cost["water bottle"] = 0.59;
  cost["soda bottle"] = 0.74;
  cost["bread loaf"] = 0.95;
  cost["banana"] = 1.10;
  cost["potato sack"] = 2.07;
  countries.push(new Country("Ghana", flag, 2050, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg");
  cost = [];
  cost["water bottle"] = 0.20;
  cost["bread loaf"] = 0.40;
  cost["taxi ride"] = 0.93;
  cost["cigarette pack"] = 2.86;
  cost["movie ticket"] = 3.58
  cost["three course meal"] = 8.58;
  countries.push(new Country("India", flag, 3168, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg");
  cost = [];
  cost["water bottle"] = 0.28;
  cost["milk jug"] = 1.79;
  cost["coffee cup"] = 3.82;
  cost["McMeal"] = 4.35;
  cost["wine bottle"] = 10.13;
  cost["three course meal"] = 18.82;
  countries.push(new Country("China", flag, 6180, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg");
  cost = [];
  cost["water bottle"] = 0.62;
  cost["bread loaf"] = 1.32;
  cost["beer bottle"] = 2.93;
  cost["beef round"] = 5.73;
  cost["McMeal"] = 6.11;
  cost["taxi ride"] = 7.13;
  cost["three course meal"] = 24.42;
  countries.push(new Country("Brazil", flag, 7522, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg");
  cost = [];
  cost["water bottle"] = 0.48;
  cost["beer bottle"] = 1.10;
  cost["taxi ride"] = 4.75;
  cost["beef round"] = 6.61;
  cost["tennis reservation"] = 15.74;
  cost["monthly bus ticket"] = 26.91;
  cost["three course meal"] = 31.66;
  countries.push(new Country("Russia", flag, 11724, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg");
  cost = [];
  cost["water bottle"] = 0.23;
  cost["bread loaf"] = 0.66;
  cost["coffee cup"] = 2.71;
  cost["McMeal"] = 5.93;
  cost["movie ticket"] = 13.46;
  cost["three course meal"] = 21.54;
  cost["monthly bus ticket"] = 40.40;
  cost["pair of sneakers"] = 80.22;
  countries.push(new Country("Saudi Arabia", flag, 24980, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg");
  cost = [];
  cost["water bottle"] = 0.97;
  cost["bread loaf"] = 1.69;
  cost["rice bag"] = 3.98;
  cost["McMeal"] = 6.28;
  cost["taxi ride"] = 29.92;
  cost["three course meal"] = 36.93;
  cost["pair of jeans"] = 65.54;
  cost["pair of sneakers"] = 71.62;
  countries.push(new Country("Japan", flag, 33822, cost))

  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg");
  cost = [];
  cost["water bottle"] = 1.41;
  cost["coffee cup"] = 3.96;
  cost["McMeal"] = 7.07;
  cost["beef round"] = 11.63;
  cost["fitness club card"] = 36.56;
  cost["three course meal"] = 50.50;
  cost["pair of sneakers"] = 74.17;
  countries.push(new Country("United States", flag, 43585, cost))
  
  flag = loadImage("https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg");
  cost = [];
  cost["water bottle"] = 1.74;
  cost["beer bottle"] = 5.86;
  cost["movie ticket"] = 12.77;
  cost["McMeal"] = 7.99;
  cost["fitness club card"] = 35.44;
  cost["three course meal"] = 63.89;
  cost["monthly bus pass"] = 85.11;
  cost["pair of sneakers"] = 92.47;
  countries.push(new Country("Sweden", flag, 50514, cost))
  
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
  constructor(name, flag, salary, prices) {
    this.name = name;
    this.flag = flag;
    this.salary = salary;
    this.prices = prices;
    this.rate = calcSalaryPerSecond(salary);
    this.earnings = calcMoney(this.rate);
  }
  
  addEarnings() {
    this.earnings += this.rate;
  }
  
  /*
  * Returns the item name and quantity of the most
  * expensive thing you can buy given the current
  * daily earnings
  */
  getPurchasingPower() {
    var minQuantity = 500;
    var chosenItem = "water bottle";
    
    for (var item in this.prices) {
      var cost = this.prices[item];
      var quantity = parseInt(this.earnings / cost);
      
      if (quantity != 0 && quantity < minQuantity) {
        minQuantity = quantity;
        chosenItem = item;
      }
    }
    
    // if no item found, default item is water bottle
    if (minQuantity == 500) {
      var waterBottles = parseInt(this.earnings / this.prices["water bottle"]);
      return ["water bottle", waterBottles];
    }
    else {
      return [chosenItem, minQuantity];
    }
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
  var purchasingLabelWidth = textWidth("0 monthly bus pass");
  var padding = height / 40;
  var flagWidth = (tagWidth + padding) / 3;
  
  var col1 = width/3.5 - (tagWidth / 1.5);
  var col0 = col1 - flagWidth;
  var col2 = col1 + tagWidth + padding + width/50;
  var col3 = col2 + dollarWidth + padding + width/60;
  var col4 = col3 + dollarWidth + padding + width/60;
  
  fill('white');
  textFont(labelFont);
  text("DAILY", col2 - padding + (textWidth("EARNINGS") / 4), 
       height - (height - (height / 10)) - textHeight);
  text("EARNINGS", col2 - padding, height - (height - (height / 10)));
  
  text("YEARLY", col3 - padding + (textWidth("SALARY") / 4),
       height - (height - (height / 10)) - textHeight);
  text("SALARY", col3, height - (height - (height / 10)));
  
  text("YOU CAN", col4 - padding/2, 
       height - (height - (height / 10)) - textHeight);
  text("PURCHASE", col4 - padding, height - (height - (height / 10)));
  
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
    
    /* Draws purchasing power for each country */
    fill('black');
    rect(col4 - padding, top, 
         dateWidth + purchasingLabelWidth + padding, textHeight + padding);
    textFont(dollarFont);
    fill(color(255, 110, 117));
    
    var power = country.getPurchasingPower();
    var item = power[0];
    var total = power[1];
    text(total, col4, row);
    
    if (total != 1) {
      text(" " + item + "s", col4 + padding, row);
    }
    else {
      text(" " + item, col4 + padding, row);
    }
    
    
    /* Draws flag and label for each country */
    image(country.flag, col0 - padding + padding/2, top, flagWidth, textHeight + padding);
    fill('white');
    noStroke();
    rect(col1 - padding + padding/2, top, tagWidth + padding, textHeight + padding);
    
    fill('black');
    textFont(labelFont);
    text(country.name.toUpperCase(), col1, row);
    text("$", col1 + tagWidth - padding, row);
  }
  
  /* Draws date label */
  fill("white");
  text("DATE", col1, height - (height / 10));
  fill("black");
  rect(col1, height - (height / 10) + textHeight/2, 
       dateWidth + padding, textHeight + padding);
  
  /* Draws date */
  fill(color(255, 110, 117));
  textFont(dollarFont);
  text(month() + " " + day(), col1 + padding/3, height - textHeight * 1.2);
}
