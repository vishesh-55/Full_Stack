function Cart({
  cart,
  removeFromCart,
  updateQuantity,
  onCheckout
}) {
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  const grandTotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.product.id}>

          <img
            src={item.product.image}
            alt={item.product.name}
          />

          <div>
            <h3>{item.product.name}</h3>
            <p>Price: ₹{item.product.price}</p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.product.id,
                    e.target.value
                  )
                }
              />
            </label>

            <p>
              Subtotal: ₹
              {item.product.price * item.quantity}
            </p>
          </div>

          <button
            className="remove-btn"
            onClick={() =>
              removeFromCart(item.product.id)
            }
          >
            Remove
          </button>

        </div>
      ))}

      <div className="total">
        <h2>Grand Total: ₹{grandTotal}</h2>

        <button onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
}

export default Cart;