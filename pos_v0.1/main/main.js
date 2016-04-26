//TODO: Please write code in this file.
function printReceipt(inputs) {
  
  var Items=buildItems(inputs);
  var CartItems=bulidCartItems(Items);
  var Receipt=buildReceipt(CartItems);
  
  console.log(printf(Receipt));
  
}

function buildItems(inputs) {
  
  var Items=[];
  var length=0;
  
  for(var i=0;i<inputs.length;i++) {
    for(var j=0;j<length;j++) {
      if( Items[j].item.barcode===inputs[i].barcode) {
        Items[j].count++;
        break;
      }
    }
    if(j===length) {
      length++;
      Items.push({item:inputs[i],count:1});
    }
  }
  
  return Items;
  
}

function bulidCartItems(Items) {
  
  var cartItems = [];
  
  for (var i = 0; i < Items.length; i++) {
    var subtotal = (Items[i].item.price * Items[i].count);
    cartItems.push({cartItem: Items[i], subtotal: subtotal});
  }
  
  return cartItems;
  
}

function buildReceipt(cartItems) {
  
  var sum = 0;
  var Receipt= {};
  
  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subtotal;
  }
  Receipt.cartItems = cartItems;
  Receipt.total = sum;
  
  return Receipt;
  
}

function printf(Receipt) {
  
  var str = "***<没钱赚商店>收据***\n";
  
  for (var i = 0; i < Receipt.cartItems.length; i++) {
    str += "名称：" + Receipt.cartItems[i].cartItem.item.name + "，数量：" + Receipt.cartItems[i].cartItem.count + Receipt.cartItems[i].cartItem.item.unit +
      "，单价：" + Receipt.cartItems[i].cartItem.item.price.toFixed(2) + "(元)，小计：" + Receipt.cartItems[i].subtotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + Receipt.total.toFixed(2) + "(元)\n" +
    "**********************";
  
  return str;
  
}
