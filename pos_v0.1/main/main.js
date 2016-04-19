//TODO: Please write code in this file.
function printReceipt(inputs) {

}
function buildIteams(inputs) {
  var Iteams=[{iteam:inputs[0],count:1}];
  for(var i=1;i<inputs.length;i++) {
    for(var j=0;j<Iteams.length;j++) {
      if( Iteams[j].item.barcode===inputs[i].barcode) {
        Iteams[j].count++;
        break;
      }
    }
    if(j===Iteams.length) {
      Iteams.length++;
      Iteams.push({iteam:inputs[i],count:1});
    }
  }
  return Iteams;
}
function bulidCartIteams() {
  
}
