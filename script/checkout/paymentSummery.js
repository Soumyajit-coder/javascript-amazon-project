import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';


export function renderPaymentSummary(){

    let productPriceCent= 0;
    let shippingPriceCent = 0;
    let paymentSummeyHTML = '';

    cart.forEach((cartItem) => {

        const product = getProduct(cartItem.productId);
        productPriceCent += product.priceCents * cartItem.quantity;

        let deliveryOptionId = Number(cartItem.deliveryOptionId);

        const deliveryOption = getDeliveryOption(deliveryOptionId);
        shippingPriceCent += deliveryOption.priceCent;
    });

    const totalPriceCent = productPriceCent + shippingPriceCent;
    const taxPriceCent = totalPriceCent * 0.1;
    const totalPrice = totalPriceCent + taxPriceCent;
    // console.log(productPriceCent / 100);
    // console.log(shippingPriceCent / 100);
    
    paymentSummeyHTML = `
        <div class="payment-summary">
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${Math.round(productPriceCent / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(shippingPriceCent) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(Math.round(totalPriceCent) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(taxPriceCent) / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(Math.round(totalPrice) / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummeyHTML;
}