const registerForm = document.getElementById("registerForm");
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPw = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const successMessage = document.getElementById("successMessage");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPw() &
    validateGender() &
    validateTerms();
  if (isValid) {
    const name = fullName.value.trim();
    registerForm.style.display = "none";
    successMessage.style.display = "block";
    successMessage.innerHTML = `Đăng ký thành công! 🎉 Xin chào <strong>${name}</strong>.`;
  }
});

// kiểm tra ngay khi rời ô vào input(xóa lỗi khi gõ lại)
fullName.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPw.addEventListener("blur", validateConfirmPw);

//input
fullName.addEventListener("input", function () {
  clearError("fullname");
});
email.addEventListener("input", function () {
  clearError("email");
});
phone.addEventListener("input", function () {
  clearError("phone");
});
password.addEventListener("input", function () {
  clearError("password");
});
confirmPw.addEventListener("input", function () {
  clearError("confirmPassword");
});

function validateFullname() {
  const values = fullName.value.trim();
  if (values === "") {
    showError("fullname", "Họ và tên không được để trống!");
    return false;
  }
  if (values.length < 3) {
    showError("fullname", "Họ và tên phải ít nhất 3 ký tự!");
    return false;
  }
  const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!regex.test(values)) {
    //kiểm tra nếu chuỗi không khớp với regex thì
    showError("fullname", "Họ và tên chỉ được chứa chữ cái và khoảng trắng!");
    return false;
  }
  clearError("fullname");
  return true;
}

function validateEmail() {
  const values = email.value.trim();

  if (values === "") {
    showError("email", "Email không được để trống!");
    return false;
  }
  // k tra đúng định dạng name@domina.com [^\s@]+ là có ít nhất 1 kí tự không là khoảng trắng hoặc @
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(values)) {
    showError("email", "Email chưa đúng định dạng. Thử lại!");
    return false;
  }
  clearError("email");
  return true;
}

function validatePhone() {
  const values = phone.value.trim();
  if (values === "") {
    showError("phone", "Số điện thoại không được để trống!");
    return false;
  }

  // kiểm tra đúng 10 chữ số
  // \d = chữ số, {10} = đúng 10 cái
  const regex = /^\d{10}$/;
  if (!regex.test(values)) {
    showError("phone", "Số điện thoại phải có đúng 10 chữ số!");
    return false;
  }

  // kiểm tra bắt đầu bằng 0
  // value[0] = ký tự đầu tiên
  if (values[0] !== "0") {
    showError("phone", "Số điện thoại phải bắt đầu từ số 0!");
    return false;
  }

  clearError("phone");
  return true;
}

// Mật khẩu — ≥ 8 ký tự, có chữ hoa, chữ thường, số:
function validatePassword() {
  const values = password.value.trim();
  if (values === "") {
    showError("password", "Mật khẩu không được để trống!");
    return false;
  }

  if (values.length < 8) {
    showError("password", "Mật khẩu phải ít nhất 8 kí tự!");
    return false;
  }

  // kiểm tra có ít nhất 1 chữ hoa
  // [A-Z] = chữ hoa, + = 1 hoặc nhiều
  const hasUppercase = /[A-Z]+/.test(values);
  if (!hasUppercase) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa!");
    return false;
  }

  // kiểm tra có ít nhất 1 chữ thường
  const hasLowercase = /[a-z]+/.test(values);
  if (!hasLowercase) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ thường!");
    return false;
  }

  // kiểm tra có ít nhất 1 chữ số
  // \d = chữ số
  const hasNumber = /\d+/.test(values);
  if (!hasNumber) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ số!");
    return false;
  }

  clearError("password");
  return true;
}

function validateConfirmPw() {
  const passwordValue = password.value.trim();
  const values = confirmPw.value.trim();
  if (values !== passwordValue) {
    showError("confirmPassword", "Xác nhận mật khẩu không đúng!");
    return false;
  }
  clearError("confirmPassword");
  return true;
}

function validateGender() {
  const radios = document.getElementsByName("gender");
  let isChecked = false;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      isChecked = true;
      break;
    }
  }
  if (!isChecked) {
    showError("gender", "Vui lòng chọn giới tính!");
    return false;
  }
  clearError("gender");
  return true;
}

function validateTerms() {
  //.checked = true nếu đã tích
  if (!terms.checked) {
    showError("terms", "Vui lòng đồng ý với điều khoản sử dụng!");
    return false;
  }
  // xóa lỗi thông báo đi
  clearError("terms");
  return true;
}
//Hàm hiện lỗi
function showError(fieldId, message) {
  const error = document.getElementById("error-" + fieldId);
  error.textContent = message;
  error.style.color = "red";
}

// Hàm xóa lỗi
function clearError(fieldId) {
  const error = document.getElementById("error-" + fieldId);
  error.textContent = "";
}
