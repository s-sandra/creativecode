# Someone Bot
Handle: [@someonebot2](https://twitter.com/SomeoneBot2)<br>
Source: [CBDQ](https://cheapbotsdonequick.com/source/SomeoneBot2)

## Description
[“Someone Bot”]( https://twitter.com/SomeoneBot2) is a Twitter bot created using [Cheap Bots Done Quick]( https://cheapbotsdonequick.com/) that posts a randomly generated sentence every three hours. Each sentence describes an object that someone bought from a well-known superstore or e-commerce site, and the price that they paid for it. Posts are all generated according to a [Tracery]( http://tracery.io/) grammar, and are not based on real data. However, the objects used in my generative model were obtained from Darius Kazemi’s excellent corpora [objects corpus]( https://github.com/dariusk/corpora/blob/master/data/objects/objects.json), with my own edits and additions.

### Permutations
Someone Bot (as of December 2019) can generate eight quadrillion unique posts. This includes ten exclamations, 380 items, fifteen stores, 964 professions, 395 names and 154,900 possible prices.

## Inspiration
My brother originally gave me the idea for Someone Bot when he suggested that I post items sold for the highest prices on Craigslist. I felt drawn to the concept, seeing that many of us are guilty of the occasional shopping splurge. It reminded me of those DealDash commercials, where users brag about the items they bought and their prices. While the bot’s output is certainly humorous, it also draws attention to issues of materialism and obsessive consumerism. Do we really need that extra china set just because it was on sale? How much are we actually willing to pay for a gallon of water? Is an expensive object inherently better? Are prices that seem absurd actually viable in a different place or time? 

## Process
Due to time constraints, I decided against building my Twitter bot through Tweepy, since I didn’t want to deal with APIs or potential screen scraping. Also, I felt that if I used real consumer data, readers might assume that the bot was mocking certain people or endorsing particular stores. Instead, I went the generative grammar route, which allowed me to produce more hyperbolized messages. In the end, though, I found that the bot’s tweets were so specific that people actually mistook them for reality!

### Revisions
#### Version 1
During development, I originally included a list of professions along with stores and items, but I decided to omit them (and not just because it allowed me to name my bot “Someone Bot”). I felt that pairing the items and prices with particular kinds of people might produce an accidentally offensive post, such as an insinuation about a group’s affluence or shopping habits. Generalizing the consumer as “someone” makes the bot’s sentences more relatable.

Instead of building a list of items from scratch (as I had done initially), I ended up borrowing one of Kazemi’s corpuses from his corpora repo, which was very helpful. I looked over his data manually, deleting items that were plural (since my grammar only worked with singular objects) and adding my own ideas. For example, I included “sports car,” “yacht,” and “sprinkler system,” which were not included in the original corpus.

To automate price listings for my grammar, I created a Python script to write a series of numbers in json format to a file, one for dollars, and one for cents. Originally, I included all numbers between 0 and 50,000, but that quickly became unwieldly and consistently produced ridiculously enormous prices. Instead, I printed only numbers divisible by 1000, except those below 300, which were all included. Finally, I wanted my bot to generate smaller prices more often (because my peers suggested that my prices were consistently *too* big), so I had my script repeat all numbers below 300 five times, in order to skew the odds.

#### Version 2
To make SomeoneBot more uncanny and humorous, I updated its Tracery code to include the professions of the purchasers, and added different templates to vary the sentence structure of the posts. To add realism, I gave first names to the anonymous “someones,” seeing that the generated tweets were not descriptive or serious enough to cause offense. However, I didn’t delete the old template entirely. It is still possible for the bot to talk about a vague “someone.” In addition to new stores and products, I also included exclamations that congratulate or question the purchase. Occasionally, the randomly selected punctuation does not fit logically with the exclamation, but I feel that such tiny errors give the bot character.

