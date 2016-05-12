function printReceipt(inputs) {
  var items = buildItems(inputs);
  var cartItems = bulidCartItems(items);
  var receipt = buildReceipt(cartItems);

  console.log(stringBuilder(receipt));
}

function buildItems(inputs) {
  var items = [];
  var length = 0;

  inputs.forEach(function (value) {
    var j = numberOfDifferentItems(value, items, length);
    if (j === length) {
      length++;
      items.push({item: value, count: 1});
    }
  })

  return items;
}

function numberOfDifferentItems(value, items, length) {
  for (var j = 0; j < length; j++) {
    if (items[j].item.barcode == value.barcode) {
      items[j].count++;
      break;
    }
  }

  return j;
}

function bulidCartItems(items) {
  var cartItems = [];

  items.forEach(function (value) {
    var subtotal = (value.item.price * value.count);
    cartItems.push({cartItem: value, subtotal: subtotal});
  })

  return cartItems;
}

function buildReceipt(cartItems) {
  var sum = 0;
  var receipt = {};

  cartItems.forEach(function (value) {
    sum += value.subtotal;
  })
  receipt.cartItems = cartItems;
  receipt.total = sum;

  return receipt;
}

function stringBuilder(receipt) {
  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receipt.cartItems.length; i++) {
    str += "名称：" + receipt.cartItems[i].cartItem.item.name + "，数量：" + receipt.cartItems[i].cartItem.count + receipt.cartItems[i].cartItem.item.unit +
      "，单价：" + receipt.cartItems[i].cartItem.item.price.toFixed(2) + "(元)，小计：" + receipt.cartItems[i].subtotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + receipt.total.toFixed(2) + "(元)\n" +
    "**********************";

  return str;
}
