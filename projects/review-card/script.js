const buttonBackEl = document.querySelector('button');
buttonBackEl.addEventListener('click', () => history.back());
setTimeout(() => {buttonBackEl.style.opacity = '100'}, 2000);

class Review {
    constructor (imageUrl, reviewerName, reviewerRole, reviewParagraph) {
        this.imageUrl = imageUrl;
        this.reviewerName = reviewerName;
        this.reviewerRole = reviewerRole;
        this.reviewParagraph = reviewParagraph; 
    }
}

const rev1 = new Review(
    'https://images.pexels.com/photos/4298629/pexels-photo-4298629.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1',
    'Anne Marie',
    'Web Designer',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ut amet dicta alias deleniti modi autem nam sequi provident. Voluptate maxime quos praesentium a exercitationem officiis rem libero cum. Illo!'
);

const rev2 = new Review(
    'https://images.pexels.com/photos/4536190/pexels-photo-4536190.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1',
    'Costa da Silva',
    'Data analyst',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ut amet dicta alias deleniti modi autem nam sequi provident. Voluptate maxime quos praesentium a exercitationem officiis rem libero cum. Illo!'
);

const rev3 = new Review(
    'https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg?auto=compress&cs=tinysrgb&w=250&h=250&dpr=1',
    'Petro Carnozo',
    'QA intern',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ut amet dicta alias deleniti modi autem nam sequi provident. Voluptate maxime quos praesentium a exercitationem officiis rem libero cum. Illo!'
);

const reviews  = [rev1, rev2, rev3]
let currIndex = 0;

function changeReview(){
    let currReview = reviews[currIndex];

    const imageElement = document.getElementById('image');
    imageElement.src = currReview.imageUrl;

    const nameElement = document.getElementById('reviewer-name');
    nameElement.textContent = currReview.reviewerName;

    const roleElement = document.getElementById('reviewer-role');
    roleElement.textContent = currReview.reviewerRole;

    const reviewElement = document.getElementById('review-paragraph');
    reviewElement.textContent = currReview.reviewParagraph; 


    const container = document.getElementById('review-container');
    container.style.opacity = 1;
    oneOpacity();
}

const load = setTimeout(changeReview, 1000);


document.getElementById('next-review').addEventListener('click', element => {
    currIndex = currIndex + 1 < reviews.length ? currIndex + 1 : 0;
    zeroOpacity();
})

document.getElementById('previous-review').addEventListener('click', element=>{
    currIndex = currIndex - 1 >= 0 ? currIndex - 1 : reviews.length - 1;
    zeroOpacity();
})

document.getElementById('surprise-review').addEventListener('click', element => {
    currIndex = Math.round(Math.random() * (reviews.length - 1) + 0);
    zeroOpacity();
})


function zeroOpacity(){
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 0;

    const imageElement = document.getElementById('image-container');
    imageElement.style.opacity = 0;

    const nameElement = document.getElementById('reviewer-name');
    nameElement.style.opacity = 0;

    const roleElement = document.getElementById('reviewer-role');
    roleElement.style.opacity = 0;

    const reviewElement = document.getElementById('review-paragraph');
    reviewElement.style.opacity = 0;

    setTimeout(changeReview, 1000);
};

function oneOpacity(){
    const quoteElement = document.getElementById('quote');
    quoteElement.style.opacity = 1;

    const imageElement = document.getElementById('image-container');
    imageElement.style.opacity = 1;

    const nameElement = document.getElementById('reviewer-name');
    nameElement.style.opacity = 1;

    const roleElement = document.getElementById('reviewer-role');
    roleElement.style.opacity = 1;

    const reviewElement = document.getElementById('review-paragraph');
    reviewElement.style.opacity = 1;
}
