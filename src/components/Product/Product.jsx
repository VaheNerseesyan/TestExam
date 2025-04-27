function Product({id, image, price, title, category, addToBasket}) {

    return (
        <div className="product-card" key={id}>
            <h4>{title}</h4>
            <h4>{category}</h4>
            <h4>{price}</h4>
            <img className="product-card" src={image} alt="" />
            <button onClick={() => addToBasket(id)}>Add to Busket</button>
        </div>
    )
}

export default Product;