function onPoemsClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPoemsResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/poems');
    xhr.send();
}

function onProfileLoad(poet) {
    clearMessages();
    showContents(['profile-content', 'logout-content']);

    const poetEmailSpandEl = document.getElementById('poet-email');
    const poetPasswordSpanEl = document.getElementById('poet-password');

    poetEmailSpandEl.textContent = poet.email;
    poetPasswordSpanEl.textContent = poet.password;
}