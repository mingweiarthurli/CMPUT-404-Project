import "react";

// This is the updated API fetching location.
var host = "http://cmput-404-project.herokuapp.com/api/";
var althost = "http://cmput-404-project.herokuapp.com/auth/";

//The address of each url is specified in the return statement, they are expected to match the backend services.
//--------------------------------------AUTH-----------------------------------------------------------------------
export const authRegister = () => {
  return `${althost}register`;
};
//POST: add a new user to db => {email, username, password}

export const authLogin = () => {
  return `${host}login`;
};
//POST: log user in => {email, username, password}

export const authLogout = () => {
  return `${host}logout/`;
};
//POST: clear csrf and logout => {}

export const currentUser = () => {
  return `${host}currentuser/`;
};
//GET: returns current user

export const passwordChange = () => {
  return `${althost}password/change/`;
};
//POST: changes password

export const passwordReset = () => {
  return `${althost}password/reset/`;
};
//POST: reset password

export const passwordResetConfirm = () => {
  return `${althost}password/reset/confirm/`;
};
//POST: confirm reset password
//-----------------------------------------------------------------------------------------------------------------
//------------------------------------------AUTHOR-----------------------------------------------------------------
export const allUsers = () => {
  return `${host}author/`;
};
//GET: all of the users

export const idUsers = (uid) => {
  return `${host}author/${uid}/`;
};
//GET: return the user with {uid}
//PUT: update the user with {uid} => {host, github, email, bio} *************
//DELETE: delete the user with {uid}
//-----------------------------------------------------------------------------------------------------------------
//------------------------------------------FRIENDSHIPS (MASTER)---------------------------------------------------
export const checkFriendships = (uid, uid2) => {
  return `${host}author/${uid}/friends/${uid2}`;
};
//GET: checks whether two authors are friends or not.

export const allFriendRequests = () => {
  return `${host}friendrequest/`;
};
//GET: return all records of friendrequests (of any authors)
//POST: makes new follow request to be approved => basic_auth, {followee_info as "author", follower_info as "friend"}
//-----------------------------------------------------------------------------------------------------------------
//------------------------------------------FRIENDSHIPS (UNIQUE)---------------------------------------------------
export const myFriends = (uid) => {
  return `${host}author/${uid}/friends/`;
};
//GET: returns a list of friends the {uid} author has
//POST: checks whether the authors in the list are friends with the specified user

export const myFollowers = (uid) => {
  return `${host}author/${uid}/followers/`;
};
//GET: returns any authors following {uid}

export const myFriendRequests = (uid) => {
  return `${host}author/${uid}/friendrequests/`;
};
//GET: returns any outgoing requests made by {uid} author

export const unfollowFriendRequests = (uid) => {
  return `${host}friendrequest/${uid}/unfollow`;
};
//DELETE: unfollow the {uid}

export const acceptFriendRequests = (uid) => {
  return `${host}friendrequest/${uid}/accept`;
};
//PUT: accept friend request => basic_auth, {request_id}

export const rejectFriendRequests = (uid) => {
  return `${host}friendrequest/${uid}/reject`;
};
//PUT: reject friend request => basic_auth, {request_id}
//-----------------------------------------------------------------------------------------------------------------
//----------------------------------------------POSTS--------------------------------------------------------------
export const defaultVisiblePosts = () => {
  return `${host}author/posts`;
};
//GET: return all posts visible to currently authenticated author

export const idVisiblePosts = (uid) => {
  return `${host}author/${uid}/posts`;
};
//GET: return all posts visible to author with the given {uid}

export const publicPosts = () => {
  return `${host}posts/`;
};
//GET: return all 'public' posts.
//POST: create new post => {content, origin_post, text_type, visibility, unlist}

export const idPosts = (id) => {
  return `${host}posts/${id}/`;
};
//GET: return the post with {pid} if it is viewable to authenticated user
//PUT: updates the post with {pid}
//DELETE: delete a post with {pid}

export const idPostComments = (id) => {
  return `${host}posts/${id}/comments`;
};
//GET: return the comments associated with that post.
//POST: adda new comment for that post.

//-----------------------------------------------------------------------------------------------------------------

/*//Set localhost addresses. Use the following addresses if you are testing locally.
var location = window.location;
var protocol = location.protocol;
var host = protocol.concat(`//${location.host}/api/`).replace("3000", "8000");
var althost = protocol
  .concat(`//${location.host}/auth/`)
  .replace("3000", "8000");*/
