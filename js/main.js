// Login popup; Closes form when user clicks outside of it.
window.onclick = function(event) {
    if (event.target == document.getElementById('loginPopup')) {
        document.getElementById('loginPopup').style.display = "none";
    }
}