// Login popup; Closes form when user clicks outside of it.
window.onclick = function closeLogin(event) {
    if (event.target == document.getElementById('loginPopup')) {
        document.getElementById('loginPopup').style.display = "none";
    }
}

// Login credentials and checking
document.getElementById("loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("loginContent");
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "Bob" && password === "123") {
        alert("You have successfully logged in.");
        document.getElementById('loginPopup').style.display = "none";
    } else {
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