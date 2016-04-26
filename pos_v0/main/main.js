function printReceipt(inputs) {
  
  var cartItems = buildCartItems(inputs);
  var Receipt = buildReceipt(cartItems);
  
  console.log(printf(Receipt));
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
  var Receipts = {};
  
  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subtotal;
  }
  Receipts.Receipt = cartItems;
  Receipts.total = sum;
  
  return Receipts;
  
}

function printf(Receipts) {
  
  var str = "***<没钱赚商店>收据***\n";
  
  for (var i = 0; i < Receipts.Receipt.length; i++) {
    str += "名称：" + Receipts.Receipt[i].item.name + "，数量：" + Receipts.Receipt[i].item.count + Receipts.Receipt[i].item.unit +
      "，单价：" + Receipts.Receipt[i].item.price.toFixed(2) + "(元)，小计：" + Receipts.Receipt[i].subtotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + Receipts.total.toFixed(2) + "(元)\n" +
    "**********************";
  
  return str;
  
}
