import { useEffect, useState } from "react";
import "./ecommerce.css";

const initialData = [
  {
    "id": 14,
    "title": "Classic High-Waisted Athletic Shorts",
    "price": 43,
    "description": "Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.",
    "images": ["https://i.imgur.com/eGOUveI.jpeg", "https://i.imgur.com/UcsGO7E.jpeg", "https://i.imgur.com/NLn4e7S.jpeg"],
    "creationAt": "2024-07-03T15:12:54.000Z", "updatedAt": "2024-07-03T15:12:54.000Z",
    "category": {
      "id": 1,
      "name": "Clothes",
      "image": "https://i.imgur.com/QkIa5tT.jpeg",
      "creationAt": "2024-07-03T15:12:54.000Z",
      "updatedAt": "2024-07-03T15:46:00.000Z"
    }
  }
];

export default function Ecommerce() {
  const [productData, setProductData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  function handleSelect(product) {
    setSelectedProducts(prevProducts => {
      if (prevProducts.find(p => p.id === product.id)) {
        alert("Already in the cart");
        return prevProducts;
      }
      return [...prevProducts, { ...product, quantity: 1 }];
    });
  }

  function handleRemove(productId) {
    setSelectedProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  }

  function handleQuantityChange(productId, amount) {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  }

  useEffect(function () {
    async function loadData() {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
        const data = await response.json();
        const filteredData = data.filter(product => product.images && product.images[0]);
        setProductData(filteredData);
      } catch (err) {
        console.log(err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <div className="shop__title">
        <h1>MyShopping App</h1>
        <h3>Found {productData.length} results</h3>
      </div>
      <div className="commerce">
        <div className="commerce__container">
          {productData.map((product, i) => (
            <EcommerceData product={product} key={i} onSelect={handleSelect} selectedProducts={selectedProducts} />
          ))}
        </div>
        <div>
          <h2 className="head">Products in Your Cart: {selectedProducts.length}</h2>
          {selectedProducts.length > 0 && (
            <AddToCart
              products={selectedProducts}
              onDelete={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

function AddToCart({ products, onDelete, onQuantityChange }) {
  return (
    <>
      {products.map((product, index) => (
        <div className="crt" key={index}>
          <div className="crt__img">
            <img className="addcrt__img" src={product.images[0]} alt="Product" />
          </div>
          <div className="crt__details">
            <h1 className="addcrt__title">{product.title}</h1>
            <span>
              Quantity: 
              <button className="btn-qty" onClick={() => onQuantityChange(product.id, -1)}>-</button>
              {product.quantity}
              <button className="btn-qty" onClick={() => onQuantityChange(product.id, 1)}>+</button>
            </span>
            <button className="remove" onClick={() => onDelete(product.id)}>Remove</button>
          </div>
        </div>
      ))}
    </>
  );
}

function EcommerceData({ product, onSelect, selectedProducts }) {
  const description = product.description;
  const isAdded = selectedProducts.some(p => p.id === product.id);
  return (
    <div className="commerce__box">
      <div className="img__container">
        <img className="product__img" src={product.images[0]} alt="Product" />
      </div>
      <div className="product__details">
        <h2 className="product__title">{product.title}</h2>
        <h4 className="product__category">{product.category.name}</h4>
        <p className="product__para">{description.length > 95 ? description.substring(0, 95).concat("...more") : description}</p>
        <div className="details__price">
          <p className="inr__price">₹{product.price}</p>
          <button className="btn-addTo" onClick={() => onSelect(product)}>{isAdded ? "Added" : "Add to Cart"}</button>
        </div>
      </div>
    </div>
  )
}
