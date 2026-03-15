// TRUY XUẤT DOM
const orderForm      = document.getElementById("orderForm");
const product        = document.getElementById("product");
const quantity       = document.getElementById("quantity");
const deliveryDate   = document.getElementById("deliveryDate");
const address        = document.getElementById("address");
const note           = document.getElementById("note");
const noteCount      = document.getElementById("noteCount");
const totalPrice     = document.getElementById("totalPrice");
const successMessage = document.getElementById("successMessage");


// TẠO DIV XÁC NHẬN BẰNG JS

const confirmBox = document.createElement("div");
confirmBox.id = "confirmBox";
confirmBox.style.display = "none";

const confirmTitle = document.createElement("h3");
confirmTitle.textContent = "Xác nhận đơn hàng";

const orderSummary = document.createElement("div");
orderSummary.id = "orderSummary";

const confirmButtons = document.createElement("div");
confirmButtons.classList.add("confirm-buttons");

const btnConfirm = document.createElement("button");
btnConfirm.textContent = "Xác nhận";
btnConfirm.classList.add("btnConfirm");

const btnCancel = document.createElement("button");
btnCancel.textContent = "Hủy";
btnCancel.classList.add("btnCancel");

confirmButtons.appendChild(btnConfirm);
confirmButtons.appendChild(btnCancel);
confirmBox.appendChild(confirmTitle);
confirmBox.appendChild(orderSummary);
confirmBox.appendChild(confirmButtons);

document.querySelector(".page-container").appendChild(confirmBox);


// GIÁ SẢN PHẨM

const prices = {
  "Ao":   150000,
  "Quan": 200000,
  "Giay": 350000,
};

// HÀM TIỆN ÍCH
function showError(fieldId, message) {
  const error = document.getElementById("error-" + fieldId);
  error.textContent = message;
  error.style.color = "red";
}

function clearError(fieldId) {
  const error = document.getElementById("error-" + fieldId);
  error.textContent = "";
}


// TÍNH TỔNG TIỀN TỰ ĐỘNG

function calcTotal() {
  const productValue  = product.value;
  const quantityValue = Number(quantity.value);

  if (!productValue || !quantityValue || quantityValue < 1) {
    document.getElementById("totalGroup").style.display = "none";
    return;
  }

  const price = prices[productValue];
  const total = price * quantityValue;
  totalPrice.textContent = total.toLocaleString("vi-VN") + " đ";
  document.getElementById("totalGroup").style.display = "block";
}

product.addEventListener("change", calcTotal);
quantity.addEventListener("input", calcTotal);

// ĐẾM KÝ TỰ REALTIME CHO GHI CHÚ
note.addEventListener("input", function () {
  const length = note.value.length;
  noteCount.textContent = length + "/200";

  if (length > 200) {
    noteCount.style.color = "red";
  } else {
    noteCount.style.color = "#888";
  }
  clearError("note");
});

// CÁC HÀM VALIDATE

function validateProduct() {
  if (product.value === "") {
    showError("product", "Vui lòng chọn sản phẩm!");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  const value = Number(quantity.value);

  if (quantity.value === "") {
    showError("quantity", "Vui lòng nhập số lượng!");
    return false;
  }
  if (!Number.isInteger(value) || value < 1 || value > 99) {
    showError("quantity", "Số lượng phải là số nguyên từ 1 đến 99!");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDeliveryDate() {
  const value = deliveryDate.value;

  if (value === "") {
    showError("deliveryDate", "Vui lòng chọn ngày giao hàng!");
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(value);
  const max = new Date();
  max.setDate(today.getDate() + 30);

  if (selected < today) {
    showError("deliveryDate", "Ngày giao không được là ngày trong quá khứ!");
    return false;
  }
  if (selected > max) {
    showError("deliveryDate", "Ngày giao không được quá 30 ngày từ hôm nay!");
    return false;
  }
  clearError("deliveryDate");
  return true;
}

function validateAddress() {
  const value = address.value.trim();

  if (value === "") {
    showError("address", "Vui lòng nhập địa chỉ giao hàng!");
    return false;
  }
  if (value.length < 10) {
    showError("address", "Địa chỉ phải có ít nhất 10 ký tự!");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  if (note.value.length > 200) {
    showError("note", "Ghi chú không được quá 200 ký tự!");
    return false;
  }
  clearError("note");
  return true;
}

function validatePayment() {
  const radios    = document.getElementsByName("payment");
  let   isChecked = false;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked) {
    showError("payment", "Vui lòng chọn phương thức thanh toán!");
    return false;
  }
  clearError("payment");
  return true;
}


// SUBMIT

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateProduct()      &
    validateQuantity()     &
    validateDeliveryDate() &
    validateAddress()      &
    validateNote()         &
    validatePayment();

  if (isValid) {
    const productName = product.options[product.selectedIndex].text;
    const qty         = quantity.value;
    const price       = prices[product.value];
    const total       = (price * Number(qty)).toLocaleString("vi-VN");
    const date        = deliveryDate.value;

    const radios = document.getElementsByName("payment");
    let paymentMethod = "";
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        paymentMethod = radios[i].value;
        break;
      }
    }

    orderSummary.innerHTML = `
      <p>🛍️ Sản phẩm: <strong>${productName}</strong></p>
      <p>📦 Số lượng: <strong>${qty}</strong></p>
      <p>💰 Tổng tiền: <strong>${total} đ</strong></p>
      <p>📅 Ngày giao: <strong>${date}</strong></p>
      <p>💳 Thanh toán: <strong>${paymentMethod}</strong></p>
    `;

    orderForm.style.display  = "none";
    confirmBox.style.display = "block";
  }
});


// NÚT XÁC NHẬN

btnConfirm.addEventListener("click", function () {
  confirmBox.style.display     = "none";
  successMessage.style.display = "block";
  successMessage.innerHTML     = "Đặt hàng thành công! 🎉 Cảm ơn bạn đã đặt hàng!";
});


// NÚT HỦY
btnCancel.addEventListener("click", function () {
  confirmBox.style.display = "none";
  orderForm.style.display  = "block";
});


// BLUR

product.addEventListener("blur",      validateProduct);
quantity.addEventListener("blur",     validateQuantity);
deliveryDate.addEventListener("blur", validateDeliveryDate);
address.addEventListener("blur",      validateAddress);
note.addEventListener("blur",         validateNote);

document.getElementsByName("payment").forEach(function (radio) {
  radio.addEventListener("change", validatePayment);
});


// INPUT — xóa lỗi khi gõ lại

product.addEventListener("change",     function () { clearError("product"); });
quantity.addEventListener("input",     function () { clearError("quantity"); });
deliveryDate.addEventListener("input", function () { clearError("deliveryDate"); });
address.addEventListener("input",      function () { clearError("address"); });