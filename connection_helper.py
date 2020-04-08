import requests
import re
from collections import OrderedDict
from django.db.models import Q
from config.settings import DEFAULT_HOST
from friends.models import Friend
from hosts.models import Host

server_list = ["https://spongebook-develop.herokuapp.com/", ]

def remote_login(host, username, password):
    r = requests.post(host, verify=False, json={"email": username, "password": password})
    if r.status_code == 200:
        return r.json()['key']
    else:
        return False

def get_remote_users():
    pass

def get_remote_posts():
    returned_posts = []
    hosts = Host.objects.all()

    for host in hosts:
        r = requests.get(host.baseURL + "author/posts", auth=(host.username, host.password), verify=False)
        if r.status_code == 200:
            content = r.json()
            num_posts = content["count"]
            posts = content["posts"]
            for post in posts:
                origin = re.findall(r"(https?://[-A-Za-z0-9+&@#%?=~_|!:,.;]+/)?", post["origin"], re.I)[0]
                if origin == host.baseURL and "github" not in post["title"].lower():      # only return the posts from the baseURL server and filter out Github activity
                    returned_posts.append(OrderedDict(post))

    return returned_posts

def get_remote_friends(host):
    r = requests.get(host, verify=False)

def check_friendship(host, userid_local, userid_remote):
    r = requests.get(host + "/author/" + userid_local + "/friends/" + userid_remote, verify=False)
    return r.json()["friends"]

def check_friend(user_url1, user_url2):
    user_id1 = re.findall(r"(https?://[-A-Za-z0-9+&@#%?=~_|!:,.;]+/)author/([-A-Za-z0-9]+)/?", user_url1, re.I)[0][1]
    user_id2 = re.findall(r"(https?://[-A-Za-z0-9+&@#%?=~_|!:,.;]+/)author/([-A-Za-z0-9]+)/?", user_url2, re.I)[0][1]
    for server in server_list:
        query = f"{server}author/{user_id1}/friends/{user_id2}"
        r = requests.get(query, verify=False)
        if r.json()["friends"] == "true":
            return True
    return False

def check_FOAF(user_url1, user_url2):       # user_url1 must belong to a local user
    user_parsed2 = re.findall(r"(https?://[-A-Za-z0-9+&@#%?=~_|!:,.;]+/)author/([-A-Za-z0-9]+)/?", user_url2, re.I)
    user_host2 = user_parsed2[0][0]
    user_id2 = user_parsed2[0][1]
    if user_host2 == DEFAULT_HOST:          # user2 is a local user
        user_friends1 = Friend.objects.filter(Q(followee_url=user_url1) & Q(mutual=True))
        user_friends2 = Friend.objects.filter(Q(followee_url=user_url2) & Q(mutual=True))
        for user_friend1 in user_friends1:
            for user_friend2 in user_friends2:
                # print(user_friend1.id, user_friend2.id)
                if user_friend1.follower_url == user_friend2.follower_url:
                    return True
        return False
    else:                                   # user2 is a remote user
        user_friends1 = Friend.objects.filter(Q(followee_url=user_url1) & Q(mutual=True))
        friend_list1 = []
        for user_friend1 in user_friends1:
            # friend_list1.append(f"{user_friend1.host}author/{user_friend1.id}")
            friend_list1.append(user_friend1.follower_url)
        request_data = {"query": "friends", "author": user_url1, "authors": friend_list1}
        r = requests.post(f"{user_host2}author/{user_id2}/friends", verify=False, json=request_data)
        response = r.json()
        if response["authors"]:     # check if list is empty
            return True
        else:
            return False

# def main():
#     # print(remote_login("http://127.0.0.1:8000/login/", "test1@gmail.com", "passqwer"))

#     #  post
#     # r = get_remote_posts("https://spongebook-develop.herokuapp.com")
#     # print(r["posts"])

#     # friend2friend
#     r = check_friendship("https://spongebook-develop.herokuapp.com", "13930e65-ca56-4743-ab8f-2dd6b45e2cb1", "49784bac-7e1d-43f4-a77d-761141c81f66")
#     print(r)

    # a = check_friend("http://127.0.0.1:5454/author/ae345d54-75b4-431b-adb2-fb6b9e547891", "http://127.0.0.1:5454/author/de305d54-75b4-431b-adb2-eb6b9e546013")
    # print(a)

    # a = check_FOAF("https://cmput-404-project.herokuapp.com/author/6fbb1f1f-d793-4e46-af23-776516890033", "https://spongebook-develop.herokuapp.com/author/03b92094-6f68-44a6-b6c4-4d5da8dec369")
    # print(a)

# main()