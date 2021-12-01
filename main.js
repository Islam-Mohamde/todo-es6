const studentData = document.getElementById("student-data"),
  firstName = document.getElementById("first-name"),
  lastName = document.getElementById("last-name"),
  age = document.getElementById("age"),
  students = document.querySelector("#student");

if (localStorage.getItem("students")) {
  stdArr = JSON.parse(localStorage.getItem("students"));
} else {
  stdArr = [];
}

displayItem(stdArr);

studentData.onsubmit = (e) => {
  e.preventDefault();

  if (firstName.value == "" || lastName.value == "" || age.value == "") {
    document.querySelector(".error").innerHTML = `
    <h3 class="text-center alert alert-danger display-4"> fill item </h3>
    `;

    return false;
  }

  // uniqe id
  let youId = Math.floor(Math.random() * 5000);
  // create object
  let student = {
    youId: youId,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
  };
  // put the object in array
  stdArr.push(student);
  // add data to html table and localstorage
  localStorage.setItem("students", JSON.stringify(stdArr));
  displayStudents(student);

  clearInput();
};

// display item in table
displayStudents = (student) => {
  students.innerHTML += `
<tr class="text-center text-white">
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.age}</td>
    <td><i class="fa fa-trash btn btn-danger" onclick='deleteItem(${student.youId})' id='${student.youId}'></i></td>
</tr>
`;

  let data = JSON.parse(localStorage.getItem("students"));
  console.log(data);
  if (data.length == 1) {
    displayFoot();
  }
};

// clear all data
function clearInput() {
  firstName.value = "";
  lastName.value = "";
  age.value = "";
}

// dispaly all items from local storage in html
function displayItem(arr) {
  arr.map((student) => {
    students.innerHTML += `
            <tr class="text-center text-white">
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.age}</td>
                <td><i class="fa fa-trash btn btn-danger" onclick='deleteItem(${student.youId})' id='${student.youId}'></i></td>
            </tr>
            `;
  });

  if (arr.length > 0) {
    displayFoot();
  }
}
// delete item
deleteItem = (id) => {
  document.getElementById(id).parentNode.parentNode.remove();

  data = JSON.parse(localStorage.getItem("students"));
  newData = data.filter((item) => item.youId !== id);
  if (newData.length > 0) {
    localStorage.setItem("students", JSON.stringify(newData));
  } else {
    localStorage.setItem("students", "[]");
    document.querySelector("#students").innerHTML = "";
  }
};

// clear all items
clearAll = () => {
  localStorage.setItem("students", "[]");
  students.innerHTML = "";
  //document.querySelector("#students tfoot").remove();
};

// display foot of table
function displayFoot() {
  document.querySelector("#student").innerHTML += `<tfoot>
<tr>
<td colspan="4">
    <button class="btn btn-danger btn-block" onclick="clearAll()">Clear All</button>
</td>
</tr>
</tfoot>`;
}
