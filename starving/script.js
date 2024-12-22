function toggleMenu() {
    const navLinks = document.querySelector('.nav_bar_links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

function subscribe() {
    let email = document.getElementById("email").value;
    window.alert(email + ' subscribed successfully');
}
