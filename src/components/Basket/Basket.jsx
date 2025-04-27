function Basket({ id, image, price, title, category, count, countIncrement, countDecrement, deleteProduct, totalPrice }) {



    return (
        <div className="product-card" key={id}>
            <h4>{title}</h4>
            <h4>{category}</h4>
            <h4>{price}</h4>
            <img className="product-card" src={image} alt="" />
            <div>
                <button onClick={() => countDecrement(id)}>-</button>
                <h4>{count}</h4>
                <button onClick={() => countIncrement(id)}>+</button>
            </div>
            <button onClick={() => deleteProduct(id)}>Delete</button>
        </div>
    )
}

export default Basket;