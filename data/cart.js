export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3
  }
];

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