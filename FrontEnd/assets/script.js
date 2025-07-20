// Function to Fetch works from the API and display them in the gallery
function displayMainGallery() {
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
}
displayMainGallery();


// filtering  by category
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

//function to display work in modal
function displayModalGallery() {
	const gallery = document.getElementById('modalgallery');
	fetch('http://localhost:5678/api/works')
		.then(response => response.json())
		.then(data => {
			gallery.innerHTML = '';
			data.forEach(element => {
				const figure = document.createElement("figure");
				figure.innerHTML = `
					<img src="${element.imageUrl}" alt="${element.title}" data-id="${element.id}">
					<span class="material-symbols-outlined" data-id="${element.id}" type="button">delete</span>
				`;
				gallery.appendChild(figure);

				figure.querySelector("span").addEventListener("click", function () {
					const id = this.getAttribute("data-id");
					const token = sessionStorage.getItem("token");

					fetch(`http://localhost:5678/api/works/${id}`, {
						method: "DELETE",
						headers: { 'Authorization': `Bearer ${token}` }
					})
						.then(response => {
							if (response.ok) {
								displayModalGallery();
								displayMainGallery();
							} else {
								alert("Erreur lors de la suppression.");
							}
						});
				});
			});
		});
}

// if user is logged in and show modify button if user is logged in
if (sessionStorage.getItem("token")) {
	document.getElementById("buttonmodifier").style.display = "block";
	document.getElementById("iconmodifier").style.display = "block";

// Show the modal when the modify button is clicked
	document.getElementById("buttonmodifier").addEventListener("click", () => {
		document.getElementById("myModal").style.display = "block";
		displayModalGallery();
	});

	window.addEventListener("click", e => {
		if (e.target === document.getElementById("myModal")) {
			document.getElementById("myModal").style.display = "none";
		}
	});

	document.getElementById("close-button").addEventListener("click", () => {
		document.getElementById("myModal").style.display = "none";
	});


//change to 2nd modal to add photo from here if ajouter une photo button is clicked it change modal
	document.getElementById("addphoto").addEventListener("click", function () {
		document.getElementById("modal-content2").style.display = "block";
		document.getElementById("modal-content").style.display = "none";

	});
// Close 2ns modal when the close button2 is clicked
	document.getElementById("close-button2").addEventListener("click", function () {
		document.getElementById("myModal").style.display = "none";
	});

// going back to modal-content from modal-content2 clicking back arrow
	const arrowBack = document.getElementById("arrow-back");
	function displaymodalContent() {
		document.getElementById("modal-content").style.display = "block";
		document.getElementById("modal-content2").style.display = "none";
	}
	arrowBack.addEventListener("click", function () {
		displaymodalContent();
	});

//adding images browsing in computer goes here
	const dropArea = document.getElementById("drop-area");
	const fileInput = document.getElementById("fileInput");
	const imageView = document.getElementById("img-view");

	fileInput.addEventListener("change", uploadImage);
	function uploadImage() {
		let imgLink = URL.createObjectURL(fileInput.files[0]);
		imageView.innerHTML = `<img src="${imgLink}" class="preview-image">`;
	}

//adding images to 2nd modal by d&d goes here
	dropArea.addEventListener("dragover", function (e) {
		e.preventDefault();
	});
	dropArea.addEventListener("drop", function (e) {
		e.preventDefault();
		fileInput.files = e.dataTransfer.files;
		uploadImage()
	});


// récupérer les catégories dynamiquement depuis l’API
	const categorySelect = document.getElementById("category");

	fetch('http://localhost:5678/api/categories') // pulling categories and ading to DOM
		.then(response => response.json())
		.then(categories => {
			categorySelect.innerHTML = `<option value=""></option>`;
			categories.forEach(category => {
				const option = document.createElement("option");
				option.value = category.id;
				option.textContent = category.name;
				categorySelect.appendChild(option);
			});
		});


// Sending formdata of modalcontent2 to backend
	const form = document.getElementById("uploadphoto");

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const title = document.getElementById("title").value;
		const category = document.getElementById("category").value;
		const file = fileInput.files[0];

		if (!title || !category || !file) {                    // if form not filled showing up error message
			alert("Veuillez remplir tous les champs requis !");
			return;
		}

		const token = sessionStorage.getItem("token");
		const formData = new FormData(form);

		fetch(`http://localhost:5678/api/works/`, {
			method: "POST",
			body: formData,
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(data => {
// Reset form and image preview here after successful upload
				form.reset();
				imageView.style.backgroundImage = "none";
				imageView.innerHTML = `<img src="./assets/icons/img-view.png">
            <button id="addphoto2">+ Ajouter photo</button>
            <p>jpg, png : 4mo max</p>`;
				// Close modal after POST photo to backend then refresh
				const modal = document.getElementById("myModal");
				modal.style.display = "none"; // close modal
				displayMainGallery();
				displayModalGallery();

			});
	});// closing brackets of submit to upload photo





// Replace login button with logout
	const login = document.getElementById("login");

	const logout = document.createElement("li");
	logout.className = "nav";
	logout.id = "logout";
	logout.textContent = "logout";
	login.replaceWith(logout); // Replace login button with logout button
	logout.addEventListener("click", function () {
		sessionStorage.removeItem("token");
		window.location.href = "index.html";
	});



} else {
	document.getElementById("buttonmodifier").style.display = "none";
	document.getElementById("buttonmodifier").removeEventListener("click");
}