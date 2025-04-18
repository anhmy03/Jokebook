document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display a random joke on page load
    fetchRandomJoke();

    // Event listener for the category form submission
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const categoryInput = document.getElementById('category-input').value;
            fetchJokesByCategory(categoryInput);
        });
    }

    // Event listener for the add joke form submission
    const addJokeForm = document.getElementById('add-joke-form');
    if (addJokeForm) {
        addJokeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(addJokeForm);
            addJoke(formData);
        });
    }
});

// Function to fetch a random joke
function fetchRandomJoke() {
    fetch('/jokebook/random')
        .then(response => response.json())
        .then(data => {
            document.getElementById('random-joke-setup').innerText = data.setup;
            document.getElementById('random-joke-delivery').innerText = data.delivery;
        })
        .catch(error => console.error('Error fetching random joke:', error));
}

// Function to fetch jokes by category
function fetchJokesByCategory(category) {
    fetch(`/jokebook/joke/${category.name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Category not found');
            }
            return response.json();
        })
        .then(data => {
            const jokesList = document.getElementById('jokes-list');
            jokesList.innerHTML = ''; // Clear previous jokes
            data.forEach(joke => {
                const jokeItem = document.createElement('li');
                jokeItem.innerHTML = `<p>${joke.setup}</p><p>${joke.delivery}</p>`;
                jokesList.appendChild(jokeItem);
            });
        })
        .catch(error => console.error('Error fetching jokes by category:', error));
}

// Function to add a new joke
function submitForm() {
    let params = new FormData(document.getElementById("form-container"));
    let jsonBody = JSON.stringify(Object.fromEntries(params));
    fetch("/jokebook/joke/add", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: jsonBody,
    })
        .then(checkStatus)
        .then(reload)
        .catch(alert);
}