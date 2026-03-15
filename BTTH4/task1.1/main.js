//truy xuat cac phan tu DOM can tac dong
const inputStudentName = document.getElementById("inputStudentName");
const inputStudentScore = document.getElementById("inputStudentScore");
const btnAddStudent = document.getElementById("btnAddStudent");
const tableStudent = document.getElementById("studentTable");
const studentTableBody = document.getElementById("studentTableBody");
let students = [];
//gan su kien cho nut "them"
btnAddStudent.addEventListener("click", function () {
  const studentName = inputStudentName.value.trim();
  const studentScore = inputStudentScore.value.trim();

  if (!studentName) {
    alert("Vui long nhap Ho va ten!");
    return;
  } else if (studentScore < 0 || studentScore > 10 || studentScore == "") {
    alert("Vui long nhap lai diem!");
    return;
  }

  // //tao nut button moi
  const button = document.createElement("button");
  button.textContent = "Xoa";
  button.classList.add("delete-btn");
  //push vào mảng thay vì tạo tr trực tiếp
  students.push({
    name: studentName,
    score: Number(studentScore),
    rank: calRank(Number(studentScore)),
  });

  inputStudentName.value = "";
  inputStudentScore.value = "";
  inputStudentName.focus(MouseEvent);
  renderTable();
});
// event Delegation
studentTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.dataset.index);
    students.splice(index, 1); //xoa 1 phan tử ở vị trí bắt đầu index
    renderTable();
  }
});
function calRank(studentScore) {
  if (studentScore >= 8.5) {
    return "Gioi!";
  } else if (studentScore >= 7.5) {
    return "Kha!";
  } else if (studentScore >= 5.0) {
    return "Trung binh!";
  } else {
    return "Yeu!";
  }
}


function renderTable() {
  studentTableBody.innerHTML = ""; //xóa bảng cũ
  students.forEach(function (student, index) {
    const newTr = document.createElement("tr");
    if (student.rank == "Yeu!") {
      newTr.style.backgroundColor = "yellow";
    }
    newTr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.score}</td>
      <td>${student.rank}</td>
      <td><button class = "delete-btn" data-index = "${index}">Xoa</button></td>
    `;
    studentTableBody.appendChild(newTr);
  });
  const total = students.length;
  let avg = 0;
  if (total > 0) {
    let sum = 0;
    for (let i = 0; i < students.length; i++) {
      const score1 = Number(students[i].score);
      sum += score1;
    }
    avg = (sum / total).toFixed(2);
  }
  document.getElementById("summary").textContent =
    `Tong so sinh vien la: ${total} | Diem trung binh cua sinh vien la: ${avg}`;
}
inputStudentScore.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    btnAddStudent.click();
  }
});
