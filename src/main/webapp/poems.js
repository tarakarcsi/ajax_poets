let poemsTableEl;
let poemsTableBodyEl;

function onPoemClicked() {
    const poemId = this.dataset.poemId;

    const params = new URLSearchParams();
    params.append('id', poemId);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPoemResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/poems?' + params.toString());
    xhr.send();
}

function onPoemAddResponse() {
    clearMessages();
    if (this.status === OK) {
        appendPoem(JSON.parse(this.responseText));
    } else {
        onOtherResponse(poemsContentDivEl, this);
    }
}

function onPoemAddClicked() {
    const poemFormEl = document.forms['poem-form'];

    const nameInputEl = poemFormEl.querySelector('input[name="name"]');

    const name = nameInputEl.value;

    const params = new URLSearchParams();
    params.append('name', name);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPoemAddResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/poems');
    xhr.send(params);
}

function appendPoem(poem) {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = poem.poemId;

    const aEl = document.createElement('a');
    aEl.textContent = poem.title;
    aEl.href = 'javascript:void(0);';
    aEl.dataset.poemId = poem.poemId;
    aEl.addEventListener('click', onPoemClicked);

    const nameTdEl = document.createElement('td');
    nameTdEl.appendChild(aEl);

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    poemsTableBodyEl.appendChild(trEl);
}

function appendPoems(poems) {
    removeAllChildren(poemsTableBodyEl);

    for (let i = 0; i < poems.length; i++) {
        const poem = poems[i];
        appendPoem(poem);
    }
}

function onPoemsLoad(poems) {
    poemsTableEl = document.getElementById('poems');
    poemsTableBodyEl = poemsTableEl.querySelector('tbody');

    appendPoems(poems);
}

function onPoemsResponse() {
    if (this.status === OK) {
        showContents(['poems-content', 'logout-content']);
        onPoemsLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(poemsContentDivEl, this);
    }
}