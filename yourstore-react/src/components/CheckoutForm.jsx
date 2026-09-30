import { useState } from "react";

function CheckoutForm({ cart, setCart, onBack }) {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    payment: "Cash on Delivery"
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.pincode ||
      !formData.phone
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.pincode.length !== 6) {
      alert("Pincode must be 6 digits.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone must be 10 digits.");
      return;
    }

    setCart([]);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">

        <h1>Order placed!</h1>

        <p>
          Your order has been placed successfully.
        </p>

        <button onClick={onBack}>
          Continue Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="checkout">

      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>

        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Address</label>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Pincode</label>

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <label>Phone</label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Payment Method</label>

        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit/Debit Card</option>
        </select>

        <button type="submit">
          Place Order
        </button>

      </form>

    </div>
  );
}

export default CheckoutForm;