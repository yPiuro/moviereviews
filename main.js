// This variable holds the base url for the api, used later for the requests.

const API_URL = 'https://piuro.masterofcubesau.com/api';

// This variable gets set to the "backup" local storage (only works if you have been to the website before) on start even though it changes if the api is up.

let reviews = [
    {
        "id": 0,
        "title": "Hidden Figures",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet pellentesque felis. Cras imperdiet gravida varius. Nam ut turpis est. Aenean et nisl ac leo mollis pretium. Vivamus nec arcu nec nunc dignissim egestas. Fusce id ligula justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi ac lectus ut libero dignissim scelerisque ac iaculis odio. Nam vestibulum tincidunt ante quis sagittis. Sed at feugiat massa.",
        "rating": 4.75
    },
    {
        "id": 1,
        "title": "Angel has Fallen",
        "content": "Nunc non finibus massa. Nulla consectetur vehicula luctus. Suspendisse pulvinar ultricies urna eu feugiat. Morbi eu sagittis mauris, a cursus justo. Vivamus eget sem quis neque ullamcorper gravida. Morbi tempus interdum arcu ut aliquet. Nunc facilisis, erat eget dignissim faucibus, ipsum odio cursus felis, ut dignissim est ante et arcu. Curabitur tristique, ligula vitae interdum lobortis, odio mauris aliquet quam, sit amet tempor elit lectus sit amet risus. Phasellus molestie lacus in felis blandit, ut placerat lorem malesuada. Etiam eget facilisis augue. Pellentesque placerat felis sed purus molestie elementum. Etiam pulvinar ante purus, vitae fringilla massa ornare sit amet. Fusce ac est pharetra, tincidunt massa sit amet, dapibus eros. Sed sem dolor, ornare ac neque eget, vehicula feugiat enim. Etiam blandit eros sit amet viverra egestas. Sed dictum urna magna, vel molestie quam commodo non.",
        "rating": 3.5
    },
    {
        "id": 2,
        "title": "The Gray Man",
        "content": "Brandon is <strong>gray</strong>.\nProin consequat eleifend massa vel lobortis. Quisque pulvinar velit ipsum, at scelerisque neque dignissim malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec id diam nulla. Nam ipsum leo, vehicula sed ante ut, tristique tristique ex. Integer sagittis auctor suscipit. Sed ut luctus massa, vehicula venenatis neque. Nam quis mi justo. Aliquam tincidunt orci at urna pharetra viverra eu eu mi. Nunc quis ligula nibh. Fusce non turpis congue felis iaculis dapibus eu a magna. Vestibulum posuere augue ut neque finibus consectetur. Maecenas sodales aliquet orci id ultricies.",
        "rating": 5.0
    },
    {
        "id": 3,
        "title": "Real Steel",
        "content": "The results of recycling never looked so good \u2014 or so menacing \u2014 as they do in \"Real Steel\" (Disney), an action-packed drama about robots who box and the dysfunctional humans who manipulate and fix them.\n<br>\n<br>\nDirector Shawn Levy (\"Date Night,\" \"Night at the Museum\") weaves the wizardry of computer-generated imagery with the sentimentality of such pugilistic classics as \"The Champ\" and \"Rocky\" while charting the newfound relationship between an estranged father and son. This duo eventually learns \u2014 between brutal matches \u2014 that blood is thicker than hydraulic fluid.\n<br>\n<br>\nIn the not-too-distant future, 8-foot-tall, 2,000-pound robots have replaced human beings in the ring. The World Robot Boxing League offers all the razzle-dazzle of professional wrestling as 'bots beat each others' motherboards out, maneuvered by people using video-gamelike controls.\n<br>\n<br>\nOne such is Charlie Kenton (Hugh Jackman), a washed-up fighter who makes the rounds of country fairs with his robot, grubbing for prize money. Pining for him back at the gymnasium-cum-repair shop is Bailey (Evangeline Lilly) \u2014 a gal who's pretty handy, we learn, with a soldering iron.\n<br>\nCharlie's world is turned upside down with the arrival of Max (Dakota Goyo), his 11-year-old son from a one-night stand. Mom has died, and her sister Debra (Hope Davis) wants custody. Adrift, amoral and broke, Charlie agrees to \"sell\" his son for $50,000. The catch? He needs to watch Max for the summer while Debra goes on vacation.\n<br>\n<br>\nThus begins a very odd road movie. While sizing up his dad, Max is entranced by the robots and the fighting scene. Soon he has his own mechanical warrior, discovered while scrounging the recycling dump for spare parts.\n<br>\n<br>\n\"Atom,\" as he's called, may be an old-model machine but he's no slouch. He's original, intuitive, a mimic and rather a good dancer. Atom and Max bond in the spirit of \"I Robot\" and the \"Transformers\" movies. Soon, with Charlie's training, Atom begins winning against-the-odds victories.\n<br>\n<br>\nIt all points, rather predictably, to the underdog getting his chance at the world title in a match against \"Zeus,\" the Apollo Creed of 'bots. Can David beat Goliath? Will a coldhearted father warm to his hyperactive son, accept his responsibilities, and make a family?",
        "rating": 2.3
    }
]

// Calls the init function, basically intiates the whole process of getting movie reviews from api and then it loads/changes all required html on the page.

init()

// Frequently updates the displayed html every minute, making it basically instant if I ever add a review to the api/data.

// setInterval(init, 6000)


// This function calls other functions but awaits for getReviews to return/finish before doing anything else

async function init() {

    // This function call just gets the reviews from a api that my friend made!

    // await getReviews();

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
    };

    document.querySelector('.reviewContent').innerHTML =
        `
    <span class='title'>${reviewObj.title}</span>
    <p class='reviewText'>${reviewObj.content}</p>
    ${'rating' in reviewObj ? `<br><strong><div class='reviewRating'><p class='reviewText'>Overall Rating: <span style='color:${ratingColor};'>${reviewObj.rating}</span>/5</p></a></div></strong>` : ""
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
};

// This function pulls the reviews off a api that MOC made for me on his webserver (very simple, only 3 requests available) also has 
// very simple auth for the secret part of the website that can add / remove reviews
// it also saves the reviews to localstorage so if the api ever goes down, I can change the website around to have my latest reviews still being displayed until the api can get back online

async function getReviews() {
    const response = await fetch(`https://cors.piuroprauxy.ml/${API_URL}/getReviews`);
    const data = await response.json();
    reviews = data.reviews
    localStorage.setItem('ReviewsBackup', JSON.stringify(reviews))
}
