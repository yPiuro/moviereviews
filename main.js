// This variable holds all the reviews in JSON format making it a lot easier to add/remove to the review list!

const API_URL = 'https://piuro.masterofcubesau.com/api';


let reviews = ""
init()
// [
//     {
//         title: "Hidden Figures",
//         //
//         content: /*html*/
//             `
//         Quisque nisi est, vestibulum vel malesuada ac, faucibus ac eros. Duis eget urna et nisl dictum ullamcorper. 
//         Donec sagittis ex dolor, quis consectetur nisl cursus a. Etiam a odio tortor. Fusce sodales augue sit amet justo hendrerit, ac molestie elit tincidunt.
//         Sed et est cursus, elementum quam a, semper lacus. Nunc vehicula consequat orci in auctor.
//         Sed eleifend eget mi ac malesuada. Suspendisse placerat justo nec justo maximus, sit amet commodo eros condimentum. Ut nisi eros, suscipit eget sem bibendum, lobortis aliquam ex.
//         Nulla diam arcu, iaculis nec gravida eget, vulputate quis augue. Phasellus vitae ligula velit.`,
//         //
//         rating: 4.75
//     },
//     {
//         title: "Angel has Fallen",
//         //
//         content: /*html*/
//             `
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
//         Suspendisse eu est ullamcorper, auctor libero quis, condimentum quam. 
//         Duis nulla neque, venenatis blandit consectetur sed, tincidunt nec tellus. 
//         Praesent sed nibh sit amet purus cursus dapibus. 
//         Etiam sit amet lacus aliquam, lacinia elit aliquet, feugiat leo. 
//         Aliquam non justo at turpis vestibulum imperdiet quis non lacus. 
//         Vivamus sollicitudin dolor urna, quis pulvinar risus euismod at. 
//         Sed tellus ante, mattis at dapibus pulvinar, semper sit amet velit. 
//         Proin lacus arcu, lobortis vel lacinia non, egestas eu ipsum.
//         `,
//         //
//         rating: 3.5
//     },
//     {
//         title: "The Gray Man",
//         //
//         content:  /*html*/
//             `Brandon is <strong>gray</strong>.<br>
//         Morbi dapibus mattis euismod. Integer ullamcorper tortor urna, eget viverra ipsum rhoncus accumsan. Sed imperdiet metus quis magna finibus, et imperdiet nisl convallis. 
//         Suspendisse fringilla velit a pretium pulvinar. Mauris blandit erat erat. Sed ac purus eros. Nulla auctor massa a nibh tristique pharetra. Integer porta imperdiet tristique. 
//         Mauris convallis dolor id iaculis aliquet. Nam quis turpis interdum, dictum erat consectetur, finibus nisi. Nullam quis vulputate erat. 
//         Aenean sit amet iaculis nibh. Nam lacinia dictum erat.
//         `,
//         //
//         rating: 5
//     }
// ]

// This function calls other functions but awaiys for getReviews to return/finish before doing anything else

async function init() {

    // This function call just gets the reviews from a api that my friend made!

    await getReviews();

    // This function call just sets the html <option> elements.

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

async function getReviews() {
    const response = await fetch(`${API_URL}/getReviews`);
    const data = await response.json();
    reviews = data.reviews
}
