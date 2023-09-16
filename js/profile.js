const userNameLocal = localStorage.getItem('name');
const api_base_url = 'https://api.noroff.dev';
const postsUrl = `${api_base_url}/api/v1/social/posts`
const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const userPostsUrl = `${api_base_url}/api/v1/social/profiles/${userNameLocal}/posts`;
const profileInformation = document.querySelector(".profile-information");
const userPosts = document.getElementById("userposts");
const token = localStorage.getItem('accessToken');
const submit = document.querySelector('.submit');


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
    }
  } catch(error){
    console.log(error);
  }
}

getWithToken(postsUrl)


/* Load the users posts & make delete and update-buttons*/

async function loadUserPosts(url) {
  try {
    console.log(url);
    const fetchPosts = {
      method: 'GET',
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
      var postId = jsonPosts[i].id;
      
      console.log(postId)

      var deleteUrl = postsUrl+`/${postId}`;
      console.log(deleteUrl);

      userPosts.insertAdjacentHTML("beforeend", `<div class="post"><div>${postTitle} ID: ${postId}</div>
      <div>${postText}</div><form>`);
      
      const makeDeleteButton = document.createElement("button");
      makeDeleteButton.innerText = `Delete`;
      makeDeleteButton.setAttribute("id", "deletepost");

      const makeUpdateButton = document.createElement("button");
      makeUpdateButton.innerText = `Update`;
      makeUpdateButton.setAttribute("id", "updatepost");
      
      function someFunc(postId) {
        makeDeleteButton.addEventListener("click", function() {
          console.log(postId)
          const deletePost = {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
          },
        };
        fetch(`${postsUrl}/${postId}`, deletePost)
          .then((response) => response.json())
          .then((json) => console.log(json));
          setTimeout(()=> {
            location.reload()
         } ,500);
        })
      }      

      someFunc(postId);

      userPosts.appendChild(makeDeleteButton);
      userPosts.appendChild(makeUpdateButton);      
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
