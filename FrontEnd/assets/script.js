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

				// Close the modal when the close button is clicked
				document.getElementById("close-button").addEventListener("click", function () {
					document.getElementById("myModal").style.display = "none";
				});


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



	//change to 2nd modal to add photo from here if ajouter une photo button is clicked it change modal
	document.getElementById("addphoto").addEventListener("click", function () {
		document.getElementById("modal-content2").style.display = "block";
		document.getElementById("modal-content").style.display = "none";

	});
	// Close 2ns modal when the close button2 is clicked
	document.getElementById("close-button2").addEventListener("click", function () {
		document.getElementById("myModal").style.display = "none";
	});

	// going back to modal-content from modal-content2
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
		imageView.style.backgroundImage = `url(${imgLink})`;
		imageView.textContent = "";

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