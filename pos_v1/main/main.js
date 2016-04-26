//TODO: Please write code in this file.
function printReceipt(inputs) {
  var Items=buildItems(inputs);
  var allItem=buildAllItems(Items);
  var cartItems=bulidCartItems(allItem);
  var Receipt=buildReceipt(cartItems);

  console.log(printf(Receipt));

}

function buildItems(inputs) {

  var Items=[];
  var length=1;
  Items.push({item:inputs[0],count:1});

  for(var i=1;i<inputs.length;i++) {
    if(inputs[i].length===10) {
      for(var j=0;j<length;j++) {
        if( Items[j].item===inputs[i]) {
          Items[j].count++;
          break;
        }
      }
      if(j===length) {
        length++;
        Items.push({item:inputs[i],count:1});
      }
    }
    else {
      var temp=inputs[i].split("-");
      length++;
     Items.push({item:temp[0],count:parseInt(temp[1])});
    }
  }

  return Items;

}

function buildAllItems(Items) {

  var allItems=loadAllItems();

  for(var i=0;i<Items.length;i++) {
    for(var j=0;j<allItems.length;j++) {
      if(Items[i].item===allItems[j].barcode) {
        Items[i].item=allItems[j];}
    }
  }

return Items;

}

function bulidCartItems(Items) {

  var cartItems = [];
  var loadPromotion=loadPromotions();

  for (var i = 0; i < Items.length; i++) {
    var subtotal = (Items[i].item.price * Items[i].count);
    for(var j=0;j<loadPromotion[0].barcodes.length;j++){
      if(Items[i].item.barcode===loadPromotion[0].barcodes[j]){
        subtotal-=Math.floor(Items[i].count/3)*Items[i].item.price;
      }
    }
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
  Receipt.CostSaving=buildCostSaving(cartItems);
  return Receipt;

}

function buildCostSaving(cartItems) {

  var loadPromotion=loadPromotions();
  var promotion=0;

  for (var i = 0; i < cartItems.length; i++) {
    var subtotal = (cartItems[i].cartItem.item.price * cartItems[i].cartItem.count);
    for(var j=0;j<loadPromotion[0].barcodes.length;j++){
      if(cartItems[i].cartItem.item.barcode===loadPromotion[0].barcodes[j]){
        promotion+=Math.floor(cartItems[i].cartItem.count/3)*cartItems[i].cartItem.item.price;
      }
    }
  }

  return  promotion;

}

function printf(Receipt) {

  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < Receipt.cartItems.length; i++) {
    str += "名称：" + Receipt.cartItems[i].cartItem.item.name + "，数量：" + Receipt.cartItems[i].cartItem.count + Receipt.cartItems[i].cartItem.item.unit +
      "，单价：" +( Receipt.cartItems[i].cartItem.item.price).toFixed(2) + "(元)，小计：" + (Receipt.cartItems[i].subtotal).toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + (Receipt.total).toFixed(2) + "(元)\n" +"节省："+(Receipt.CostSaving).toFixed(2)+"(元)\n"+
    "**********************";

  return str;

}
