const api_base_url = 'https://api.noroff.dev';
const register = document.getElementById("register");
const registerUrl = `${api_base_url}/api/v1/social/auth/register`;
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
    if (response.status === 201) {
      setTimeout(()=> {
        location.href = "/index.html";
     } ,3000);
      console.log("Registration success");
    } else {
      console.log("Could not registrate new user");
    } return false;
  } catch(error) {
    console.log(error);
  }

}

register.onclick = function (ev) {
  ev.preventDefault()
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value.toLowerCase();
  let password = document.getElementById("password").value;

const userToRegister = {
  name: name, 
  email: email,
  password: password,
  }
  registerUser(registerUrl, userToRegister)
}