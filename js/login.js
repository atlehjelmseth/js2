const api_base_url = 'https://api.noroff.dev';
const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const login = document.getElementById("login");
const wrong = document.querySelector(".wrongemailpassword");
const postsUrl = `${api_base_url}/api/v1/social/posts`


/* User login and set get/store token */

/**
 * 
 * @param {string} url 
 * @param {any} userData 
 * @param {POST} method
 *``` JS 
 * loginUser(url, userData)
 */

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
    const json = await response.json();
    const accessToken = json.accessToken;
    const userEmail = json.email;
    const userName = json.name;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', userEmail);
    localStorage.setItem('name', userName);
  } catch (error) {
    console.log(error);
  } 
}

/* Get request with bearer token */

/**
 * 
 * @param {string} url 
 * @param {GET} method 
 * ``` JS
 * getWithToken(url, method = 'GET')
 */

async function getWithToken(url, method = 'GET') {
  wrong.innerHTML = '';
  try {
    const token = localStorage.getItem('accessToken');
    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const response = await fetch(url, fetchOptions);

    const json = await response.json();
    console.log(json); 
    if (response.status === 200) {
      location.href = "/profile.html";
      console.log("Login success");
    } else {
      wrong.innerHTML += `<p class="error">Wrong email or password, please try again</p>`;
    } return false;
  } catch(error){
    console.log(error);
  }
}


/* Login from button */

/**
 * 
 * @param {string} userToLogin 
 * ```JS
 * Onclick login
 */

login.onclick = function (ev) {
  ev.preventDefault()

  let email = document.getElementById("email").value.toLowerCase();
  let password = document.getElementById("password").value;

const userToLogin = {
  email: email,
  password: password,
  }
  localStorage.setItem('password', password);
  loginUser(loginUrl, userToLogin),
  setTimeout(()=> {
    getWithToken(postsUrl)
 } ,500);

}

function clearOutStorage() {
  localStorage.clear();
}

clearOutStorage()