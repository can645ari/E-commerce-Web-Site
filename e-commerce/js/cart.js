let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function displayCartProduct() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  let result = "";
  cart.forEach((item) => {
    result += `
   <tr class="cart-item">
    <td></td>
    <td class="cart-image">
        <img src=${item.img.singleImage} alt="">
        <i class="bi bi-x delete-cart" data-id=${item.id}></i>
    </td>
    <td>${item.name}</td>
    <td>${item.price.newPrice.toFixed(2)} TL</td>
    <td class="product-quantity">${item.quantity}</td>
    <td class="product-subtotal">${(
      item.price.newPrice * item.quantity
    ).toFixed(2)} TL</td>
   </tr>
   `;
  });
  cartWrapper.innerHTML = result;
  removeCartItem();
}

displayCartProduct();

function removeCartItem() {
  const btnDeleteCart = document.querySelectorAll(".delete-cart");
  let cartItems = document.querySelector(".header-cart-count");

  btnDeleteCart.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      cart = cart.filter((item) => item.id !== Number(id));
      displayCartProduct();
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItems.innerHTML = cart.length;
      saveCartValues();
    });
  });
}

saveCartValues();

function saveCartValues() {
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  const button = document.querySelector(".btn-coupon");
  const buttonCode = document.querySelector(".couponCode");
  const fastCargoPrice = 45;
  let itemsTotal = 0;
  let discount = 100;
  let isDiscountApplied = localStorage.getItem("isDiscountApplied") === "true"; // Daha önce indirim yapıldı mı?
  let finalCartTotal = 0;
  let isFastCargoChecked =
    localStorage.getItem("isFastCargoChecked") === "true";

  if (cart.length > 0) {
    cart.map((item) => (itemsTotal += item.price.newPrice * item.quantity));
    localStorage.setItem("finalCartTotal", itemsTotal);
  } else if (cart.length == 0) {
    localStorage.setItem("isDiscountApplied", "false");
    localStorage.setItem("finalCartTotal", 0);
    subtotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;
    cartTotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;
    fastCargo.disabled = true;
    localStorage.setItem("isFastCargoChecked", "false");
    return;
  }

  if (isDiscountApplied) {
    itemsTotal = Number(localStorage.getItem("finalCartTotal"));
    itemsTotal -= discount;
    if (JSON.parse(localStorage.getItem("isFastCargoChecked")) === true) {
      fastCargo.checked = true;
      itemsTotal += fastCargoPrice;
    } else {
      fastCargo.checked = false;
      /*itemsTotal-=fastCargo;*/
    }
    finalCartTotal = itemsTotal;
    localStorage.setItem("finalCartTotal", finalCartTotal);
  }

  subtotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;
  cartTotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;

  fastCargo.addEventListener("change", function (e) {
    if (e.target.checked) {
      finalCartTotal = itemsTotal + fastCargoPrice;
      localStorage.setItem("finalCartTotal", finalCartTotal);
      cartTotal.innerHTML = `${(itemsTotal + fastCargoPrice).toFixed(2)} TL`;
      localStorage.setItem("isFastCargoChecked", "true");
    } else {
      console.log(itemsTotal);
      cartTotal.innerHTML = `${itemsTotal.toFixed(2)} TL`;
      finalCartTotal = itemsTotal;
      localStorage.setItem("finalCartTotal", finalCartTotal);
      localStorage.setItem("isFastCargoChecked", "false");
    }
  });

  button.addEventListener("click", (e) => {
    if (buttonCode.value === "CAN100") {
      isDiscountApplied = true;
      localStorage.setItem("isDiscountApplied", "true"); // İndirim uygulandı bilgisini kaydet
    }
  });
}
