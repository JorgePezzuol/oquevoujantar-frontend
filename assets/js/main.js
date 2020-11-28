document.addEventListener("DOMContentLoaded", () => {
    //let apiURL = "http://127.0.0.1:3005/api/fetchFood";
    let apiURL = "https://oquejantar-api.herokuapp.com/api/fetchFood";

    function getCategory() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get("categories");
    }

    function getTest() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.get("test")) {
            return true;
        }
        return false;
    }

    async function getGeolocate() {
        try {
            let response = await axios.get(
                "https://location.services.mozilla.com/v1/geolocate?key=test"
            );
            return response.data;
        } catch (err) {}
    }

    async function fetchMenu() {
        try {
            let geolocate = await getGeolocate();

            let response = await axios.get(apiURL, {
                params: {
                    category: getCategory(),
                    latitude: geolocate.location.lat,
                    longitude: geolocate.location.lng,
                    test: getTest() == true ? true : undefined
                }
            });

            if (response.status != 200) {}

            return response.data.sort(() => Math.random() - 0.5);
        } catch (err) {}
    }

    (async () =>
        fetchMenu().then(data => {
            if (data.length > 0) {
                for (let food of data) {
                    var logo = "";

                    if (food.hasOwnProperty("logoUrl") && food.logoUrl != "") {
                        logo = `https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/${food.logoUrl}`;
                    } else {
                        if (food.restaurant.hasOwnProperty("fileName") && food.restaurant.fileName != "") {
                            logo = `https://static-images.ifood.com.br/image/upload/f_auto,t_thumbnail/logosgde/${food.restaurant.logo.fileName}`;
                        }

                    }

                    let page = `https://www.ifood.com.br/delivery/${food.restaurant.slug}/${food.restaurant.id}?prato=${food.code}`;

                    food.unitPrice =
                        food.unitPrice == 0.0 ?
                        "Escolha uma opção" :
                        `R$ ${food.unitPrice
									.toFixed(2)
									.toString()
									.replace(".", ",")}`;

                    var card = `<div class="tinder--card" data-page=${page}>
									<h1 class='card-header'>${food.restaurant.name}</h1>
									<br/>
									<img crossorigin='anonymous' style='max-height:200px;' src=${logo} />
									<h3 style='font-style: italic'>${
										food.hasOwnProperty("description") ==
										true
											? food.description
											: ""
									}</h3>
									<p>${
										food.hasOwnProperty("details") == true
											? displayDetails(food.details, 100)
											: ""
									}</p>
									<h4>${food.unitPrice}</h4>
								</div>`;

                    document
                        .querySelector("#tinder-cards")
                        .insertAdjacentHTML("beforeend", card);
                }
            } else {
                showNoResults();
            }
        }))().then(() => {
        swipe();
        document.querySelector("#spinner").remove();
    });

    function displayDetails(details, maxLength) {
        if (details.length > maxLength) {
            return `${details.substr(0, maxLength)}...`;
        } else {
            return details;
        }
    }

    function showNoResults() {
        var card =
            "<div class='tinder--card'><h1 class='card-header'>Sem resultados</h1></div>";

        document
            .querySelector("#tinder-cards")
            .insertAdjacentHTML("beforeend", card);
    }
});
