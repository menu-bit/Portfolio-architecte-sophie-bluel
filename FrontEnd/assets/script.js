// Fetch works from the API and display them in the gallery
fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(data => {

		const gallery = document.getElementById('gallery');
		gallery.innerHTML = '';

		data.forEach(element =>
			gallery.innerHTML += `<figure>
				<img src="${element.imageUrl}" alt="${element.title}">
				<figcaption>${element.title}</figcaption>
			</figure>`
		);

	});

document.getElementById("tous").addEventListener("click", function () {
	// Active/disactive class from other buttons
	document.getElementById("tous").classList.add("active");
	document.getElementById("objets").classList.remove("active");
	document.getElementById("apartments").classList.remove("active");
	document.getElementById("hotels-restaurants").classList.remove("active");
	// Fetch all works from the API and display them in the gallery
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(data => {

			const gallery = document.getElementById('gallery');
			gallery.innerHTML = '';

			data.forEach(element =>
				gallery.innerHTML += `<figure>
					<img src="${element.imageUrl}" alt="${element.title}">
					<figcaption>${element.title}</figcaption>
				</figure>`
			);
		});
});

document.getElementById("objets").addEventListener("click", function () {
	// Active/disactive class from other buttons
	document.getElementById("tous").classList.remove("active");
	document.getElementById("objets").classList.add("active");
	document.getElementById("apartments").classList.remove("active");
	document.getElementById("hotels-restaurants").classList.remove("active");

	// Fetch all works from the API and display only categoryId 1 (objects)
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(data => {
			const filteredData = data.filter(item => item.categoryId === 1); // ✅ filtering here
			const gallery = document.getElementById('gallery');
			gallery.innerHTML = '';

			filteredData.forEach(element => {
				gallery.innerHTML += `<figure>
                    <img src="${element.imageUrl}" alt="${element.title}">
                    <figcaption>${element.title}</figcaption>
                </figure>`;
			});
		});
});

document.getElementById("apartments").addEventListener("click", function () {
	// Active/disactive class from other buttons
	document.getElementById("tous").classList.remove("active");
	document.getElementById("objets").classList.remove("active");
	document.getElementById("apartments").classList.add("active");
	document.getElementById("hotels-restaurants").classList.remove("active");
	// Fetch all works from the API and display only categoryId 2 (apartments)
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(data => {
			const filteredData = data.filter(item => item.categoryId === 2); // ✅ filtering here
			const gallery = document.getElementById('gallery');
			gallery.innerHTML = '';

			filteredData.forEach(element => {
				gallery.innerHTML += `<figure>
                    <img src="${element.imageUrl}" alt="${element.title}">
                    <figcaption>${element.title}</figcaption>
                </figure>`;
			});
		});
});

document.getElementById("hotels-restaurants").addEventListener("click", function () {
	// Active/disactive class from other buttons
	document.getElementById("tous").classList.remove("active");
	document.getElementById("objets").classList.remove("active");
	document.getElementById("apartments").classList.remove("active");
	document.getElementById("hotels-restaurants").classList.add("active");

	// Fetch all works from the API and display only categoryId 3 (hotels-restaurants)
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(data => {
			const filteredData = data.filter(item => item.categoryId === 3); // ✅ filtering here
			const gallery = document.getElementById('gallery');
			gallery.innerHTML = '';

			filteredData.forEach(element => {
				gallery.innerHTML += `<figure>
                    <img src="${element.imageUrl}" alt="${element.title}">
                    <figcaption>${element.title}</figcaption>
                </figure>`;
			});
		});
});

//add modify button if user is logged in
if (sessionStorage.getItem("token")) {
	document.getElementById("buttonmodifier").style.display = "block";


	// Replace login button with logout
	const login = document.getElementById("login");

	const logout = document.createElement("li");
	logout.id = "logout";
	logout.textContent = "logout";
	login.replaceWith(logout); // Replace login button with logout button 
	logout.addEventListener("click", function () {
		sessionStorage.removeItem("token");
		window.location.href = "index.html";
	});
}else{
	document.getElementById("buttonmodifier").style.display = "none";
}