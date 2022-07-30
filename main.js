const reviews = [
    { 
        title: "Hidden Figures",
        content: 
        `
        Quisque nisi est, vestibulum vel malesuada ac, faucibus ac eros. Duis eget urna et nisl dictum ullamcorper. 
        Donec sagittis ex dolor, quis consectetur nisl cursus a. Etiam a odio tortor. Fusce sodales augue sit amet justo hendrerit, ac molestie elit tincidunt.
        Sed et est cursus, elementum quam a, semper lacus. Nunc vehicula consequat orci in auctor.
        Sed eleifend eget mi ac malesuada. Suspendisse placerat justo nec justo maximus, sit amet commodo eros condimentum. Ut nisi eros, suscipit eget sem bibendum, lobortis aliquam ex.
        Nulla diam arcu, iaculis nec gravida eget, vulputate quis augue. Phasellus vitae ligula velit.`,
        rating: 4.75
    },
    { 
        title: "Angel has Fallen",
        content: 
        `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse eu est ullamcorper, auctor libero quis, condimentum quam. 
        Duis nulla neque, venenatis blandit consectetur sed, tincidunt nec tellus. 
        Praesent sed nibh sit amet purus cursus dapibus. 
        Etiam sit amet lacus aliquam, lacinia elit aliquet, feugiat leo. 
        Aliquam non justo at turpis vestibulum imperdiet quis non lacus. 
        Vivamus sollicitudin dolor urna, quis pulvinar risus euismod at. 
        Sed tellus ante, mattis at dapibus pulvinar, semper sit amet velit. 
        Proin lacus arcu, lobortis vel lacinia non, egestas eu ipsum.
        `,
        rating: 3.5
    },
    { 
        title: "The Gray Man",
        content:  /*html*/ 
        `Brandon is <strong>gray</strong>.<br>
        Morbi dapibus mattis euismod. Integer ullamcorper tortor urna, eget viverra ipsum rhoncus accumsan. Sed imperdiet metus quis magna finibus, et imperdiet nisl convallis. 
        Suspendisse fringilla velit a pretium pulvinar. Mauris blandit erat erat. Sed ac purus eros. Nulla auctor massa a nibh tristique pharetra. Integer porta imperdiet tristique. 
        Mauris convallis dolor id iaculis aliquet. Nam quis turpis interdum, dictum erat consectetur, finibus nisi. Nullam quis vulputate erat. 
        Aenean sit amet iaculis nibh. Nam lacinia dictum erat.
        `,
        rating: 5
    }
]

initOptions();
changeContent(localStorage.getItem('currentReview') !== null ? parseInt(localStorage.getItem('currentReview')): 0);
document.getElementById
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
    ${
        'rating' in reviewObj ? `<div class='reviewRating'><p class='reviewText'>Overall Rating: <span style='color:${ratingColor};'>${reviewObj.rating}</span>/5</p></a></div>` : ""
    }
    `;
    localStorage.setItem('currentReview', movieIndex);
};

function initOptions(){
    const savedIndex = localStorage.getItem('currentReview');
    for (let i = 0; i < reviews.length; i++) {
        document.querySelector('.optionsMovies').innerHTML += `<option ${savedIndex !== null && i === parseInt(savedIndex) ?  "selected" : ""} value=${i}>${reviews[i].title}</option>\n`
    };
}
