import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">

      <nav className="navbar">
        <h2>YourStore</h2>

        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>
            Home
          </button>

          <button onClick={() => {
            setShowCart(false);
            setShowCheckout(false);
          }}>
            Products
          </button>

          <button onClick={() => {
            setShowCart(true);
            setShowCheckout(false);
          }}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      <main>
        {!showCart && !showCheckout && (
          <>
            <h1>Our Products</h1>

            <ProductList addToCart={addToCart} />
          </>
        )}

        {showCart && !showCheckout && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            onCheckout={() => setShowCheckout(true)}
          />
        )}

        {showCheckout && (
          <CheckoutForm
            cart={cart}
            setCart={setCart}
            onBack={() => setShowCart(true)}
          />
        )}
      </main>

    </div>
  );
}

export default App;