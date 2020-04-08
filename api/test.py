import re

# text = ["http://127.0.0.1:5454/author/de305d54-75b4-431b-adb2-eb6b9e546013",
# 		"http://127.0.0.1:5454/author/ae345d54-75b4-431b-adb2-fb6b9e547891",]
text = "https://cmput404-socialdistribution.herokuapp.com/posts/da61a3f4-8cfb-4046-881f-50e12bfb4a4d"

# for t in text:
r = re.findall(r"(https?://[-A-Za-z0-9+&@#%?=~_|!:,.;]+/)?", text, re.I)
print(r[0])

test2 = "Github Activity"
print("github" not in test2.lower())