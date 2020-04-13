document.addEventListener("DOMContentLoaded", () => {
	let apiURL = "http://127.0.0.1:3005/api/fetchFood";

	async function fetchMenu() {
		try {
			let response = await axios.get(apiURL);

			if (response.status != 200) {
			}

			return response.data.sort( () => Math.random() - 0.5);
		} catch (err) {}
	}

	async function createCardSwiper(data) {
		for (let food of data) {
			let card = `<div class="tinder--card">
                <img src=${data.logoUrl} />
                <h3>${data.name}</h3>
                <p>${data.details}</p>
            </div>`;

			document
				.querySelector("#tinder-cards")
				.insertAdjacentHTML("beforeend", card);
		}
	}

	(async () =>
		fetchMenu().then(data => {
			for (let food of data) {
				var card = `<div class="tinder--card">
                <img src='${food.logoUrl}' />
                <h3>${food.description}</h3>
                <p>${food.details}</p>
            </div>`;

				document
					.querySelector("#tinder-cards")
					.insertAdjacentHTML("beforeend", card);
			}
		}))().then(() => {
		swipe();
	});
});
