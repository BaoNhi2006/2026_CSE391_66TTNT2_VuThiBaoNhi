// //truy xuat cac phan tu DOM can tac dong
// const inputStudentName = document.getElementById("inputStudentName");
// const inputStudentScore = document.getElementById("inputStudentScore");
// const btnAddStudent = document.getElementById("btnAddStudent");
// const tableStudent = document.getElementById("studentTable");
// const studentTableBody = document.getElementById("studentTableBody");
// const inputSearch = document.getElementById("inputSearch");
// const buttonSearch = document.getElementById("search-btn");

// let students = [];
// let filteredStudents = [];
// let nextId = 1;
// //gan su kien cho nut "them"
// btnAddStudent.addEventListener("click", function () {
//   const studentName = inputStudentName.value.trim();
//   const studentScore = inputStudentScore.value.trim();

//   if (!studentName) {
//     alert("Vui long nhap Ho va ten!");
//     return;
//   } else if (studentScore < 0 || studentScore > 10 || studentScore == "") {
//     alert("Vui long nhap lai diem!");
//     return;
//   }

//   //tao dong tr moi
//   const trNew = document.createElement("tr");
//   //tao td
//   const tdSTT = document.createElement("td");
//   tdSTT.textContent = "";
//   const tdName = document.createElement("td");
//   tdName.textContent = studentName;
//   const tdScore = document.createElement("td");
//   tdScore.textContent = studentScore;
//   const tdRank = document.createElement("td");
//   tdRank.textContent = calRank(studentScore);
//   const tdAction = document.createElement("td");
//   //tao nut button moi
//   const button = document.createElement("button");
//   button.textContent = "Xoa";
//   button.classList.add("delete-btn");
//   //them button vao tdAction
//   tdAction.appendChild(button);
//   trNew.appendChild(tdSTT);
//   trNew.appendChild(tdName);
//   trNew.appendChild(tdScore);
//   trNew.appendChild(tdRank);
//   trNew.appendChild(tdAction);
//   studentTableBody.appendChild(trNew);
//   updateSTT();

//   function calRank(studentScore) {
//     if (studentScore >= 8.5) {
//       return "Gioi!";
//     } else if (studentScore >= 7.5) {
//       return "Kha!";
//     } else if (studentScore >= 5.0) {
//       return "Trung binh!";
//     } else {
//       trNew.style.backgroundColor = "yellow";
//       return "Yeu!";
//     }
//   }

//   //2
//   inputStudentName.value = "";
//   inputStudentScore.value = "";
//   inputStudentName.focus(MouseEvent);
//   //xoa nut ta khoi hang khi bam
//   button.addEventListener("click", function () {
//     this.closest("tr").remove();
//     updateSTT();
//   });
// });

// function updateSTT() {
//   const allRows = studentTableBody.querySelectorAll("tr");
//   for (let i = 0; i < allRows.length; i++) {
//     allRows[i].cells[0].textContent = i + 1;
//   }

//   const total = allRows.length;
//   let avg = 0;
//   if (total > 0) {
//     let sum = 0;
//     for (let i = 0; i < allRows.length; i++) {
//       const score = Number(allRows[i].cells[2].textContent);
//       sum += score;
//     }
//     avg = (sum / total).toFixed(2);
//   }
//   document.getElementById("summary").textContent =
//     `Tong so sinh vien la: ${total} | Diem trung binh cua sinh vien la: ${avg}`;
// }
// inputStudentScore.addEventListener("keydown", function (e) {
//   if (e.key == "Enter") {
//     e.preventDefault();
//     btnAddStudent.click();
//   }
// });
// // let found = false; //kiem tra xem co tim thay khong
// //gan su kien cho search
// inputSearch.addEventListener("input", function () {
//   const keyword = inputSearch.value.toLowerCase();
//   // console.log(keyword);
//   const allRows = studentTableBody.querySelectorAll("tr");
//   for (let i = 0; i < allRows.length; i++) {
//     const studentName = allRows[i].cells[1].textContent.toLowerCase();
//     if (studentName.includes(keyword)) {
//       allRows[i].style.display = "";
//       // found = true;
//     } else {
//       allRows[i].style.display = "none";
//     }
//   }
// });
// buttonSearch.addEventListener("click", function () {
//   const newP = document.createElement("p");
//   newP.textContent = "Không tìm thấy kết quả!";

//   let found = false;
//   if (!found) {
//     noResult.style.display = "block";
//   } else {
//     noResult.style.display = "none";
//   }
// });

//// dùng mảng
//truy xuat cac phan tu DOM can tac dong
const inputStudentName = document.getElementById("inputStudentName");
const inputStudentScore = document.getElementById("inputStudentScore");
const btnAddStudent = document.getElementById("btnAddStudent");
const tableStudent = document.getElementById("studentTable");
const studentTableBody = document.getElementById("studentTableBody");
const inputSearch = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("search-btn");
const selectRank = document.getElementById("selectRank");
const scoreSort = document.getElementById("scoreSort");
let students = [];
let filteredStudents = [];
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
  applyFilters();
});
// event Delegation
studentTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.dataset.index);
    const studentToDelete = filteredStudents[index];
    let originalIndex = -1;
    for (let i = 0; i < students.length; i++) {
      if (
        students[i].name === studentToDelete.name &&
        students[i].score === studentToDelete.score
      ) {
        originalIndex = i;
        break;
      }
    }
    students.splice(originalIndex, 1); //xoa 1 phan tử ở vị trí bắt đầu index
    applyFilters();
  }
});

//Xếp loại score
function calRank(studentScore) {
  if (studentScore >= 8.5) {
    return "Gioi";
  } else if (studentScore >= 7.5) {
    return "Kha";
  } else if (studentScore >= 5.0) {
    return "Trung binh";
  } else {
    return "Yeu";
  }
}
inputStudentScore.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    btnAddStudent.click();
  }
});
//Hàm vẽ bảng
function renderTable(arr) {
  studentTableBody.innerHTML = ""; //xóa bảng cũ
  arr.forEach(function (student, index) {
    const newTr = document.createElement("tr");
    if (student.rank == "Yeu") {
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

//viết hàm tìm kiếm
let sortOrder = "none";
function applyFilters() {
  const keyword = inputSearch.value.toLowerCase();
  // const sort =
  filteredStudents = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].name.toLowerCase().includes(keyword)) {
      filteredStudents.push(students[i]);
    }
  }
  const noResult = document.getElementById("noResult");
  if (keyword !== "" && filteredStudents.length === 0) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }
  // lọc xếp loại

  const rankBy = selectRank.value;
  let temArr = [];
  if (rankBy !== "default") {
    for (let i = 0; i < filteredStudents.length; i++) {
      if (rankBy === filteredStudents[i].rank) {
        temArr.push(filteredStudents[i]);
      }
    }
    filteredStudents = temArr;
  }
  //sắp xếp bảng
  if (sortOrder === "asc") {
    filteredStudents.sort(function (a, b) {
      return a.score - b.score;
    });
  } else if (sortOrder === "desc") {
    filteredStudents.sort(function (a, b) {
      return b.score - a.score;
    });
  }
  // renderTable(filteredStudents);

  renderTable(filteredStudents);
}

scoreSort.addEventListener("click", function () {
  if (sortOrder === "none" || sortOrder === "desc") {
    sortOrder = "asc";
    scoreSort.textContent = "Diem ▲";
  } else {
    sortOrder = "desc";
    scoreSort.textContent = "Diem ▼";
  }
  applyFilters();
});

inputSearch.addEventListener("input", applyFilters);
buttonSearch.addEventListener("click", applyFilters);
selectRank.addEventListener("change", applyFilters);
