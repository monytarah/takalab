#!/usr/bin/env node

const getMultiplier = (user, order_date) => {
  let data = require('./transaction-data')
  let totalAmountTransactionPerMonth = 0 
  let orderMonth = new Date(order_date).getMonth() + 1
  let orderYear = new Date(order_date).getFullYear()

  data.forEach(transaction => {
    let month = new Date(transaction.transaction_date).getMonth() + 1
    let year = new Date(transaction.transaction_date).getFullYear()

    if (transaction.user === user && orderMonth === month && orderYear === year) {
      totalAmountTransactionPerMonth += transaction.total_amount_transaction
    }
  })

  switch (true) {
    case totalAmountTransactionPerMonth < 1000000:
      return 1;
    case totalAmountTransactionPerMonth >= 1000000 && totalAmountTransactionPerMonth < 10000000:
      return 1.05;
    case totalAmountTransactionPerMonth >= 10000000 && totalAmountTransactionPerMonth < 20000000:
      return 1.1;
    case totalAmountTransactionPerMonth >= 20000000 && totalAmountTransactionPerMonth < 30000000:
      return 1.2;
    case totalAmountTransactionPerMonth >= 30000000 && totalAmountTransactionPerMonth < 40000000:
      return 1.3;
    case totalAmountTransactionPerMonth >= 40000000:
      return 1.4;
    default:
      break;
  }
}

const countTotalAmountTransactionAndPoints = (order, order_date) => {
  // Fungsi
  const { user, products } = order
  const multiplier = getMultiplier(user, order_date)
  let totalAmountTransaction = 0
  let totalItems = 0

  products.forEach(product => {
    totalItems += product.qty
    totalAmountTransaction += product.qty * product.price
  })

  return {
    totalAmountTransaction,
    totalPoints: Math.ceil(totalAmountTransaction / 10000 * multiplier),
    totalItems,
  };
};

console.log(countTotalAmountTransactionAndPoints({
  "user":"tony_stark",
  "products": [{
    "name":"Creme De Cacao Mcguinness",
    "price": 4,
    "qty": 59763
    }, {
    "name":"Pasta - Linguini, Dry",
    "price": 5,
    "qty": 118747
    }, {
    "name":"Plate Pie Foil",
    "price": 1,
    "qty": 294154
    }, {
    "name":"Fondant - Icing",
    "price": 4,
    "qty": 207086
    }, {
    "name":"Tomato - Green",
    "price": 1,
    "qty": 52698
    }]
  },
  '2021-02-15'
))
