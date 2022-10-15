// Login popup; Closes form when user clicks outside of it.
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

    if (username === "Bob" && password === "123") {
        alert("Welcome "+ username + ", you have successfully logged in.");
        document.cookie = "username=" + username + "; path=/"; // Sets path to be default, allows deleting of this cookie from any pages
        document.getElementById("loginPopup").style.display = "none";
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


// Proceed to reservation button
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
                window.location.href = "../html/about.html";
            } else {
                document.getElementById("redirectCD").innerHTML = timeleft;
            }
            timeleft -= 1;
        }, 1000);
    }
    
})


// canvas = document.getElementById("canvas");
// ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// cx = ctx.canvas.width/2;
// cy = ctx.canvas.height/2;

// let confetti = [];
// const confettiCount = 100;
// const gravity = 0.5;
// const terminalVelocity = 5;
// const drag = 0.075;
// const colors = [
//   { front : "red", back: "darkred"},
//   { front : "green", back: "darkgreen"},
//   { front : "blue", back: "darkblue"},
//   { front : "yellow", back: "darkyellow"},
//   { front : "orange", back: "darkorange"},
//   { front : "pink", back: "darkpink"},
//   { front : "purple", back: "darkpurple"},
//   { front : "turquoise", back: "darkturquoise"},
// ];

// //-----------Functions--------------
// resizeCanvas = () => {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	cx = ctx.canvas.width/2;
// 	cy = ctx.canvas.height/2;
// }

// randomRange = (min, max) => Math.random() * (max - min) + min

// initConfetti = () => {
//   for (let i = 0; i < confettiCount; i++) {
//     confetti.push({
//       color      : colors[Math.floor(randomRange(0, colors.length))],
//       dimensions : {
//         x: randomRange(10, 20),
//         y: randomRange(10, 30),
//       },
//       position   : {
//         x: randomRange(0, canvas.width),
//         y: canvas.height - 1,
//       },
//       rotation   : randomRange(0, 2 * Math.PI),
//       scale      : {
//         x: 1,
//         y: 1,
//       },
//       velocity   : {
//         x: randomRange(-25, 25),
//         y: randomRange(0, -50),
//       },
//     });
//   }
// }

// //---------Render-----------
// render = () => {  
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//   confetti.forEach((confetto, index) => {
//     let width = (confetto.dimensions.x * confetto.scale.x);
//     let height = (confetto.dimensions.y * confetto.scale.y);
    
//     // Move canvas to position and rotate
//     ctx.translate(confetto.position.x, confetto.position.y);
//     ctx.rotate(confetto.rotation);
    
//     // Apply forces to velocity
//     confetto.velocity.x -= confetto.velocity.x * drag;
//     confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
//     confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    
//     // Set position
//     confetto.position.x += confetto.velocity.x;
//     confetto.position.y += confetto.velocity.y;
    
//     // Delete confetti when out of frame
//     if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

//     // Loop confetto x position
//     if (confetto.position.x > canvas.width) confetto.position.x = 0;
//     if (confetto.position.x < 0) confetto.position.x = canvas.width;

//     // Spin confetto by scaling y
//     confetto.scale.y = Math.cos(confetto.position.y * 0.1);
//     ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
     
//     // Draw confetto
//     ctx.fillRect(-width / 2, -height / 2, width, height);
    
//     // Reset transform matrix
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//   });

//   // Fire off another round of confetti
//   if (confetti.length <= 10) initConfetti();

//   window.requestAnimationFrame(render);
// }

// //---------Execution--------
// initConfetti();
// render();

// //----------Resize----------
// window.addEventListener("resize", function () {
//   resizeCanvas();
// });

// //------------Click------------
// window.addEventListener("click", function() {
//   initConfetti();
// });