import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../Action';
import './CSS/Pizzashop.css'

const PizzaOrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  const MAX_ORDERS = 10;

  const initialState = { type: '', size: '', base: '' };
  const [order, setOrder] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder(order, orders.length + 1));
    setOrder(initialState);
  };

  return (
    <div className='container' >
      <h2 className='Header-text'>Place Pizza Order</h2>
      <div className='Divofshop'>

      <label className='SelectedType'>
        Type:
        <select className='SelectedName' name="type" value={order.type} onChange={handleInputChange}>
          <option disabled >Select Type</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </label>
      <label className='SelectedType'>
        Size:
        <select className='SelectedName' name="size" value={order.size} onChange={handleInputChange}>
          <option disabled>Select Size</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </label>
      <label className='SelectedType'>
        Base:
        <select className='SelectedName' name="base" value={order.base} onChange={handleInputChange}>
          <option disabled>Select Base</option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </label>
      <button className='ButtonOfPlaceOrder' onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default PizzaOrderForm;



