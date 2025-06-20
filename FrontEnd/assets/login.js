const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
	event.preventDefault(); // Empêche le rechargement de la page
	loginUser(); // Appelle la fonction loginUser
});


function loginUser() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const loginData = { email: email, password: password };

	fetch('http://localhost:5678/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(loginData)

	})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error connexion');
        }
        return response.json();
    })
    .then(data => {
		// Store the token in localStorage
		sessionStorage.setItem('token', data.token);
		// Redirect to the admin page
		window.location.href = 'index.html';

    })
    .catch(error => {
        showError(error.message);
    });
}


