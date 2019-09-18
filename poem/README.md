# The Collective Mind

## Project Description
“The Collective Mind” is a poetry generator written in Python that randomly selects ten sentences from a corpus and combines them into one poem. The text was drawn from a big folder of poetry and prose submissions that I had received when I worked on the Collective Mind staff, Brooke Point High School’s literary and arts magazine. I was drawn to this text source not only because of its personal significance, but also because many submissions never made it to the final issue, or else remain undiscovered and obscure, compared to commonly borrowed works like “Pride and Prejudice” and “Moby Dick.” Publishing this project would, in a way, prolong the words of my childhood friends, who wanted to share their writing with others. In accordance with the Collective Mind’s theme, coalesce, I also thought it would be an intriguing exercise to combine all the accumulated works from my high school in order to reveal some shared style, influence, emotion, or soul. In fact, the resulting sentences, even when automated and pulled out of context, elicit beautiful, confusing, and at times, haunting imagery. I argue that this is exactly what good poetry ought to do.

## Process
In order to take advantage of the python library [TextBlob]( https://textblob.readthedocs.io/en/dev/install.html) to process my poems, I needed to combine the submissions into one corpus text. Since they were all Microsoft Word files, I had to install the [docx]( https://python-docx.readthedocs.io/en/latest/user/install.html) library in order to parse their file structures. I did not want to make all the submissions public, so the code won’t work on your computer, but if you’re curious, this is what I did to get all the text into one file.
```
import os
import docx

folder = "cm_submissions"
directory = os.fsencode(folder)
poems = open("poems.txt", "a", encoding="utf-8")

# function from "Automate the Boring Stuff" by Al Sweigart 
def getText(filename):
    doc = docx.Document(folder + "\\" + filename)
    fullText = []
    for paragraph in doc.paragraphs:
        fullText.append(paragraph.text)
    return '\n'.join(fullText)

for file in os.listdir(directory):
    filename = os.fsdecode(file)
    if filename.endswith(".docx"): 
        poem = getText(filename)
        poems.write(poem)
        
poems.close()
```
Afterwards, I examined the outputted corpus and manually deleted people’s names, so they wouldn’t appear in the generated poetry. After passing the file into TextBlob, I noticed that it often considered entire poems as sentences, because authors tended to omit punctuation altogether. To fix this problem, I added periods before newline characters so that TextBlob recognized them as sentences. Sometimes, this resulted in lines with trailing periods. Thus, before printing my poems, I modified the format of each line, making sure the first word was capitalized and that the line didn’t end in unneeded punctuation marks.

## Future Ideas for Revision
I initially had the idea to incorporate a rhyme scheme into my generated poems, just to give the random sentences a sense of unity. Due to time constraints, I was unable to implement this feature. However, during my research, I did discover an API called [Datamuse]( https://www.datamuse.com/api/) that can find perfect or near rhymes for words. It is also able to consider words with similar meanings or contexts, which can be useful for future projects. 

## Spooky Sample Output
Although random, the poetry outputted by my generator sometimes had a logical structure and even rhymed! Below is an example.
```
The Collective Mind
by Brooke Point High School

 
Her dull pearls and shredded lace
That blank picture you have starts to seem worthy 
Reading the words that were written 
I crumble-like a piece of paper
Watching the whole world move in slow-mo
But I know as well as He does that it’s not my time yet
All that's left is smoke curls
and I can’t move or run or flee but I must invite it back in me, 
I am your other half, the side no one wants to see
```
