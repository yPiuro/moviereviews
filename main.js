// This variable holds all the reviews in JSON format making it a lot easier to add/remove to the review list!

const API_URL = 'https://piuro.masterofcubesau.com/api';

// This variable gets set to nothing on page load, just cause idk.

let reviews = ""

// Calls the init function, basically intiates the whole process of getting stuff

init()

// Frequently updates the displayed html every minute, making it basically instant if I ever add something to the api

setInterval(init, 60000)


// This function calls other functions but awaiys for getReviews to return/finish before doing anything else

async function init() {

    // This function call just gets the reviews from a api that my friend made!

    await getReviews();

    // This function call just sets the html <option> elements.
    document.querySelector('.optionsMovies').innerHTML = ''
    initOptions();

    // This function call updates the review placeholder on the website to the user's previous selection of review if they had opened the website before if not
    // it will set it to the default one (Hidden Figures)

    changeContent(localStorage.getItem('currentReview') !== null ? parseInt(localStorage.getItem('currentReview')) : 0);
}

// This function just changes the review being displayed on the website depending on the argument (e.g changeContent(2) will be the third movie in the list)
// it also saves the current review that is being displayed in local storage with a unique numeric ID to display that same review on next page load/open 

function changeContent(movieIndex) {
    let ratingColor = ''
    const reviewObj = reviews[movieIndex];
    if ('rating' in reviewObj) {
        if (reviewObj.rating >= 4) {
            ratingColor = 'yellow'
        } else if (reviewObj.rating >= 2.5) {
            ratingColor = '#505050'
        } else {
            ratingColor = '#AD6208'
        }
    }
    document.querySelector('.reviewContent').innerHTML =
        `
    <span class='title'>${reviewObj.title}</span>
    <p class='reviewText'>${reviewObj.content}</p>
    ${'rating' in reviewObj ? `<strong><div class='reviewRating'><p class='reviewText'>Overall Rating: <span style='color:${ratingColor};'>${reviewObj.rating}</span>/5</p></a></div></strong>` : ""
        }
    `;
    localStorage.setItem('currentReview', movieIndex);
};

// This function just inserts HTML on load that displays all the options 
// before this had to be manually done but, after this commint (https://github.com/whstime/moviereviews/commit/ced5e450f12316b2dfce3e13b9470b119475f96a)
// it got updated with help from a friend (Thanks Masterofcubes)
// and now it is dynamic meaning if the list of reviews gets updated, this will automatically add the update to the options on the HMTL

function initOptions() {
    const savedIndex = localStorage.getItem('currentReview');
    for (let i = 0; i < reviews.length; i++) {
        document.querySelector('.optionsMovies').innerHTML += `<option ${savedIndex !== null && i === parseInt(savedIndex) ? "selected" : ""} value=${i}>${reviews[i].title}</option>\n`
    };
}

// This function pulls the reviews off a api that MOC made for me on his webserver (very simple, only 3 requests available) also has 
// very simple auth for the secret part of the website that can add / remove reviews
// it also saves the reviews to localstorage so if the api ever goes down, I can change the website around to have my latest reviews still being displayed until the api can get back online

async function getReviews() {
    const response = await fetch(`${API_URL}/getReviews`,
        {
            headers: {
                'access-control-allow-credentials': 'true',
                'access-control-allow-methods': '*',
                'Access-Control-Allow-Origin': 'https://movies.piuroprauxy.ml'
            }
        }
    );
    const data = await response.json();
    reviews = data.reviews
    localStorage.setItem('ReviewsBackup', JSON.stringify(reviews))
}