import random
from textblob import TextBlob
import nltk

file = open("cm_poems.txt", encoding="utf-8")
poems = file.read()
poems = poems.replace("\n",".\n") # adds extra period to all lines
file.close()

blob = TextBlob(poems)

# prints poem title and author
print("The Collective Mind\nby Brooke Point High School\n")
for i in range(10):
    line = blob.sentences[random.randint(0, len(blob.sentences) - 1)]
    line = str(line)
    
    # capitalizes and removes extra periods from all lines
    line = line[:1].capitalize() + line[1:].replace(".", "")
    
    # accounts for lines that are only periods
    if line == ".":
        line = " "
    
    if line[-1:] in "!?,;:":
        print(line[:-1]) # remove ending punctuation
    else:
        print(line)