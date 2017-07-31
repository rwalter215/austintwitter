import sys
import os
import time
import json
import tweepy
import MySQLdb
from dateutil import parser
from ConfigParser import ConfigParser

config = ConfigParser()
config.read('./collectors.conf')

CONSUMER_KEY = config.get('Twitter', 'CONSUMER_KEY')
CONSUMER_SECRET = config.get('Twitter', 'CONSUMER_SECRET')
ACCESS_TOKEN = config.get('Twitter', 'ACCESS_TOKEN')
ACCESS_TOKEN_SECRET = config.get('Twitter', 'ACCESS_TOKEN_SECRET')

HOST = config.get('MySQL', 'HOST')
USER = config.get('MySQL', 'USER')
PASSWD = config.get('MySQL', 'PASSWD')
DATABASE = config.get('MySQL', 'DATABASE')
PORT = config.get('MySQL', 'PORT')

# This function takes the 'created_at', 'text', 'screen_name' and 'tweet_id' and stores it
# into a MySQL database
def store_data(tweet_id, screen_name, created_at, lat, lon, text):
    db=MySQLdb.connect(host=HOST, user=USER, passwd=PASSWD, db=DATABASE, charset="utf8mb4")
    cursor = db.cursor()
    if (lat is not None):
        insert_query = "INSERT INTO tweets (tweet_id, screen_name, created_at, lat, lon, text) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (tweet_id, screen_name, created_at, lat, lon, text))
    else:
        insert_query = "INSERT INTO tweets (tweet_id, screen_name, created_at, lat, lon, text) VALUES (%s, %s, %s, NULL, NULL, %s)"
        cursor.execute(insert_query, (tweet_id, screen_name, created_at, text))
    db.commit()
    cursor.close()
    db.close()
    return


class StreamListener(tweepy.StreamListener):

    def on_connect(self):
        # Called initially to connect to the Streaming API
        print("You are now connected to the streaming API.")

    def on_data(self, tweet):
        try:
            # Decode the JSON from Twitter
            data = json.loads(tweet)
            # Grab the wanted data from the Tweet
            tweet_id = data['id']
            screen_name = data['user']['screen_name']
            created_at = parser.parse(data['created_at']).strftime("%Y-%m-%d %H:%M:%S")
            if data['coordinates'] is not None:
                lat = data['coordinates']['coordinates'][1]
                lon = data['coordinates']['coordinates'][0]
            else:
                lat = lon = None
            text = data['text']
            #print out a message to the screen that we have collected a tweet
            print ("Tweet collected at %s") % (str(created_at))

            #insert the data into the MySQL database
            store_data(tweet_id, screen_name, created_at, lat, lon, text)
        except Exception as e:
            print e


    def on_status(self, status):
        if '' in status.text.lower():
            print status.text

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True  # Don't kill the stream

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True  # Don't kill the stream

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
#Set up the listener. The 'wait_on_rate_limit=True' is needed to help with Twitter API rate limiting.
listener = StreamListener(api=tweepy.API(wait_on_rate_limit=True)) 
streamer = tweepy.Stream(auth=auth, listener=listener)
streamer.filter(locations=[-97.942469, 30.130679, -97.578106, 30.513139], track=[''])
