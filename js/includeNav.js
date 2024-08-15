const headerEl = document.getElementById('header');

fetch('../partials/nav.html')
    .then(response => {
        if (!response.ok) {
            throw Error('Error loading nav.')
        }
        return response.text();
    })
    .then(html => headerEl.innerHTML = html);
