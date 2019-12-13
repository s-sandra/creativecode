import random
import re
from string import punctuation
import markovify
from textblob import TextBlob
import collections
import nltk
nltk.download('punkt')

file = open("cm_poems.txt", encoding="utf-8-sig")
text = file.read()
file.close()

sentences = text.split('\n')  # remove newlines
sentences = ".".join(sentences)  # replace newlines with periods
sentences = " ".join(sentences.split())  # removes extra whitespace
sentences = sentences.split('.')  # split text into sentences
tokens = []
poems = []

for sentence in sentences:
    sentence = sentence.strip()
    if sentence and sentence != "”" and sentence != "“":
      if sentence[-1] not in ":;,?!”—-…":
        sentence += "."
      tokens.extend(sentence.lower().split(" "))
      poems.append(sentence)

poems = " ".join(poems)

blob = TextBlob(poems)
model = markovify.Text(poems)

def shorten(line):

  if len(line.split(" ")) > 10:

    tokens = re.findall(r"[\w']+|[.,!?;]", line)
    line = []
    for token in tokens:
      if token not in punctuation:
        line.append(token)
      else:
        break
    
    line = " ".join(line)
    line += "."

  return line

SPACES = "          "
print(SPACES + "The Collective Mind\n" + SPACES + "by Brooke Point High School and a Markov chain\n")
line = blob.sentences[random.randint(0, len(blob.sentences) - 1)]

line = shorten(str(line))

for i in range(5):
    print(SPACES[:-4] + "CM: " + line)
    previous_speaker = 0

    for i in range(3):
      choice = random.choice([0, 1])

      # generate sentence using Markov chain
      if choice == 1:
        sentence = model.make_sentence()

        # generate sentence less than 15 words long
        while not sentence or (sentence and len(sentence.split(" ")) > 15):
          sentence = model.make_sentence()

        if previous_speaker == 0:
          print(SPACES[:-8] + "MARKOV: " + sentence)
        else:
          print(SPACES + sentence)
        previous_speaker = 1

      # pull sentence from corpus
      else:
        sentence = blob.sentences[random.randint(0, len(blob.sentences) - 1)]
        if previous_speaker == 1:
          print(SPACES[:-4] + "CM: " + shorten(str(sentence)))
        else:
          print(SPACES + shorten(str(sentence)))

    print("\n")