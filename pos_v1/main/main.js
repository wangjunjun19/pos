function printReceipt(inputs) {
  var items=buildItems(inputs);
  var allItem=buildAllItems(items);
  var cartItems=buildCartItems(allItem);
  var receipt=buildReceipt(cartItems);

  console.log(stringBuilder(receipt));

}

function buildItems(inputs) {
  var items=[];
  var length=1;

  items.push({item:inputs[0],count:1});
  for(var i=1;i<inputs.length;i++) {
     if(inputs[i].length===10) {
      var j=numberOfDifferentItems(inputs,i,items,length);
      if(j===length) {
        length++;
        items.push({item:inputs[i],count:1});
      }
     }
     else {
     var temp=inputs[i].split("-");
     length++;
     items.push({item:temp[0],count:parseInt(temp[1])});
     }
  }

  return items;
}

function numberOfDifferentItems(inputs,i,items,length) {
  for(var j=0;j<length;j++) {
    if( items[j].item===inputs[i]) {
      items[j].count++;
      break;
    }
  }

  return j;
}

function buildAllItems(items) {
  var allItems=loadAllItems();

  for(var i=0;i<items.length;i++) {
    for(var j=0;j<allItems.length;j++) {
      if(items[i].item===allItems[j].barcode) {
        items[i].item=allItems[j];}
    }
  }

  return items;
}

function buildCartItems(items) {
  var cartItems = [];
  var loadPromotion=loadPromotions();

  for (var i = 0; i <items.length; i++) {
    var subtotal = (items[i].item.price * items[i].count);
    var saving=0;
    for(var j=0;j<loadPromotion[0].barcodes.length;j++){
      if(items[i].item.barcode===loadPromotion[0].barcodes[j]){
        subtotal-=Math.floor(items[i].count/3)*items[i].item.price;
        saving=Math.floor(items[i].count/3)*items[i].item.price;
      }
    }
    cartItems.push({cartItem: items[i], subtotal: subtotal,saving:saving});
  }

  return cartItems;
}

function buildReceipt(cartItems) {
  var sum = 0;
  var costSaving=0;

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subtotal;
    costSaving += cartItems[i].saving;
  }
  var receipt = {cartItems:cartItems, total: sum, costSaving: costSaving}

  return receipt;
}


function stringBuilder(receipt) {
  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receipt.cartItems.length; i++) {
    str += "名称：" + receipt.cartItems[i].cartItem.item.name + "，数量：" + receipt.cartItems[i].cartItem.count + receipt.cartItems[i].cartItem.item.unit +
      "，单价：" +( receipt.cartItems[i].cartItem.item.price).toFixed(2) + "(元)，小计：" + (receipt.cartItems[i].subtotal).toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + (receipt.total).toFixed(2) + "(元)\n" +"节省："+(receipt.costSaving).toFixed(2)+"(元)\n"+
    "**********************";

  return str;
}
