
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveOrder, cancelOrder } from '../Action';
import './PizzaDashboard.css';

const MAX_ORDERS = 10;

const PizzaDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const [finalTime, setFinalTime] = useState("");
  const [timers, setTimers] = useState({});
  const [orderTable, setOrderTable] = useState([]);

  const handleMoveOrder = (orderId, stage) => {
    // Clear the existing timer when moving to a new state
    clearInterval(timers[orderId]);

    // Stop the timer for the order if it's in the 'Ready' state
    if (stage === 'Order Ready') {
      clearInterval(timers[orderId]);

      // Update the orderTable state only when transitioning to 'Ready' state
      setOrderTable((prevOrderTable) => {
        const updatedTable = prevOrderTable.map((order) =>
          order.id === orderId ? { ...order, totalTimeSpent: calculateTotalTimeSpent(orderId) } : order
        );
        return updatedTable;
      });
    }

    dispatch(moveOrder(orderId, stage));

    // Log total time when the order is picked
    if (stage === 'Order Picked') {
      const totalOrderTime = calculateTotalTimeSpent(orderId);
      setFinalTime(totalOrderTime);
      console.log(`Total time for order ${orderId}: ${formatTime(totalOrderTime)}`);
    }
  };

  const handleCancelOrder = (orderId) => {
    // Clear the existing timer when canceling an order
    clearInterval(timers[orderId]);

    dispatch(cancelOrder(orderId));
  };

  const canTakeOrder = orders.length < MAX_ORDERS || orders.some((order) => order.stage === 'Order Picked');

  useEffect(() => {
    const orderTimers = {};

    orders.forEach((order) => {
      if (order.stage !== 'Order Delivered') {
        const timer = setInterval(() => {
          setTimers((prevTimers) => ({
            ...prevTimers,
            [order.id + order.stage]: (prevTimers[order.id + order.stage] || 0) + 1,
          }));
        }, 1000);

        orderTimers[order.id] = timer;
      }
    });

    return () => {
      // Cleanup timers on component unmount
      Object.values(orderTimers).forEach((timer) => clearInterval(timer));
    };
  }, [orders]);

  useEffect(() => {
    const updatedOrderTable = orders.map((order) => ({
      id: order.id,
      stage: order.stage,
      totalTimeSpent: calculateTotalTimeSpent(order.id),
    }));

    setOrderTable(updatedOrderTable);
  }, [orders, timers]);

  const calculateTotalTimeSpent = (orderId) => {
    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];
    return stages.reduce((totalTime, stage) => totalTime + (timers[orderId + stage] || 0), 0);
  };

  const shouldHighlight = (stage, size, remainingTime) => {
    let makingTime;

    switch (stage) {
      case 'Order Placed':
        makingTime = size === 'Small' ? 3*60 : size === 'Medium' ? 4*60 : 5*60;
        break;
      case 'Order in Making':
        makingTime = size === 'Small' ? 3*60 : size === 'Medium' ? 4*60 : 5*60;
        break;
      case 'Order Ready':
        makingTime = size === 'Small' ? 3*60 : size === 'Medium' ? 4*60 : 5*60;
        break;
      // Add cases for other stages if needed
      default:
        makingTime = 0;
    }

    const threshold = makingTime * 1; // Convert making time to seconds

    return stage !== 'Order Delivered' && remainingTime >= threshold ? 'highlight' : '';
  };

  return (
    <div className='container'>
      <h2 className='TextOfPizzaDashbosrd'>Pizza Dashboard</h2>
      <div>
        {canTakeOrder ? (
          <p className='ParagraphofText'>Can take new orders</p>
        ) : (
          <p>Not taking any order for now</p>
        )}

        <section>
          {/* Place Order Section */}
          <div className="container">
            <div className="row">
              <div className="col-sm-3 PlaceOrder orderdiv">
                <p className='paragraphofStage'>Order Placed</p>
                {orders
                  .filter((order) => order.stage === 'Order Placed')
                  .map((order) => (
                    <div
                      key={order.id}
                      className={`order-item DivOfstage ${shouldHighlight('Order Placed', order.size, timers[order.id + 'Order Placed'])}`}
                    >
                      <p>
                        Order ID: {order.id} - Stage: {order.stage} - Remaining Time:{' '}
                        {formatTime(timers[order.id + order.stage])}
                      </p>
                      <button className='ButtonOfNext' onClick={() => handleMoveOrder(order.id, 'Order in Making')}>Next</button>
                    </div>
                  ))}
              </div>

              {/* Making Order Section */}
              <div className="col-sm-3 MakingOrder orderdiv">
                <p className='paragraphofStage'>Order in making</p>
                {orders
                  .filter((order) => order.stage === 'Order in Making')
                  .map((order) => (
                    <div
                      key={order.id}
                      className={`order-item DivOfstage ${shouldHighlight('Order in Making', order.size, timers[order.id + 'Order in Making'])}`}
                    >
                      <p>
                        Order ID: {order.id} - Stage: {order.stage} - Remaining Time:{' '}
                        {formatTime(timers[order.id + order.stage])}
                      </p>
                      <button className='ButtonOfNext' onClick={() => handleMoveOrder(order.id, 'Order Ready')}>Next</button>
                    </div>
                  ))}
              </div>

              {/* Ready Order Section */}
              <div className="col-sm-3 ReadyOrder orderdiv">
                <p className='paragraphofStage'>Order Ready</p>
                {orders
                  .filter((order) => order.stage === 'Order Ready')
                  .map((order) => (
                    <div 
                      key={order.id}
                      className={`order-item DivOfstage ${shouldHighlight('Order Ready', order.size, timers[order.id + 'Order Ready'])}`}
                    >
                      <p>
                        Order ID: {order.id} - Stage: {order.stage} - Remaining Time:{' '}
                        {formatTime(timers[order.id + order.stage])}
                      </p>
                      <button className='ButtonOfNext' onClick={() => handleMoveOrder(order.id, 'Order Picked')}>Next</button>
                    </div>
                  ))}
              </div>

              {/* Picked Order Section */}
              <div className="col-sm-3 PickedOrder orderdiv">
                <p className='paragraphofStage'>Order Picked</p>
                {orders
                  .filter((order) => order.stage === 'Order Picked')
                  .map((order) => (
                    <div className='DivOfstage' key={order.id}>
                      <p>
                        Order ID: {order.id} - Stage: {order.stage}   
                      </p>
                      <p className='Picked'>Picked</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <table className='maindivoftable'>
            <thead>
              <tr className='OrderTable'>
                <th className='OrderId'>Order ID</th>
                <th  className='OrderId'>Stage</th>
                <th className='OrderId'>Total time spent (time from order placed)</th>
                <th className='OrderId'>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderTable.map((order) => (
                <tr className='OrderTable' key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.stage}</td>
                  <td>
                    {order.stage === 'Order Picked'
                      ? formatTime(finalTime) // Display totalOrderTime for 'Picked' state
                      : formatTime(order.totalTimeSpent)}
                  </td>
                  <td>
                    {order.stage === 'Order Placed' || order.stage === 'Order in Making' ? (
                      <button className='Cancel' onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {orders.map((order) => (
          <div key={order.id}></div>
        ))}
      </div>

      <div>
        <p className='DeliveredPizza'>Total Pizzas Delivered Today: {orders.filter((order) => order.stage === 'Order Picked').length.toString().padStart(3, '0')}</p>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatNumber = (number) => (number < 10 ? `0${number}` : `${number}`);

  if (hours > 0) {
    return `${formatNumber(hours)} hr ${formatNumber(minutes)} min ${formatNumber(remainingSeconds)} sec`;
  } else if (minutes > 0) {
    return `${formatNumber(minutes)} min ${formatNumber(remainingSeconds)} sec`;
  } else {
    return `${remainingSeconds} sec`;
  }
};

export default PizzaDashboard;