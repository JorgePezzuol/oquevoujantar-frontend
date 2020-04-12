document.addEventListener('DOMContentLoaded', () => {

    let apiURL = 'http://127.0.0.1:3001/api/fetchFood';

    async function fetchRestaurants() {
        
        try {

            let response = await axios.get(apiURL);

            if(response.status != 200) {

            }

            return response.data;

        } catch (err) {

        }
    }

    fetchRestaurants().then(res => console.log(res));

});