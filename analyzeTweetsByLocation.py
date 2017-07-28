import json
from collections import Counter
import re

tweets_text = []
line_breakdown = []

with open('Austin.json') as data_file:
    for line in data_file:
        data = json.loads(line)
        # print data['text']
        tweets_text.append(data['text'])


for line in tweets_text:
    print line
    words = re.findall('\w+', line)

    print Counter(words).most_common(10)
    print ' '

for line in tweets_text:
    print line
