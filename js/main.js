// Login popup; Closes form when user clicks outside of it.
window.onclick = function closeLogin(event) {
    if (event.target == document.getElementById('loginPopup')) {
        document.getElementById('loginPopup').style.display = "none";
    }
}

// Login credentials and catching
document.getElementById("loginBtn").addEventListener("click", (e) => {
    const loginForm = document.getElementById("loginContent");
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "Bob" && password === "123") {
        alert("You have successfully logged in.");
        document.cookie = "username=" + username + "; path=/"; // Sets path to be default, allows deleting of this cookie from any pages
        document.getElementById('loginPopup').style.display = "none";
        location.reload();
    } else {
        e.preventDefault();
        document.getElementById("invalidLoginContainer").style.display = "block";
    }
})


// Remember me function for login
const rememberCB = document.getElementById("rememberMeCB"),
      rUsername = document.getElementById("usernameField");
if (localStorage.checkbox && localStorage.checkbox !== "") {
    rememberCB.setAttribute("checked", "checked");
    rUsername.value = localStorage.username;
} else {
    rememberCB.removeAttribute("checked");
    rUsername.value = "";
}

function rememberMe() {
    if (rememberCB.checked && rUsername.value !== "") {
      localStorage.username = rUsername.value;
      localStorage.checkbox = rememberCB.value;
    } else {
      localStorage.username = "";
      localStorage.checkbox = "";
    }
}


// Login cookie checker for each page to enable logout button
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function checkLogin() {
    let loggedUserCookie = getCookie("username");
    if (loggedUserCookie != '') {
        document.getElementById("navLoginBtn").value = "Logout";
    }
}


// Logout button
function loginLogoutTxt() {
    const loginLogoutBtn = document.getElementById("navLoginBtn").value;
    if (loginLogoutBtn === "Logout") {
        if (confirm("Are you sure you want to logout?")) {
            document.cookie = "username=; Max-Age=0; path=/"; // Standardizes deletion of cookie from path=/
            location.reload();
        }
    } else {
        document.getElementById('loginPopup').style.display='block';
    }
}