export const cart = [];

export function addToCart(productId){
  let matchingItem;
  /*
    Checking if the item is already present in cart or not.
    */
  cart.forEach((item) => {      
    if (productId === item.productId) {
      matchingItem = item;
    }      
  });  
  /*
    If present then increase the quantity, otherwisw add the object in cart.
    */
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}