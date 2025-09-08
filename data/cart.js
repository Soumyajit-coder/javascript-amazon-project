export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3
  },
  {
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 1
  }];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
  saveToStorage();
}

// Remove from cart function
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;  
  saveToStorage();
}