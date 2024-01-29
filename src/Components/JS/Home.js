import React, { useState } from 'react';

const PizzaOrderForm = () => {
  // State to manage form inputs
  const [pizzaType, setPizzaType] = useState('Veg');
  const [pizzaSize, setPizzaSize] = useState('Large');
  const [pizzaBase, setPizzaBase] = useState('Thin');
  
  // State to manage orders and limit
  const [orders, setOrders] = useState([]);
  const maxOrders = 10;

  // Function to handle form submission
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    
    // Check if the maximum limit is reached
    if (orders.length >= maxOrders) {
      alert('Not taking any more orders for now. Please try again later.');
      return;
    }

    // Add the order to the orders list
    const newOrder = {
      type: pizzaType,
      size: pizzaSize,
      base: pizzaBase,
    };
    
    setOrders([...orders, newOrder]);

    // You can perform any additional action with the order data here
    console.log(`Order placed: Type - ${pizzaType}, Size - ${pizzaSize}, Base - ${pizzaBase}`);

    // Reset form after submission
    setPizzaType('Veg');
    setPizzaSize('Large');
    setPizzaBase('Thin');
  };

  return (
    <div>
      <h2>Pizza Order Form</h2>
      <form onSubmit={handleOrderSubmit}>
        <label>
          Pizza Type:
          <select value={pizzaType} onChange={(e) => setPizzaType(e.target.value)}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <br />

        <label>
          Pizza Size:
          <select value={pizzaSize} onChange={(e) => setPizzaSize(e.target.value)}>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </label>
        <br />

        <label>
          Pizza Base:
          <select value={pizzaBase} onChange={(e) => setPizzaBase(e.target.value)}>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <br />

        <button type="submit">Place Order</button>
      </form>

      <h3>Orders:</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            Type: {order.type}, Size: {order.size}, Base: {order.base}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaOrderForm;
