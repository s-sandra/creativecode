# Income Clock
View live demo: https://editor.p5js.org/s-sandra/present/AqvxNhFww<br>
p5.js sketch source code: https://editor.p5js.org/s-sandra/sketches/AqvxNhFww<br>
Fonts used: [Poppins](https://fontlibrary.org/en/font/poppins) and [Segment7](https://fontlibrary.org/en/font/segment7) from the Open Font Library.

## Project Description
This [p5.js](https://editor.p5js.org/s-sandra/sketches/c7eT53r2D) clock builds off the old adage “time is money,” representing system time in the style of a currency exchange board. The dollar amount attached to each country changes every second, depending on the nation’s yearly median household income (obtained from the [world population review](http://worldpopulationreview.com/countries/median-income-by-country/)). The rate of change is calculated by computing how much money an average citizen in that country makes each second, or dividing salary by the total number of seconds in the year. Therefore, countries with higher median earnings change at faster rates than countries at the end of the currency exchange board, whose values increment only every few seconds.

## Project Process
Originally, I planned to create an animation of falling coins, whereby the quantity of coins dropping each second corresponded to the amount of cents an average American would earn a day. We measure prosperity in terms of money (like GDP and net worth), so why not time? My intent was to make visible the accumulation of wealth, as the coins piled up at the bottom of the screen. I began by considering how much money one would typically earn in a day, which then made me wonder how that sum compared to other countries in the world. Thus, the income clock was born. It is akin to the [US National Debt Clock]( https://www.usdebtclock.org/) or the [World Poverty Clock](https://worldpoverty.io/), making visible the uneven global distribution of wealth as well as the income disparity in our own country. 

## Revision Ideas
In the future, I want to add a third column to the income clock that places each daily earning into context, such as by exhibiting purchasing power for each country. Given the current amount at a given time, what can a person in each nation purchase with that money? To implement this, I can use the [Numbeo Database]( https://www.numbeo.com/cost-of-living/prices_by_country.jsp), which lists the prices of various goods across multiple countries. Alternatively, I might list the actual currency exchange rate or simply the yearly salary.

