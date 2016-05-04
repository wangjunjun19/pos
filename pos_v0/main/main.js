function printReceipt(inputs) {
  var cartItems = buildCartItems(inputs);
  var receipt = buildReceipt(cartItems);

  console.log(stringBuilder(receipt));
}

function buildCartItems(inputs) {
  var cartItems = [];

  for (var i = 0; i < inputs.length; i++) {
    var subtotal = (inputs[i].price * inputs[i].count);
    cartItems.push({item: inputs[i], subtotal: subtotal});
  }

  return cartItems;
}

function buildReceipt(cartItems) {
  var sum = 0;
  var receipts = {};

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subtotal;
  }
  receipts.receipt = cartItems;
  receipts.total = sum;

  return receipts;
}

function stringBuilder(receipts) {
  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receipts.receipt.length; i++) {
    str += "名称：" + receipts.receipt[i].item.name + "，数量：" + receipts.receipt[i].item.count + receipts.receipt[i].item.unit +
      "，单价：" + receipts.receipt[i].item.price.toFixed(2) + "(元)，小计：" + receipts.receipt[i].subtotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + receipts.total.toFixed(2) + "(元)\n" +
    "**********************";

  return str;
}
