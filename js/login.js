const api_base_url = 'https://api.noroff.dev';


// email: 'atleSecondTest@noroff.no',
// password: 'TrustNo1',

const loginUrl = `${api_base_url}/api/v1/social/auth/login`
const login = document.getElementById("login");




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
    console.log(json);
    const accessToken = json.accessToken;
    localStorage.setItem('accessToken', accessToken)
  } catch (error) {
    console.log(error);
  }
  
}

// loginUser(loginUrl, userToLogin);

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

    const json = await response.json();
    console.log(json); 
    if (response.status === 200) {
      location.href = "/profile.html";
      console.log("Login success");
    } else {
      console.log("Could not log in");
    } return false;
  } catch(error){
    console.log(error);
  }
}

const postsUrl = `${api_base_url}/api/v1/social/posts`

// getWithToken(postsUrl);

login.onclick = function (ev) {
  ev.preventDefault()

  let email = document.getElementById("email").value.toLowerCase();
  let password = document.getElementById("password").value;

const userToLogin = {
  email: email,
  password: password,

  }
  loginUser(loginUrl, userToLogin),
  setTimeout(()=> {
    getWithToken(postsUrl)
 } ,3000);

}

function clearOutStorage() {
  localStorage.clear();
}

clearOutStorage()