function printReceipt(inputs) {
  var items=buildItems(inputs);
  var cartItems=bulidCartItems(items);
  var receipt=buildReceipt(cartItems);

  console.log(stringBuilder(receipt));
}

function buildItems(inputs) {
  var items=[];
  var length=0;

  for(var i=0;i<inputs.length;i++) {
    var j=numberOfDifferentItems(inputs,i,items,length);
    if(j===length) {
      length++;
      items.push({item:inputs[i],count:1});
    }
  }

  return items;
}

function numberOfDifferentItems(inputs,i,items,length) {
  for(var j=0;j<length;j++) {
    if( items[j].item.barcode===inputs[i].barcode) {
      items[j].count++;
      break;
     }
  }

  return j;
}

function bulidCartItems(items) {
  var cartItems = [];

  for (var i = 0; i < items.length; i++) {
    var subtotal = (items[i].item.price * items[i].count);
    cartItems.push({cartItem: items[i], subtotal: subtotal});
  }

  return cartItems;
}

function buildReceipt(cartItems) {
  var sum = 0;
  var receipt= {};

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subtotal;
  }
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
