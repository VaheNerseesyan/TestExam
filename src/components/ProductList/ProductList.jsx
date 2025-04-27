import { useEffect, useState, useRef, useContext } from "react";
import Product from "../Product/Product";
import productAPI from "../apis/api";
import Basket from "../Basket/Basket";
import { DarkModeContext } from "../context";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("basket") ?? []));
    const [isBasketMode, setIsBasketMode] = useState(false);
    const BasketRef = useRef([]);
    const [inputValue, setInputValue] = useState("");

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (inputValue) {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products);
        }
    }, [inputValue, products]);

    useEffect(() => window.localStorage.setItem("basket", JSON.stringify(basket)), [basket]);

    useEffect(() => {
        productAPI().then((res) => {
            setProducts(res);
            setFilteredProducts(res);
        });
    }, []);

    const toggleBasketMode = () => {
        setIsBasketMode(!isBasketMode);
    };

    const addToBasket = (id) => {
        setBasket((prev) => {
            const isExist = prev.find((prod) => prod.id === id);
            if (isExist) {
                return prev.map((prod) =>
                    prod.id === id ? { ...prod, count: prod.count + 1 } : prod
                );
            } else {
                return [...prev, { ...products.find((prod) => prod.id === id), count: 1 }];
            }
        });
    };

    const countIncrement = (id) => {
        setBasket((prev) =>
            prev.map((prod) =>
                prod.id === id ? { ...prod, count: prod.count + 1 } : prod
            )
        );
    };

    const countDecrement = (id) => {
        setBasket((prev) =>
            prev.map((prod) =>
                prod.id === id && prod.count > 1 ? { ...prod, count: prod.count - 1 } : prod
            )
        );
    };

    const deleteProduct = (id) => {
        setBasket((prev) => prev.filter((prod) => prod.id !== id));
    };

    const totalPrice = () => {
        return basket.reduce((acc, prod) => acc + prod.price * prod.count, 0);
    };

    const resetCart = () => {
        BasketRef.current = basket;
        console.log(BasketRef.current);
        setBasket([]);
    };

    return (
        <div className={darkMode ? "dark-mode" : ""}>
            <button onClick={toggleBasketMode}>Basket</button>

            <div className="dark-light-button">
                <button onClick={toggleDarkMode}>Dark/Light</button>
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search product"
            />
            <div >
                {!isBasketMode ? (
                    <div className="product-container">
                        {filteredProducts.map((product) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                addToBasket={addToBasket}
                            />
                        ))}
                    </div>

                ) : (
                    <div>
                        <div>
                            <h2>Total Price: {totalPrice().toFixed(2)}</h2>
                            <button onClick={resetCart}>Reset Cart</button>
                        </div>
                        {basket.map((prod) => (
                            <Basket
                                key={prod.id}
                                id={prod.id}
                                title={prod.title}
                                price={prod.price}
                                image={prod.image}
                                category={prod.category}
                                count={prod.count}
                                countIncrement={countIncrement}
                                countDecrement={countDecrement}
                                deleteProduct={deleteProduct}
                                totalPrice={totalPrice}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;