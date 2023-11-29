

let taskDetails;
let usernameFind;
let userNameLogin;
let allAdminTask;

//filter th task
function data() {

  let drop2 = document.getElementById("dropdownsts").value;
  taskDetails = JSON.parse(localStorage.getItem("Admin Task"));
  if (drop2 == "Status") {
    displayTable();

  }
  else if (!(drop2 == "Status")) {
    let table_Data2 = "";
    let j = 0;
    for (let i = 0; i < allAdminTask.length; i++) {
      if (drop2 == allAdminTask[i].Status && userNameLogin == allAdminTask[i].Assigned) {
        table_Data2 += `<tr>
                    <td>${j + 1}</td>
                    <td>${allAdminTask[i].Title}</td>
                    <td>${allAdminTask[i].Description}</td>
                   
                    <td>${allAdminTask[i].Status}</td>
                    <td>${allAdminTask[i].Duration}</td>
                    <td>${allAdminTask[i].Comments}</td>
                  
                    <td><button type="button" data-bs-toggle="modal"  data-bs-target="#editModal"class="edit-btn" onclick="edittask('${allAdminTask[i]._id
          }')"><i class="fas fa-edit"></i> Edit</button></td>
                    </tr>`;
        j++;
      }
    }
    document.getElementById("data1").innerHTML = table_Data2;

  }
  document.getElementById("dropdownsts").selectedIndex = 0;
}
/**
 * display all
 */
function displayTable() {

  let table_Data = "";
  allAdminTask = JSON.parse(localStorage.getItem("Admin Task"));
  usernameFind = JSON.parse(localStorage.getItem("LoginData"));
  for (let i = 0; i < usernameFind.length; i++) {
    if (localStorage.getItem("Username") == usernameFind[i].email) {
      userNameLogin = usernameFind[i].username;
    }
  }
  let j = 0;
  document.getElementById("para").innerHTML = "Welcome " + userNameLogin;
  for (let i = 0; i < allAdminTask.length; i++) {
    if (userNameLogin == allAdminTask[i].Assigned) {
      table_Data += `<tr>
        <td>${j + 1}</td>
        <td>${allAdminTask[i].Title}</td>
        <td>${allAdminTask[i].Description}</td>

        <td>${allAdminTask[i].Status}</td>
        <td>${allAdminTask[i].Duration}</td>
        <td>${allAdminTask[i].Comments}</td>
        <td><button type="button" class="edit-btn" onclick="openSweetAlert('${allAdminTask[i]._id
        }')"><i class="fas fa-edit"></i> Edit</button></td>
        </tr>
        `;
      j++;
    }
  }
  document.getElementById("data1").innerHTML = table_Data;
  searchSort();
  tableCheck();

  setTimeout(notificationTask, 2000);

}
//get all task of the user
function AdminTaskNew() {
  let AdminTask = new XMLHttpRequest();
  AdminTask.open("Get", "http://localhost:5000/api/v1/admin/getallTask");
  AdminTask.send();
  AdminTask.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminAllTask = JSON.parse(this.responseText);
        localStorage.setItem("Admin Task", this.responseText);
        displayTable();
      }
    }
  };
}
//  display edit option status of the user 
function openSweetAlert(progress_change) {
  const htmlContent = `
      <div style="display: flex; flex-direction: row;justify-content:space-around">
         
          <input type="radio" name="progress" value="In progress" id="inputProgress" class="custom-radio"> In Progress

          <input type="radio" name="progress" value="Completed" id="inputCompleted" class="custom-radio"> Completed

          <input type="radio" name="progress" value="Pending" id="inputPending" class="custom-radio"> Pending
      </div><br>
      <div style="display: flex; flex-direction: row;justify-content:space-around">
          <label>Update Comments</label>
          <input type="textarea" id="updateusercomment"> 
      </div>
      
      
  `;

  Swal.fire({
    title: 'Select Progress',
    html: htmlContent,
    confirmButtonText: 'Submit',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    focusConfirm: false,

    preConfirm: () => {
      const progress_Value = document.querySelector('input[name="progress"]:checked');
      const editedcmt = document.getElementById("updateusercomment").value;
      if (!progress_Value) {
        Swal.showValidationMessage("Please select the Radio Button");
        return false;
      }
      else if (editedcmt.trim() == "") {
        Swal.showValidationMessage("Please enter the updated comments");
        return false;
      }
      const progressValue = progress_Value.value;
      return progressValue;
    },
  }).then((result) => {
    let comments = document.getElementById("updateusercomment").value;
    localStorage.setItem("editcomments", comments)
    localStorage.setItem("Progess", result.value);
    Progesschange(progress_change);
    if (result.isConfirmed) {
      Swal.fire({
        title: "Selected Progress's : " + result.value,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
    }
  });
}
// edit the status of the user by specific id
function Progesschange(progress_change) {

  let localdata = localStorage.getItem("Progess");
  let updatecmt = localStorage.getItem("editcomments")
  let Update_task = new XMLHttpRequest();
  Update_task.open("PUT", `http://localhost:5000/api/v1/admin/updateTask/${progress_change}`);
  Update_task.setRequestHeader("Content-Type", "application/json");
  Update_task.send(JSON.stringify({
    Status: localdata, Comments: updatecmt
  }));
  Update_task.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminTaskNew();

      }
    }

  }
}
window.onload = displayTable;
//user search task function
function searchSort() {
  document.getElementById("searchInput").addEventListener("input", function () {
    let input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("editableTable");
    tbody = document.getElementById("data1");
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (let j = 0; j < td.length; j++) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {

          tr[i].style.display = "none";
        }
      }
    }
  });
  tableCheck();
}
// display no task image if no task available
function tableCheck() {
  let table = document.getElementById('editableTable');
  let searchinput = document.getElementById('searchInput');
  let replacementImage = document.getElementById('replaceimage');
  if (table.getElementsByTagName('tbody')[0].childElementCount === 0) {
    table.style.display = 'none';
    replacementImage.style.display = 'block';
    searchinput.style.display = "none";
  } else {
    table.style.display = 'table';
    replacementImage.style.display = 'none';
    searchinput.style.display = "block";
  }
}
//notify the user about newly added task
function notificationTask() {

  let TotalTasks = JSON.parse(localStorage.getItem("Admin Task"));
  for (key in TotalTasks) {
    if (userNameLogin == TotalTasks[key].Assigned) {

      if (TotalTasks[key].Notification == true) {

        alert(`Admin assigned you a ${TotalTasks[key].Title}...`);

        const http = new XMLHttpRequest();
        http.open(
          "PUT",
          `http://localhost:5000/api/v1/admin/updateTask/${TotalTasks[key]._id}`,
          true
        );
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({ Notification: false }));
        http.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              AdminTaskNew();
            }
          }
        };
      }
    }
  }
}