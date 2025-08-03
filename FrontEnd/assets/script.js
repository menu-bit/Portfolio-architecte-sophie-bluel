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
			const filteredData = data.filter(item => item.categoryId === 1); //  filtering here
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
			const filteredData = data.filter(item => item.categoryId === 2); //  filtering here
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
			const filteredData = data.filter(item => item.categoryId === 3); //  filtering here
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


// if user is logged in and show modify button 
if (sessionStorage.getItem("token")) {
	document.getElementById("buttonmodifier").classList.remove("hidden");
	document.getElementById("iconmodifier").classList.add("visible");
	document.getElementById("filter").classList.add("hidden"); // hide filter buttons


	// Show the modal when the modify button is clicked
	const modal = document.getElementById("myModal");


	document.getElementById("buttonmodifier").addEventListener("click", boutonmodifier(modal));

	// Close modal when clicked outside the modal
	window.addEventListener("click", e => {
		if (e.target === modal) {
			modal.classList.remove("visible");
			modal.classList.add("hidden");
		}
	});
	// close Modal when close button is clicked
	document.getElementById("close-button").addEventListener("click", () => {
		modal.classList.remove("visible");
		modal.classList.add("hidden");
	});

	// function to display work in modal1 and deleting works
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
					<span class="material-symbols-outlined delete-icon" data-id="${element.id}" type="button">delete</span>
				`;
					gallery.appendChild(figure);

					figure.querySelector("span").addEventListener("click", function () {
						const id = this.getAttribute("data-id");
						const token = sessionStorage.getItem("token");
						//fetching works by id that is selected to delete
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


	//switch to 2nd modal to add photo goes from here if *ajouter une photo* button is clicked it switch modal
	const modalContent1 = document.getElementById("modal-content");
	const modalContent2 = document.getElementById("modal-content2");

	document.getElementById("addphoto").addEventListener("click", function () {
		modalContent1.classList.remove("visible");
		modalContent1.classList.add("hidden");
		modalContent2.classList.add("visible");
		modalContent2.classList.remove("hidden");
	});

	// Close 2nd modal when the close button2 is clicked
	document.getElementById("close-button2").addEventListener("click", () => {
		modal.classList.remove("visible");
		modal.classList.add("hidden");
	});

	// going back to modal-content from modal-content2 clicking back arrow
	const arrowBack = document.getElementById("arrow-back");
	function displaymodalContent() {
		modalContent2.classList.remove("visible");
		modalContent2.classList.add("hidden");
		modalContent1.classList.add("visible");
		modalContent1.classList.remove("hidden");
	}
	arrowBack.addEventListener("click", function () {
		displaymodalContent();
	});

	// adding images browsing in computer goes here(image preview)
	const dropArea = document.getElementById("drop-area");
	const fileInput = document.getElementById("fileInput");
	const imageView = document.getElementById("img-view");

	fileInput.addEventListener("change", uploadImage);
	function uploadImage() {
		let imgLink = URL.createObjectURL(fileInput.files[0]);
		imageView.innerHTML = `<img src="${imgLink}" class="preview-image">`;
	}

	// adding images to 2nd modal by d&d goes here
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

	// checking if all forms of fields are filled if yes then change validate button color
	const titleInput = document.getElementById("title");
	const categoryInput = document.getElementById("category");
	const fileInsert = document.getElementById("fileInput");
	const validateButton = document.getElementById("validate");

	function checkFieldsAndUpdateButton() {
		const title = titleInput.value.trim();
		const category = categoryInput.value.trim();
		const file = fileInsert.files[0];

		if (title && category && file) {
			validateButton.style.backgroundColor = "#1D6154";
		} else {
			validateButton.style.backgroundColor = ""; // Reset or use default
		}
	}

	// Listen for changes on all fields in modal 2 to change color of button
	titleInput.addEventListener("input", checkFieldsAndUpdateButton);
	categoryInput.addEventListener("input", checkFieldsAndUpdateButton);
	fileInsert.addEventListener("change", checkFieldsAndUpdateButton);


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
				validateButton.style.background = "";
				// Close modal after POST photo to backend then refresh
				modal.classList.remove("visible"); // close modal
				modal.classList.add("hidden");
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
	document.getElementById("buttonmodifier").classList.add("hidden");
	document.getElementById("buttonmodifier").removeEventListener("click", boutonmodifier());
}

function boutonmodifier(modal) {
	return () => {
		modal.classList.add("visible");
		modal.classList.remove("hidden");
		document.body.style.overflow = "hidden"; //Disable scroll
		displayModalGallery();
	};
}


