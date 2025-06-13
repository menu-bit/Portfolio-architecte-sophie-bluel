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



// Créer les nouveau boutons
//const allButton = document.createElement('button');
//allButton.classList.add('filter-button');
//allButton.innerText = 'Tous'

//const objectsButton = document.createElement('button');
//objectsButton.classList.add('filter-button');
//objectsButton.innerText = 'Objets';

//const apartmentsButton = document.createElement('button');
//apartmentsButton.classList.add('filter-button');
//apartmentsButton.innerText = 'Apartments';

//const hotelsButton = document.createElement('button');
//hotelsButton.classList.add('filter-button');
//hotelsButton.innerText = 'Hotels & restaurants';

// Ajouter les nouveau boutons dans la section de filtre
//filterSection.appendChild(allButton);
//filterSection.appendChild(objectsButton);
//filterSection.appendChild(apartmentsButton);
//filterSection.appendChild(hotelsButton);