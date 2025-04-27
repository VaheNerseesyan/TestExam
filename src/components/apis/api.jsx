const API_URL = 'https://fakestoreapi.com/products';

const productAPI = async () => {
    return fetch(API_URL)
        .then(res => res.json())
        .then(res => res)
}

export default productAPI;