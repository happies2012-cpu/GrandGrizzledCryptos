#get API key as a secret
import os
my_secret = os.environ['COHERE_API_KEY']

#import Cohere & input API key
import cohere
co = cohere.Client(my_secret)

#command model to write story
response = co.generate(
  prompt=
"Write an inspiring short story about a young person learning how to code using Replit.",
  max_tokens=850)

#display story
print(response)

#hello! if you would like to fork, you can get your own free API key here: https://dashboard.cohere.ai/welcome/register?utm_source=other&utm_medium=social&utm_campaign=nicks-repl
