
const initialState = {
  orders: [],
};

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

  const remainingTime = Math.max(0, makingTime - elapsedTime); // Ensure remaining time is non-negative
  const isOverdue = remainingTime === 0;

  return { remainingTime, isOverdue };
};

const sortOrdersByDelay = (orders) => {
  return orders.slice().sort((a, b) => {
    const delayA = calculateRemainingTime(a.startTime, a.stage, a.size).remainingTime;
    const delayB = calculateRemainingTime(b.startTime, b.stage, b.size).remainingTime;
    return delayB - delayA;
  });
};

const MAX_ORDERS = 10;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: state.orders.length < MAX_ORDERS
          ? [...state.orders, { ...action.payload, remainingTime: calculateRemainingTime(new Date(), 'Order Placed', action.payload.size).remainingTime }]
          : state.orders,
      };
    case 'MOVE_ORDER':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                stage: action.payload.stage,
                startTime: new Date(),
                remainingTime: calculateRemainingTime(new Date(), action.payload.stage, order.size).remainingTime,
              }
            : order
        ),
      };
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.orderId),
      };
    default:
      return state;
  }
};

export default rootReducer;




// const initialState = {
//   orders: [],
// };

// // src/reducers/index.js

// const calculateRemainingTime = (startTime, stage, size) => {
//   const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60)); // in minutes

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

//   const remainingTime = makingTime - elapsedTime;
//   const isOverdue = remainingTime < 0;

//   return { remainingTime, isOverdue };
// };

// const sortOrdersByDelay = (orders) => {
//   return orders.slice().sort((a, b) => {
//     const delayA = calculateRemainingTime(a.startTime, a.stage, a.size).remainingTime;
//     const delayB = calculateRemainingTime(b.startTime, b.stage, b.size).remainingTime;
//     return delayB - delayA;
//   });
// };

// const MAX_ORDERS = 10;

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'PLACE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.length < MAX_ORDERS
//           ? [...state.orders, { ...action.payload, remainingTime: calculateRemainingTime(new Date(), 'Order Placed', action.payload.size).remainingTime }]
//           : state.orders,
//       };
//     case 'MOVE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.map((order) =>
//           order.id === action.payload.orderId
//             ? {
//                 ...order,
//                 stage: action.payload.stage,
//                 startTime: new Date(),
//                 remainingTime: calculateRemainingTime(new Date(), action.payload.stage, order.size).remainingTime,
//               }
//             : order
//         ),
//       };
//     case 'CANCEL_ORDER':
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id !== action.payload.orderId),
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;


// // src/reducers/index.js

// const initialState = {
//   orders: [],
// };

// const calculateRemainingTime = (startTime, stage, size) => {
//   const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60)); // in minutes

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

//   const remainingTime = makingTime - elapsedTime;
//   const isOverdue = remainingTime < 0;

//   return { remainingTime, isOverdue };
// };

// const MAX_ORDERS = 10; // Define MAX_ORDERS here

// const sortOrdersByDelay = (a, b) => {
//   const aDelay = calculateRemainingTime(a.startTime, a.stage, a.size).remainingTime;
//   const bDelay = calculateRemainingTime(b.startTime, b.stage, b.size).remainingTime;

//   return bDelay - aDelay;
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'PLACE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.length < MAX_ORDERS
//           ? [...state.orders, { ...action.payload, remainingTime: 10 }]
//           : state.orders,
//       };
//     case 'MOVE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.map((order) =>
//           order.id === action.payload.orderId
//             ? {
//                 ...order,
//                 stage: action.payload.stage,
//                 startTime: new Date(),
//                 remainingTime: calculateRemainingTime(new Date(), action.payload.stage, order.size),
//               }
//             : order
//         ).sort(sortOrdersByDelay),
//       };
//     case 'CANCEL_ORDER':
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id !== action.payload.orderId).sort(sortOrdersByDelay),
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;


// ----------------------------------------------------------------------------------
// // src/reducers/index.js
// const initialState = {
//   orders: [],
// };

// const calculateRemainingTime = (startTime, stage) => {
//   const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60)); // in minutes

//   switch (stage) {
//     case 'Order Placed':
//       return 10 - elapsedTime;
//     case 'Order in Making':
//       return 15 - elapsedTime;
//     case 'Order Ready':
//       return 5 - elapsedTime;
//     case 'Order Picked':
//       return 2 - elapsedTime;
//     default:
//       return 0;
//   }
// };

// const MAX_ORDERS = 10; // Define MAX_ORDERS here

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'PLACE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.length < MAX_ORDERS
//           ? [...state.orders, { ...action.payload, remainingTime: 10 }]
//           : state.orders,
//       };
//     case 'MOVE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.map((order) =>
//           order.id === action.payload.orderId
//             ? {
//                 ...order,
//                 stage: action.payload.stage,
//                 startTime: new Date(),
//                 remainingTime: calculateRemainingTime(new Date(), action.payload.stage),
//               }
//             : order
//         ),
//       };
//     case 'CANCEL_ORDER':
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id !== action.payload.orderId),
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;




// --------------------------------------------------------------------------------------------
// // src/reducers/index.js
// const initialState = {
//   orders: [],
// };

// const calculateRemainingTime = (startTime, stage) => {
//   const elapsedTime = Math.floor((new Date() - startTime) / (1000 * 60)); // in minutes

//   switch (stage) {
//     case 'Order Placed':
//       return 10 - elapsedTime;
//     case 'Order in Making':
//       return 15 - elapsedTime;
//     case 'Order Ready':
//       return 5 - elapsedTime;
//     case 'Order Picked':
//       return 2 - elapsedTime;
//     default:
//       return 0;
//   }
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'PLACE_ORDER':
//       return {
//         ...state,
//         orders: [...state.orders, { ...action.payload, remainingTime: 10 }],
//       };
//     case 'MOVE_ORDER':
//       return {
//         ...state,
//         orders: state.orders.map((order) =>
//           order.id === action.payload.orderId
//             ? {
//                 ...order,
//                 stage: action.payload.stage,
//                 startTime: new Date(),
//                 remainingTime: calculateRemainingTime(new Date(), action.payload.stage),
//               }
//             : order
//         ),
//       };
//     case 'CANCEL_ORDER':
//       return {
//         ...state,
//         orders: state.orders.filter((order) => order.id !== action.payload.orderId),
//       };
//     default:
//       return state;
//   }
// };

// export default rootReducer;