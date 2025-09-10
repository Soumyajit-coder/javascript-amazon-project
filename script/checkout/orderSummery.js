import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { formatWithExtraDays } from '../utilities/helper.js';
import { renderPaymentSummary } from './paymentSummery.js';


let currentDate = formatWithExtraDays(new Date(), 7);

export function renderOrderSummary(){
  let cartSummeryHTML = '';

  cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      let matchingProduct = getProduct(productId);

      const deliveryOptionId = Number(cartItem.deliveryOptionId);
      let deliveryOption = getDeliveryOption(deliveryOptionId);
      cartSummeryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">Delivery date:${formatWithExtraDays(new Date(), deliveryOption.deliveryDays)} </div>

              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
                  <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-item" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryDayOptions(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;

  });
  // js-order-summary
  document.querySelector('.js-order-summary').innerHTML = cartSummeryHTML;

  // Remove item from cart functionality
  document.querySelectorAll('.js-delete-item').forEach((button) => {
      button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          removeFromCart(productId);
          renderPaymentSummary();
          // Update in HTML
          const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
          cartContainer.remove();
      });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  function deliveryDayOptions(matchingProduct, cartItem){
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = formatWithExtraDays(new Date(), deliveryOption.deliveryDays);
      const todayDate = formatWithExtraDays(new Date());

      const deliveryPrice = deliveryOption.priceCent === 0 ? 'Free' : `$${(deliveryOption.priceCent / 100).toFixed(2)}`;
      // Check if this delivery option is selected for this cart item
      const isChecked = deliveryOption.id === Number(cartItem.deliveryOptionId);
      
      deliveryOptionsHTML += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input
            type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">${deliveryDate}</div>
            <div class="delivery-option-price">${deliveryPrice}</div>
          </div>
        </div>`;      
    });
    return deliveryOptionsHTML;
  }
}
