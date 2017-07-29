
import sys
import tweepy
import time
from tweepy.streaming import json

consumer_key = 'ACvrIpmXy2hC6bqJqdLZBIQmv'
consumer_secret = 'Z6erz8fCjnfGy6kGQehmuqrXv4h533Ctd8qtjuWXpk6v6cc2WS'
access_token = '532386365-3F8ekCprgc1TGKghu5sE0J4STcDZGb3RIMF0xhkR'
access_token_secret = 'nY3HLrpM8AeEZQ8fHezKuBdkUluRYb7Y4gDInmRBjsUBv'

# initialize blank list to contain tweets
tweets = []
# file name that you want to open is the second argument
save_file = open('Austin.json', 'a')
runtime = 15 # this means one minute

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)


class CustomStreamListener(tweepy.StreamListener):
    def __init__(self):
        super(tweepy.StreamListener, self).__init__()

        self.save_file = tweets

    def on_data(self, tweet):
        self.save_file.append(json.loads(tweet))
        print tweet
        save_file.write(tweet)

    def on_status(self, status):
        if '' in status.text.lower():
            print status.text

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True  # Don't kill the stream

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True  # Don't kill the stream


sapi = tweepy.streaming.Stream(auth, CustomStreamListener())
sapi.filter(locations=[-96.6221, 29.6019, -96.0042, 30.0968], track=[''], async=True)
# sapi.filter(track=['twitter'], async=True) # apply any filter you want
time.sleep(runtime) # halts the control for runtime seconds

sapi.disconnect() # disconnect the stream and stop streaming


