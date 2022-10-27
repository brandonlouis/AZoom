const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        if (entry.isIntersecting) { // If the element is visible
            entry.target.classList.add('animateScrollUp'); // Add the animation class
            observer.unobserve(entry.target); // Stops observing to preserve memory
        }
    });
});
  
document.querySelectorAll('.animateOnScroll').forEach(element => {
    observer.observe(element);
});

function dropDownNav() {
    const modalNavContainer = document.getElementById("modalNavContainer");
    if (modalNavContainer.style.display == "") {
        modalNavContainer.style.display = "flex";
    } else {
        modalNavContainer.style.display = "";
    }
}

// Login and Credit card popup; Closes form when user clicks outside of it.
window.onclick = function closeModal(event) {
    if (event.target == document.getElementById("loginPopup")) {
        document.getElementById("loginPopup").style.display = "none";
    }

    if (event.target == document.getElementById("creditCardPopup")) {
        document.getElementById("creditCardPopup").style.display = "none";
    }
}

// Login credentials and catching
document.getElementById("loginBtn").addEventListener("click", (e) => {
    const loginForm = document.getElementById("loginContent");
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    if (username === "Bob" && password === "123") { // Username and password
        alert("Welcome "+ username + ", you have successfully logged in.");
        document.cookie = "username=" + username + "; path=/"; // Sets path to be default, allows deleting of this cookie from any pages
        document.getElementById("loginPopup").style.display = "none";
        location.reload();
    } else {
        e.preventDefault();
        document.getElementById("invalidLogin").style.display = "block";
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
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
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
    if (loggedUserCookie != "") {
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
        document.getElementById("loginPopup").style.display="block";
    }
}

// Subscribe to newsletter button
function newsletterSubscribe() {
    if (document.getElementById("newsletterForm").checkValidity()) {
        alert("Thank you for signing up for our newsletter!");
    }
}

// Continue to reservation button
document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("creditCardPopup").style.display = "block";
})


// Credit card validation
const cardNumber = document.getElementById("cardNumber");
let visa = document.getElementById("visa");
let mastercard = document.getElementById("mastercard");
let amex = document.getElementById("amex");
cardNumber.onkeyup = function() {

    visa.classList.add("transparent");
    mastercard.classList.add("transparent");
    amex.classList.add("transparent");

    var visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var masterRegEx = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
    var amexRegEx = /^3[47][0-9]{13}$/;
    
    if (cardNumber.value.replace(/\s/g, "").match(visaRegEx)) { // Toggles respective card that has been keyed in, based on regex
        visa.classList.remove("transparent");
    } else if (cardNumber.value.replace(/\s/g, "").match(masterRegEx)) {
        mastercard.classList.remove("transparent");
    } else if (cardNumber.value.replace(/\s/g, "").match(amexRegEx)) {
        amex.classList.remove("transparent");
    }
}


// Reservation confirmed
document.getElementById("creditCardContent").addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (visa.classList.contains("transparent") && mastercard.classList.contains("transparent") && amex.classList.contains("transparent")) {
        alert("Please check your card details.")
    } else {
        document.getElementById("successPage").style.display= "flex";

        var timeleft = 10;
        var downloadTimer = setInterval(function(){
            if(timeleft < 0){
                clearInterval(downloadTimer);
                window.location.href = "../html/howto.html";
            } else {
                document.getElementById("redirectCD").innerHTML = timeleft;
            }
            timeleft -= 1;
        }, 1000);
    }
})