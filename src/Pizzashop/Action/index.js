

let orderIdCounter = 0;

export const placeOrder = (order) => {
  const orderId = generateOrderId();
  
  return {
    type: 'PLACE_ORDER',
    payload: {
      id: orderId,
      ...order,
      stage: 'Order Placed',
      startTime: new Date(),
      remainingTime: calculateRemainingTime(new Date(), 'Order Placed', order.size).remainingTime,
    },
  };
};

export const moveOrder = (orderId, stage) => ({
  type: 'MOVE_ORDER',
  payload: {
    orderId,
    stage,
  },
});

export const cancelOrder = (orderId) => ({
  type: 'CANCEL_ORDER',
  payload: {
    orderId,
  },
});

// Helper function for calculating remaining time
const calculateRemainingTime = (startTime, stage, size) => {
  const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60));

  let makingTime;
  switch (size) {
    case 'Small':
      makingTime = 3;
      break;
    case 'Medium':
      makingTime = 4;
      break;
    case 'Large':
      makingTime = 5;
      break;
    default:
      makingTime = 0;
  }

  const remainingTime = Math.max(0, makingTime - elapsedTime);
  const isOverdue = remainingTime === 0;

  return { remainingTime, isOverdue };
};

// Helper function for generating order ID in the format '001', '002', '003', etc.
const generateOrderId = () => {
  orderIdCounter += 1;
  return orderIdCounter.toString().padStart(3, '0');
};


// ------------------------------------------------
// import { v4 as uuidv4 } from 'uuid';

// export const placeOrder = (order) => ({
//   type: 'PLACE_ORDER',
//   payload: {
//     id: uuidv4(),
//     ...order,
//     stage: 'Order Placed',
//     startTime: new Date(),
//     remainingTime: calculateRemainingTime(new Date(), 'Order Placed', order.size).remainingTime,
//   },
// });

// export const moveOrder = (orderId, stage) => ({
//   type: 'MOVE_ORDER',
//   payload: {
//     orderId,
//     stage,
//   },
// });

// export const cancelOrder = (orderId) => ({
//   type: 'CANCEL_ORDER',
//   payload: {
//     orderId,
//   },
// });

// // Helper function for calculating remaining time
// const calculateRemainingTime = (startTime, stage, size) => {
//   const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60));

//   let makingTime;
//   switch (size) {
//     case 'Small':
//       makingTime = 3;
//       break;
//     case 'Medium':
//       makingTime = 4;
//       break;
//     case 'Large':
//       makingTime = 5;
//       break;
//     default:
//       makingTime = 0;
//   }

//   const remainingTime = Math.max(0, makingTime - elapsedTime);
//   const isOverdue = remainingTime === 0;

//   return { remainingTime, isOverdue };
// };


// import { v4 as uuidv4 } from 'uuid';

// export const placeOrder = (order) => ({
//   type: 'PLACE_ORDER',
//   payload: {
//     id: uuidv4(),
//     ...order,
//     stage: 'Order Placed',
//     startTime: new Date(),
//     remainingTime: 10,
//   },
// });

// export const moveOrder = (orderId, stage) => ({
//   type: 'MOVE_ORDER',
//   payload: {
//     orderId,
//     stage,
//   },
// });

// export const cancelOrder = (orderId) => ({
//   type: 'CANCEL_ORDER',
//   payload: {
//     orderId,
//   },
// });
