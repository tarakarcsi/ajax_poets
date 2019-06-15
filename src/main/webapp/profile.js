function onShopsClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onShopsResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/shops');
    xhr.send();
}

function onCouponsClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCouponsResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/coupons');
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