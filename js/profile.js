const userNameLocal = localStorage.getItem('name');
const api_base_url = 'https://api.noroff.dev';
const postsUrl = `${api_base_url}/api/v1/social/posts`
const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const userPostsUrl = `${api_base_url}/api/v1/social/profiles/${userNameLocal}/posts`;
const profileInformation = document.querySelector(".profile-information");
const userPosts = document.getElementById("userposts");
const token = localStorage.getItem('accessToken');
const submit = document.querySelector('.submit');
const userFeed = document.getElementById("userfeed");
const search = document.querySelector(".search");


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
    profileInformation.innerHTML += `<p class="name">Name: ${userName}</p>
                                     <p class="email">Email: ${userMail}</p> `;
  } catch (error) {
    console.log(error);
  }

}

loginUser(loginUrl, userToLogin)

/* Add Token and list all posts */
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
      if (i === 10) { break; }
      const feedTitles = jsonToken[i].title;
      const feedPosts = jsonToken[i].body;

      userFeed.innerHTML += `<div class="feedpost"><p>Title: ${feedTitles}</p><p>Text: ${feedPosts}</p></div>`
    }
  } catch(error){
    console.log(error);
  }
}

getWithToken(postsUrl)


/* Load the users posts & make delete, update and like-buttons*/

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
      if (i === 5) { break; }
      let postTitle = jsonPosts[i].title;
      let postText = jsonPosts[i].body;
      var postId = jsonPosts[i].id;
      var postLike = jsonPosts[i]._count.reactions;

      console.log(postId)
      console.log(postLike)

      var deleteUrl = postsUrl+`/${postId}`;
      console.log(deleteUrl);

      userPosts.insertAdjacentHTML("beforeend", `<div class="post"><p>${postTitle} ID: ${postId}</p>
      <p>${postText}</p><br><p>Number of likes: ${postLike}</p>`);

      const makeDeleteButton = document.createElement("button");
      makeDeleteButton.innerText = `Delete`;
      makeDeleteButton.setAttribute("id", "deletepost");

      const makeUpdateButton = document.createElement("button");
      makeUpdateButton.innerText = `Update`;
      makeUpdateButton.setAttribute("id", "updatepost");

      const makeLikeButton = document.createElement("button");
      makeLikeButton.innerText = `👍`;
      makeLikeButton.setAttribute("id", "likepost");

      function deleteFunction(postId) {
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

      function updateFunction(postId) {
        makeUpdateButton.addEventListener("click", function() {
          console.log(postId)
          const updatePost = {
          method: 'PUT',
          body: JSON.stringify({
            title: 'Updated ',
            body: 'This text is updated',
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`
          },
        };
        fetch(`${postsUrl}/${postId}`, updatePost)
          .then((response) => response.json())
          .then((json) => console.log(json));
          setTimeout(()=> {
            location.reload()
         } ,500);
        })
      }

      function likeFunction(postId) {
        makeLikeButton.addEventListener("click", function() {
          console.log(postId)
          const likePost = {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          },
        };
        console.log(`${postsUrl}/${postId}/react/👍`)
        fetch(`${postsUrl}/${postId}/react/👍`, likePost)
          .then((response) => response.json())
          .then((json) => console.log(json));
          setTimeout(()=> {
            location.reload()
         } ,500);
        })
      }


      deleteFunction(postId);
      updateFunction(postId);
      likeFunction(postId);

      userPosts.appendChild(makeDeleteButton);
      userPosts.appendChild(makeUpdateButton);
      userPosts.appendChild(makeLikeButton);
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


/* Search bar */

search.onkeyup = async function (event) {
  try {
    const searchPosts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(postsUrl, searchPosts);
    const results = await response.json();
    console.log(results);

    const searchValue = event.target.value.toLowerCase();

    const searchResults = results.filter(function (test) {
      if (test.title.toLowerCase().includes(searchValue)) {
          return true;
      }
  });

  userFeed.innerHTML = "";

  for(let i = 0; i < searchResults.length; i++){
    if (i === 10) { break; }
    const feedTitle = searchResults[i].title;
    const feedText = searchResults[i].body;

    console.log(feedTitle);
    console.log(feedText);
    userFeed.innerHTML += `<div class="feedpost"><p>Title: ${feedTitle}</p><p>Text: ${feedText}</p></div>`;
  }


  }catch{
    console.log("error");
  }

}

/* Filter */

const selectFilter = document.getElementById("filter");

selectFilter.addEventListener('change', async function() {

    try {
    const filterPosts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(postsUrl, filterPosts);
    const results = await response.json();
    console.log(results);


  userFeed.innerHTML = "";
  
  if(selectFilter.value === "last") {
  for(let i = 0; i < results.length; i++){
    
    if (i === 10) { break; }
    results.sort(
      function(a,b){
          if(a.id > b.id){
              return 1;
          }
          else if(a.id < b.id){
              return -1;
          }
          else {
              return 0;
          }

      }
  )
  console.log(results[i].id);

  userFeed.innerHTML += `<div class="feedpost"><p>Title: ${results[i].title}</p><p>Text: ${results[i].body}</p></div>`;
  }

} else {

  for(let i = 0; i < results.length; i++){
    if (i === 10) { break; }
    results.sort(
      function(a,b){
          if(a.id < b.id){
              return 1;
          }
          else if(a.id > b.id){
              return -1;
          }
          else {
              return 0;
          }

      }
  )
  console.log(results[i].id);

  userFeed.innerHTML += `<div class="feedpost"><p>Title: ${results[i].title}</p><p>Text: ${results[i].body}</p></div>`;
  }
}

  }catch{
    console.log("error");
  }


  console.log(`Value is  ${selectFilter.value}`);
})