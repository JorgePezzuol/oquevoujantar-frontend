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

	(async () =>
		fetchMenu().then(data => {
			for (let food of data) {

				var logo  = "";
				

				if(food.logoUrl != undefined) {
					logo = `https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/${food.logoUrl}`;
				}
				else {
					logo = `https://static-images.ifood.com.br/image/upload/f_auto,t_thumbnail/logosgde/${food.restaurant.logo.fileName}`;
				}

				let page = `https://www.ifood.com.br/delivery/${food.restaurant.slug}/${food.restaurant.id}?prato=${food.code}`;

				food.unitPrice = food.unitPrice == 0.0 ? "" : `R$ ${food.unitPrice.toFixed(2).toString().replace(".", ",")}`;

				var card = `<div class="tinder--card" data-page=${page}>
								<h1 class='card-header'>${food.restaurant.name}</h1>
								<img style='max-height:200px;' src=${logo} />
								<h3 style='font-style: italic'>${food.description}</h3>
								<p>${displayDetais(food.details, 100)}</p>
								<h4>${food.unitPrice}</h4>
							</div>`;

				document
					.querySelector("#tinder-cards")
					.insertAdjacentHTML("beforeend", card);
			}
		}))().then(() => {
		swipe();
	});

	function displayDetais(details, maxLength) {
		
		if(details.length > maxLength) {
			return `${details.substr(0, maxLength)}...`;
		}
		else {
			return details;
		}
	}
});
