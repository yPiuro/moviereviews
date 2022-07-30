const reviews = 
[/* html */`<span class='title'>Hidden Figures</span>
<p class='reviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse eu est ullamcorper, auctor libero quis, condimentum quam. 
Duis nulla neque, venenatis blandit consectetur sed, tincidunt nec tellus. 
Praesent sed nibh sit amet purus cursus dapibus. 
Etiam sit amet lacus aliquam, lacinia elit aliquet, feugiat leo. 
Aliquam non justo at turpis vestibulum imperdiet quis non lacus. 
Vivamus sollicitudin dolor urna, quis pulvinar risus euismod at. 
Sed tellus ante, mattis at dapibus pulvinar, semper sit amet velit. 
Proin lacus arcu, lobortis vel lacinia non, egestas eu ipsum.</p>`,
// 
/* html */`<span class='title'>Angel has Fallen</span>
<p class='reviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse eu est ullamcorper, auctor libero quis, condimentum quam. 
Duis nulla neque, venenatis blandit consectetur sed, tincidunt nec tellus. 
Praesent sed nibh sit amet purus cursus dapibus. 
Etiam sit amet lacus aliquam, lacinia elit aliquet, feugiat leo. 
Aliquam non justo at turpis vestibulum imperdiet quis non lacus. 
Vivamus sollicitudin dolor urna, quis pulvinar risus euismod at. 
Sed tellus ante, mattis at dapibus pulvinar, semper sit amet velit. 
Proin lacus arcu, lobortis vel lacinia non, egestas eu ipsum.</p>`,
// 
/* html */`<span class='title'>The Gray Man</span>
<p class='reviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse eu est ullamcorper, auctor libero quis, condimentum quam. 
Duis nulla neque, venenatis blandit consectetur sed, tincidunt nec tellus. 
Praesent sed nibh sit amet purus cursus dapibus. 
Etiam sit amet lacus aliquam, lacinia elit aliquet, feugiat leo. 
Aliquam non justo at turpis vestibulum imperdiet quis non lacus. 
Vivamus sollicitudin dolor urna, quis pulvinar risus euismod at. 
Sed tellus ante, mattis at dapibus pulvinar, semper sit amet velit. 
Proin lacus arcu, lobortis vel lacinia non, egestas eu ipsum.</p>`];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function debug(type,text) {
    console.log('\n-------------------------------------------------');
    console.log('[Debug | ' + type + '] : ' + text);
    console.log('-------------------------------------------------');
};


debug('Page Load','Starting...',false);

var chosenMovie = 0;

var reviewContentVar = document.querySelector('.reviewContent');

reviewContentVar.innerHTML = reviews[0];


function changeContent() {
    var content = document.querySelector('.optionsMovies').value;
    debug('"Content" Var value',content,false);
    debug('HTML Being served',reviews[content],false)
    reviewContentVar.innerHTML = reviews[content];
};