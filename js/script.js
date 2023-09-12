const api_base_url = 'https://api.noroff.dev';


/**
 * Register the user to the API
 * @param {string} url 
 * @param {any} userData 
 * ``` JS
 * registerUser(registerUrl, userToRegister);
 * ```
 */
async function registerUser(url, userData) {
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
  } catch(error) {
    console.log(error);
  }

}

const userToRegister = {
  name: 'AtleSecondTest',
  email: 'atleSecondTest@noroff.no',
  password: 'TrustNo1',
};

const registerUrl = `${api_base_url}/api/v1/social/auth/register`;


// registerUser(registerUrl, userToRegister);


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

const userToLogin = {
  email: 'atleSecondTest@noroff.no',
  password: 'TrustNo1',
};

const loginUrl = `${api_base_url}/api/v1/social/auth/login`

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
    console.log(response);
    const json = await response.json();
    console.log(json); 
  } catch(error){
    console.log(error);
  }
}

const postsUrl = `${api_base_url}/api/v1/social/posts`

getWithToken(postsUrl);