const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPw = document.getElementById("confirmPassword");
const birthDate = document.getElementById("dateOfBirth");
const successMessage = document.getElementById("successMessage");
const toggle = document.getElementById("toggle");

// Object lưu data toàn bộ form
const data = {
  name: "",
  date: "",
  gender: "",
  email: "",
  password: "",
};


// SỰ KIỆN CÁC NÚT

// Nút tiếp theo bước 1
document.getElementById("next-btn-1").addEventListener("click", function () {
  nextStep1();
});

// Nút tiếp theo bước 2
document.getElementById("next-btn-2").addEventListener("click", function () {
  nextStep2();
});

// Nút quay lại bước 2 → về bước 1
document.getElementById("return-btn").addEventListener("click", function () {
  showStep(1);
});

// Nút quay lại bước 3 → về bước 2
document.getElementById("back-btn-3").addEventListener("click", function () {
  showStep(2);
});

// Nút đăng ký ở bước 3
document.getElementById("submit-btn").addEventListener("click", function () {
  submitForm();
});

// Nút ẩn/hiện mật khẩu
toggle.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    toggle.textContent = "🙈";
  } else {
    password.type = "password";
    toggle.textContent = "👁";
  }
});


// HÀM CHUYỂN BƯỚC

function nextStep1() {
  const isValid =
    validateFullname() &
    validateDate() &
    validateGender();

  if (!isValid) return;

  // Lưu data bước 1
  data.name = fullName.value.trim();
  data.date = birthDate.value;

  const checkedGender = document.querySelector('input[name="gender"]:checked');
  if (checkedGender) {
    data.gender = checkedGender.value;
  } else {
    data.gender = "";
  }

  showStep(2);
}

function nextStep2() {
  const isValid =
    validateEmail() &
    validatePassword() &
    validateConfirmPw();

  if (!isValid) return;

  // Lưu data bước 2
  data.email = email.value.trim();
  data.password = password.value.trim();

  // Hiển thị tóm tắt lên bước 3
  document.getElementById("summary-name").textContent = data.name;
  document.getElementById("summary-date").textContent = data.date;
  document.getElementById("summary-gender").textContent = data.gender;
  document.getElementById("summary-email").textContent = data.email;

  showStep(3);
}

function submitForm() {
  document.querySelector(".form-wrapper").style.display = "none";
  successMessage.style.display = "block";
  successMessage.innerHTML = `Đăng ký thành công! 🎉 Xin chào <strong>${data.name}</strong>.`;
}


// HÀM ẨN/HIỆN TỪNG BƯỚC + CẬP NHẬT PROGRESS BAR

function showStep(n) {
  // Ẩn tất cả các bước
  const steps = document.querySelectorAll(".step");
  for (let i = 0; i < steps.length; i++) {
    steps[i].style.display = "none";
  }

  // Hiện đúng bước cần
  document.getElementById("step" + n).style.display = "block";

  // Cập nhật progress bar
  updateProgress(n);

  // Điền lại data khi quay về bước 1
  if (n === 1) {
    fullName.value = data.name;
    birthDate.value = data.date;

    // Check lại radio giới tính
    document.getElementsByName("gender").forEach(function (radio) {
      radio.checked = radio.value === data.gender;
    });
  }

  // Điền lại data khi quay về bước 2
  if (n === 2) {
    email.value = data.email;
    password.value = data.password;
  }
}


// HÀM CẬP NHẬT THANH TIẾN TRÌNH

function updateProgress(currentStep) {
  // Cập nhật từng vòng tròn bước
  for (let i = 1; i <= 3; i++) {
    const prog = document.getElementById("prog-" + i);
    prog.classList.remove("active", "done");

    if (i < currentStep) {
      prog.classList.add("done");    // bước đã qua
    } else if (i === currentStep) {
      prog.classList.add("active"); // bước hiện tại
    }
  }

  // Cập nhật đường nối giữa các bước
  for (let i = 1; i <= 2; i++) {
    const line = document.getElementById("line-" + i);
    if (i < currentStep) {
      line.classList.add("done");
    } else {
      line.classList.remove("done");
    }
  }
}


// SỰ KIỆN BLUR / INPUT

fullName.addEventListener("blur", validateFullname);
birthDate.addEventListener("change", validateDate);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPw.addEventListener("blur", validateConfirmPw);

// Đếm ký tự họ tên
fullName.addEventListener("input", function () {
  clearError("fullname");
  const counter = document.getElementById("counter");
  counter.textContent = `${fullName.value.length}/50`;
});

// Kiểm tra độ mạnh mật khẩu realtime
password.addEventListener("input", function () {
  clearError("password");
  const value = password.value.trim();
  const error = document.getElementById("error-password");

  if (value === "") {
    error.textContent = "";
    return;
  }

  if (
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[@_,.!]/.test(value)
  ) {
    error.textContent = "Mật khẩu mạnh!";
    error.style.color = "blue";
  } else if (value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value)) {
    error.textContent = "Mật khẩu trung bình!";
    error.style.color = "orange";
  } else {
    error.textContent = "Mật khẩu yếu!";
    error.style.color = "red";
  }
});

birthDate.addEventListener("input", function () {
  clearError("dateOfBirth");
});

email.addEventListener("input", function () {
  clearError("email");
});

confirmPw.addEventListener("input", function () {
  clearError("confirmPassword");
});


// VALIDATE TỪNG TRƯỜNG

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
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(values)) {
    showError("email", "Email chưa đúng định dạng. Thử lại!");
    return false;
  }
  clearError("email");
  return true;
}

function validateDate() {
  const valueDate = birthDate.value;
  if (valueDate === "") {
    showError("dateOfBirth", "Vui lòng chọn ngày sinh!");
    return false;
  }
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const ago = new Date(valueDate);
  if (ago > now) {
    showError("dateOfBirth", "Ngày sinh không hợp lệ!");
    return false;
  }
  clearError("dateOfBirth");
  return true;
}

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
  if (!/[A-Z]+/.test(values)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ hoa!");
    return false;
  }
  if (!/[a-z]+/.test(values)) {
    showError("password", "Mật khẩu phải có ít nhất 1 chữ thường!");
    return false;
  }
  if (!/\d+/.test(values)) {
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


// HIỆN / XÓA LỖI

function showError(fieldId, message) {
  const error = document.getElementById("error-" + fieldId);
  error.textContent = message;
  error.style.color = "red";
}

function clearError(fieldId) {
  const error = document.getElementById("error-" + fieldId);
  if (error) error.textContent = "";
}