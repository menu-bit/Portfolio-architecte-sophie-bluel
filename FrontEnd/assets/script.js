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

// Check if user is logged in and show modify button if user is logged in
if (sessionStorage.getItem("token")) {
	document.getElementById("buttonmodifier").style.display = "block";
	document.getElementById("iconmodifier").style.display = "block";

	// Show the modal when the modify button is clicked
	document.getElementById("buttonmodifier").addEventListener("click", function () {
		document.getElementById("myModal").style.display = "block";

		//display work in modal
		fetch('http://localhost:5678/api/works')
			.then(response => response.json())
			.then(data => {
				const gallery = document.getElementById('modalgallery');
				gallery.innerHTML = '';

				data.forEach(element =>
					gallery.innerHTML += `<figure>
				<img src="${element.imageUrl}" alt="${element.title}" data-id="${element.id}">
				<span class="material-symbols-outlined" data-id="${element.id}" type="button" id="button">	
					delete
				</span>	
			</figure>`
				);
				//function to close modal if outside click
				function clickOutside(e) {
					if (e.target == myModal) {
						myModal.style.display = "none";
					};
				};
				//listen for outside click which calls the function above
				window.addEventListener("click", clickOutside);


				// Attach click event to each delete button
				const deleteButtons = document.getElementsByClassName("material-symbols-outlined")
				for (let i = 0; i < deleteButtons.length; i++) {
					deleteButtons[i].addEventListener("click", function () {
						const id = this.getAttribute("data-id");


						// Find the corresponding image element with matching ID
						const imageToDelete = document.querySelector(`img[data-id="${id}"]`);
						//dlete image
						if (imageToDelete) {
							imageToDelete.remove();
							this.style.display = "none";
						}
					});
				}
			});
	});


	// Correctly get references to the DOM elements
	const fileInput = document.getElementById("fileInput");
	const modalGallery = document.getElementById("modalgallery");
	const addPhotoBtn = document.getElementById("addphoto");

	addphoto.addEventListener("click", function () {
		fileInput.click();
	});

	fileInput.addEventListener("change", (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const img = document.createElement("img");
			img.src = URL.createObjectURL(file);
			modalGallery.appendChild(img);
		}
	});

	// Close the modal when the close button is clicked
	document.getElementById("close-button").addEventListener("click", function () {
		document.getElementById("myModal").style.display = "none";
	});


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