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