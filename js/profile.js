const api_base_url = 'https://api.noroff.dev';
const postsUrl = `${api_base_url}/api/v1/social/posts`
const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const userPosts = `${api_base_url}/api/v1/social/profiles/${userName}/posts`;
const profileInformation = document.querySelector(".profile-information");


const userToLogin = {
  email: localStorage.getItem('email'),
  password: localStorage.getItem('password'),
  }


async function loginUser(url, userData) {
  try {
    const postData = {
      method: 'POST',
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
    console.log(userPosts)
  } catch (error) {
    console.log(error);
  }
  
}

loginUser(loginUrl, userToLogin)

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
      console.log(jsonToken[i].title);
    }
  } catch(error){
    console.log(error);
  }
}

getWithToken(postsUrl)

