function printReceipt(inputs) {
  var items = buildItems(inputs);
  var allItem = buildAllItems(items);
  var cartItems = buildCartItems(allItem);
  var receipt = buildReceipt(cartItems);

  console.log(stringBuilder(receipt));

}

function buildItems(inputs) {
  var items = [];
  var length = 1;

  pushToItems(inputs, length, items);

  return items;
}

function pushToItems(inputs, length, items) {
  items.push({item: inputs[0], count: 1});
  for (var i = 1; i < inputs.length; i++) {
    if (inputs[i].length === 10) {
      var j = numberOfDifferentItems(inputs, i, items, length);
      if (j === length) {
        length++;
        items.push({item: inputs[i], count: 1});
      }
    }
    else {
      var temp = inputs[i].split("-");
      length++;
      items.push({item: temp[0], count: parseInt(temp[1])});
    }
  }
}

function numberOfDifferentItems(inputs, i, items, length) {
  for (var j = 0; j < length; j++) {
    if (items[j].item == inputs[i]) {
      items[j].count++;
      break;
    }
  }

  return j;
}

function buildAllItems(items) {
  var allItems = loadAllItems();

  for (var i = 0; i < items.length; i++) {
    depositItems(items, i, allItems);
  }

  return items;
}

function depositItems(items, i, allItems) {
  allItems.forEach(function (value) {
    if (items[i].item == value.barcode) {
      items[i].item = value;
    }
  })

  return allItems;
}

function buildCartItems(items) {
  var cartItems = [];
  var loadPromotion = loadPromotions();

  items.forEach(function (value, index) {
    var subtotal = (items[index].item.price * items[index].count);
    var saving = 0;
    saveTheCartItemsAfterTheBill(items, index, loadPromotion, cartItems, subtotal, saving);
  })

  return cartItems;
}

function saveTheCartItemsAfterTheBill(items, index, loadPromotion, cartItems, subtotal, saving) {
  loadPromotion[0].barcodes.forEach(function (value) {
    if (items[index].item.barcode == value) {
      subtotal -= Math.floor(items[index].count / 3) * items[index].item.price;
      saving = Math.floor(items[index].count / 3) * items[index].item.price;
    }
  })
  cartItems.push({cartItem: items[index], subtotal: subtotal, saving: saving});

  return cartItems;
}

function buildReceipt(cartItems) {
  var sum = 0;
  var costSaving = 0;

  cartItems.forEach(function (value) {
    sum += value.subtotal;
    costSaving += value.saving;
  })
  var receipt = {cartItems: cartItems, total: sum, costSaving: costSaving}

  return receipt;
}

function stringBuilder(receipt) {
  var str = "***<没钱赚商店>收据***\n";

  receipt.cartItems.forEach(function (value) {
    str += "名称：" + value.cartItem.item.name + "，数量：" + value.cartItem.count + value.cartItem.item.unit +
      "，单价：" + ( value.cartItem.item.price).toFixed(2) + "(元)，小计：" + (value.subtotal).toFixed(2) + "(元)\n"
  })
  str += "----------------------\n总计：" + (receipt.total).toFixed(2) + "(元)\n" + "节省：" + (receipt.costSaving).toFixed(2) + "(元)\n" +
    "**********************";

  return str;
}
