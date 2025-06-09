// Fetch works from the API and display them in the gallery
fetch("http://localhost:5678/api/works")
	.then(response => response.json())
	.then(data => {

		const gallery = document.getElementById('gallery');
		gallery.innerHTML = '';

		data.forEach(element =>
			gallery.innerHTML +=`<figure>
				<img src="${element.imageUrl}" alt="${element.title}">
				<figcaption>${element.title}</figcaption>
			</figure>`
		);

	});

// Sélectionner la section de filtre
const filterSection = document.getElementById('filter');

// Créer les nouveau boutons
const allButton = document.createElement('button');
allButton.classList.add('filter-button');
allButton.innerText = 'Tous'

const objectsButton = document.createElement('button');
objectsButton.classList.add('filter-button');
objectsButton.innerText = 'Objets';

const apartmentsButton = document.createElement('button');
apartmentsButton.classList.add('filter-button');
apartmentsButton.innerText = 'Apartments';

const hotelsButton = document.createElement('button');
hotelsButton.classList.add('filter-button');
hotelsButton.innerText = 'Hotels & restaurants';

// Ajouter les nouveau boutons dans la section de filtre
filterSection.appendChild(allButton);
filterSection.appendChild(objectsButton);
filterSection.appendChild(apartmentsButton);
filterSection.appendChild(hotelsButton);
