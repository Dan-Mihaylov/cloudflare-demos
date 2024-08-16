const cardsContainerEl = document.querySelector('.cards-container');

fetch('/js/data/projects.json')
    .then(result => result.json())
    .then(data => {
        const values = Object.values(data);

        for (project of values) {
            createCardEl(project.image, project.name, project.description, project.path);
        }
    })
    .catch(error => console.error(error));


function createCardEl(imgUrl, projectName, projectDesc, projectLink) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    // media section
    const mediaDivEl = document.createElement('div');
    mediaDivEl.classList.add('media');
    cardEl.append(mediaDivEl);

    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imgUrl);
    imgElement.setAttribute('alt', 'image');  
    mediaDivEl.append(imgElement);

    // article section
    const articleEl = document.createElement('article');
    cardEl.append(articleEl);

    const headerEl = document.createElement('h3');
    headerEl.innerHTML = `${projectName} <i class="fa-solid fa-check">`;
    articleEl.append(headerEl);

    const descEl = document.createElement('p');
    descEl.textContent = projectDesc;
    articleEl.append(descEl);

    const controlsEl = document.createElement('a');
    controlsEl.classList.add('controls');
    controlsEl.setAttribute('href', projectLink);
    controlsEl.textContent = 'Go to project';
    articleEl.append(controlsEl);

    cardsContainerEl.append(cardEl);
}
