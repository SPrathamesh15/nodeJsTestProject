// To access the stars 
let stars = 
	document.getElementsByClassName("star"); 
let output = 
	document.getElementById("output"); 

// Funtion to update rating 
function gfg(n) { 
	remove(); 
	for (let i = 0; i < n; i++) { 
		if (n == 1) cls = "one"; 
		else if (n == 2) cls = "two"; 
		else if (n == 3) cls = "three"; 
		else if (n == 4) cls = "four"; 
		else if (n == 5) cls = "five"; 
		stars[i].className = "star " + cls; 
	} 
	output.innerText = "Rating is: " + n + "/5"; 
} 

// To remove the pre-applied styling 
function remove() { 
	let i = 0; 
	while (i < 5) { 
		stars[i].className = "star"; 
		i++; 
	} 
}

var reviewForm = document.getElementById('reviewform')
// Form submit event
reviewForm.addEventListener('submit', addReview)

function addReview(e){
    e.preventDefault();

    var companyName = document.getElementById('companyname').value;
    var Pros = document.getElementById('pros').value;
    var Cons = document.getElementById('cons').value;
    // Get the value of the selected star
    var selectedStar = 0;
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].classList.contains('one')) {
            selectedStar = 1;
            break;
        } else if (stars[i].classList.contains('two')) {
            selectedStar = 2;
            break;
        } else if (stars[i].classList.contains('three')) {
            selectedStar = 3;
            break;
        } else if (stars[i].classList.contains('four')) {
            selectedStar = 4;
            break;
        } else if (stars[i].classList.contains('five')) {
            selectedStar = 5;
            break;
        }
    }
    var reviewDetails = {
        companyName, 
        Pros,
        Cons,
        Stars: selectedStar
    }
    console.log('review Details:', reviewDetails);
    axios.post("http://localhost:3000/review/add-review", reviewDetails)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML +
                "<h3 style='color:red'> Something Went wrong!!!</h4>",
                console.log(err);
        });

}

function handlePageLoad() {
    // Making a GET request to retrieve data from the backend server
    axios.get("http://localhost:3000/review/get-all-reviews")
        .then((response) => {
            // Displaying the data on the screen and in the console
            showNewReviewOnScreen(response.data.allReviews);
            console.log('handlepageload data', response.data.allReviews);
        })
        .catch((err) => {
            console.error('Error while fetching data:', err);
        });
}
var itemList = document.getElementById('items');
function showNewReviewOnScreen(reviews) {
    const parentNode = document.getElementById('items');
    parentNode.innerHTML = '';

    for (var i = 0; i < reviews.length; i++) {
        console.log('showing the user details on page: ', reviews[i])
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.id = reviews[i].id;

        // Creating elements with appropriate classes
        const companyNameElement = document.createElement('span');
        companyNameElement.className = 'labels';
        companyNameElement.innerText = `Company Name': ${reviews[i].companyName}`;

        const prosElement = document.createElement('span');
        prosElement.className = 'labels';
        prosElement.innerText = `Pros: ${reviews[i].pros}`;

        const consElement = document.createElement('span');
        consElement.className = 'labels';
        consElement.innerText = `Cons: ${reviews[i].cons}`;

        const starsElement = document.createElement('span');
        starsElement.className = 'labels';
        starsElement.innerText = `Stars: ${reviews[i].stars}`;

        // Appending elements to the li
        li.appendChild(firstNameElement);
        li.appendChild(lastNameElement);
        li.appendChild(emailIdElement);
        li.appendChild(phoneElement);

        parentNode.appendChild(li);
    }
}
