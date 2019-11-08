/*
* Income Clock
* @author Sandra Shtabnaya
* DGST 301C, Fall 2019: Creative Coding
*/
var SECONDS = 60 * 525600; // number of seconds in day
var lastSecond;
var rate = [];
var income = [];
var country = [];
var flag = [];
var labelFont;
var dollarFont;
var tagWidth;

// https://www.numbeo.com/cost-of-living/prices_by_country.jsp

function preload() {
  labelFont = loadFont("Poppins-SemiBold.ttf");
  dollarFont = loadFont("Segment7Standard.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 2019 median household incomes obtained from
  // worldpopulationreview.com/countries/median-income-by-country/
  
  var LiberiaRate = calcSalaryPerSecond(781);
  var LiberiaMoney = calcMoney(LiberiaRate);
  rate.push(LiberiaRate);
  income.push(LiberiaMoney);
  country.push("Liberia");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg"));
  
  var GhanaRate = calcSalaryPerSecond(2050);
  var GhanaMoney = calcMoney(GhanaRate);
  rate.push(GhanaRate);
  income.push(GhanaMoney);
  country.push("Ghana");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg"));
  
  var IndiaRate = calcSalaryPerSecond(3168);
  var IndiaMoney = calcMoney(IndiaRate);
  rate.push(IndiaRate);
  income.push(IndiaMoney);
  country.push("India");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"));
  
  var ChinaRate = calcSalaryPerSecond(6180);
  var ChinaMoney = calcMoney(ChinaRate);
  rate.push(ChinaRate);
  income.push(ChinaMoney);
  country.push("China");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"));

  var BrazilRate = calcSalaryPerSecond(7522);
  var BrazilMoney = calcMoney(BrazilRate);
  rate.push(BrazilRate);
  income.push(BrazilMoney);
  country.push("Brazil");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"));
  
  var RussiaRate = calcSalaryPerSecond(11724);
  var RussiaMoney = calcMoney(RussiaRate);
  rate.push(RussiaRate);
  income.push(RussiaMoney);
  country.push("Russia");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg"));

  var SaudiRate = calcSalaryPerSecond(24980);
  var SaudiMoney = calcMoney(SaudiRate);
  rate.push(SaudiRate);
  income.push(SaudiMoney);
  country.push("Saudi Arabia");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"));
  
  var JapanRate = calcSalaryPerSecond(33822);
  var JapanMoney = calcMoney(JapanRate);
  rate.push(JapanRate);
  income.push(JapanMoney);
  country.push("Japan");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"));

  var USRate = calcSalaryPerSecond(43585);
  var USMoney = calcMoney(USRate);
  rate.push(USRate);
  income.push(USMoney);
  country.push("United States");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"));
  
  var SwedenRate = calcSalaryPerSecond(50514);
  var SwedenMoney = calcMoney(SwedenRate);
  rate.push(SwedenRate);
  income.push(SwedenMoney);
  country.push("Sweden");
  flag.push(loadImage("https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg"));
  
  var maxWidth = 0;
  textSize(height / 23);
  textFont(labelFont);
  
  for (var i = 0; i < country.length; i++) {
    var len = textWidth(country[i].toUpperCase());
    if (len > maxWidth) {
      maxWidth = len;
    }
  }
  tagWidth = maxWidth;
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
  
  // max width of earning amounts
  var dollarWidth = textWidth("$ 000.000"); 
  var dateWidth = textWidth("00 00");
  var flagWidth = 50 + (width / 100);
  var padding = height / 40;
  
  var col1 = width/2 - (tagWidth / 1.5);
  var col0 = col1 - flagWidth;
  var col2 = col1 + tagWidth + padding + 10;
  
  fill('white');
  textFont(labelFont);
  text("EARNINGS", col2 - padding, height - (height - (height / 10)));
  
  // if the second has changed, increment country earnings
  if (second() != lastSecond) {
    for (var i = 0; i < income.length; i++) {
      income[i] += rate[i];
    }
  }
  lastSecond = second();
  
  for (var i = 0; i < country.length; i++) {
    var row = height - (height/5 + (i * (height / 14)));
    var top = row - textHeight - (textHeight/4);
        
    /* Draws earnings for each country */
    fill('black');
    rect(col2 - padding, top, dollarWidth + padding, textHeight + padding);
    textFont(dollarFont);
    fill(color(255, 110, 117));
    text(format(income[i].toFixed(3)), col2, row);
    
    /* Draws flag and label for each country */
    image(flag[i], col0 - flagWidth/5, top, flagWidth, textHeight + padding);
    fill('white');
    noStroke();
    rect(col1 - padding, top, tagWidth + padding, textHeight + padding);
    
    fill('black');
    textFont(labelFont);
    text(country[i].toUpperCase(), col1, row);
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