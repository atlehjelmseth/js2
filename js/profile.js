const userNameLocal = localStorage.getItem('name');
const api_base_url = 'https://api.noroff.dev';
const postsUrl = `${api_base_url}/api/v1/social/posts`
const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const userPostsUrl = `${api_base_url}/api/v1/social/profiles/${userNameLocal}/posts`;
const profileInformation = document.querySelector(".profile-information");
const userPosts = document.querySelector(".userposts");
const token = localStorage.getItem('accessToken');
const submit = document.querySelector('.submit');
const deletePost = document.querySelector('.delete');

console.log(userNameLocal);

const userToLogin = {
  email: localStorage.getItem('email'),
  password: localStorage.getItem('password'),
  }

/* Login user */
async function loginUser(url, userData, method = 'POST') {
  try {
    const postData = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    let userName = json.name;
    let userMail = json.email;
    profileInformation.innerHTML += `<p>Name: ${userName}</p>
                                     <p>Email: ${userMail}</p> `;
  } catch (error) {
    console.log(error);
  }
  
}

loginUser(loginUrl, userToLogin)

/* Add Token and list posts */
async function getWithToken(url, method = 'GET') {
  try {
    console.log(url);
    const token = localStorage.getItem('accessToken');
    console.log(token);
    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchOptions);
    const jsonToken = await response.json();
    console.log(jsonToken); 
    for(let i = 0; i < jsonToken.length; i++) {
      // console.log(jsonToken[i].title);
    }
  } catch(error){
    console.log(error);
  }
}

getWithToken(postsUrl)


/* Load the users posts `*/

async function loadUserPosts(url, method = 'GET') {
  try {
    console.log(url);
    const fetchPosts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchPosts);
    const jsonPosts = await response.json();
    console.log(jsonPosts); 
    for(let i = 0; i < jsonPosts.length; i++) {
      let postTitle = jsonPosts[i].title;
      let postText = jsonPosts[i].body;
      userPosts.innerHTML += `<div class="post"><div>${postTitle}</div>
      <div>${postText}</div><button class="delete">Delete post</button></div> `;
    }

  } catch(error){
    console.log(error);
  }
}

loadUserPosts(userPostsUrl)


/* Send comment */
  
submit.onclick = function (ev) {

  const date = new Date();
  let currentDate = date.toJSON();
  let postTitle = (currentDate.slice(0,10));
  let postTekst = document.getElementById("your-comment").value;


  ev.preventDefault()
const requestOptions = {
  method: 'POST',
  body: JSON.stringify({
    title: `${postTitle}`,
    body: `${postTekst}`,
  }),

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: `Bearer ${token}`
  },
};
fetch(postsUrl, requestOptions)
  .then((response) => response.json())
  .then((json) => console.log(json));
  setTimeout(()=> {
    location.reload()
 } ,500);
}

/* Delete post */


async function deletePosts(url, method = 'GET') {
  try {
    console.log(url);
    const fetchPosts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchPosts);
    const jsonPosts = await response.json();
    console.log(jsonPosts); 
    for(let i = 0; i < jsonPosts.length; i++) {
      console.log(jsonPosts[i].id);
    }

  } catch(error){
    console.log(error);
  }
}

deletePosts(userPostsUrl)
