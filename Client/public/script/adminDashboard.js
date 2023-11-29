let AdminAllTask;
/**
 * get all task
 */
function AdminTask() {

  let AdminTask = new XMLHttpRequest();
  AdminTask.open("Get", "http://localhost:5000/api/v1/admin/getallTask");
  AdminTask.send();
  AdminTask.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminAllTask = JSON.parse(this.responseText);
        localStorage.setItem("Admin Task", this.responseText);
        DisplayAdminTask();
      }
    }
  }
}
/**
 * displays all task added in table
 */
function DisplayAdminTask() {
  let Data = "";
  for (let i = 0; i < AdminAllTask.length; i++) {
    Data += `<tr>
        <td>${i + 1}</td>
        <td>${AdminAllTask[i].Title}</td>
        <td>${AdminAllTask[i].Description}</td>
        <td> ${AdminAllTask[i].Assigned}</td>
        <td><p class=${AdminAllTask[i].Status}>${AdminAllTask[i].Status}</p></td>
        <td> ${AdminAllTask[i].Duration}</td>
        <td> ${AdminAllTask[i].Comments}</td>
        <td> ${AdminAllTask[i].TaskCreatedAt}</td>
        <td>  <button type="button" data-bs-toggle="modal"  data-bs-target="#editModal"class="edit-btn" onclick="edittask('${AdminAllTask[i]._id}')"><i class="fas fa-edit"></i> Edit</button>
        <button type="button" class="delete-btn" data-bs-toggle="modal" id="DeleteButton" data-bs-target="#staticBackdrop"  onclick="onestepDelete('${AdminAllTask[i]._id}')"><i class="fas fa-trash-alt"></i> Delete</button></td</tr>`
  }
  document.getElementById("TableData").innerHTML = Data;
  searchSort();

}
/**
 * 
 * @param  unique_id get the details of specific id and prepopulate that data in editform
 */
function edittask(unique_id) {

  let popupData1 = "";
  let Assigned_dropdown1 = localStorage.getItem("LoginData");
  Assigned_dropdown1 = JSON.parse(Assigned_dropdown1)
  popupData1 += ` <option selected>Select UserName</option>`
  for (let i = 0; i < Assigned_dropdown1.length; i++) {
    popupData1 += `<option value=${Assigned_dropdown1[i].username}>${Assigned_dropdown1[i].username}</option>`
  }
  document.getElementById("username1").innerHTML = popupData1;
  let Edit_modal_task = `<button type="button" class="btn btn-primary"  data-bs-dismiss="modal"onclick="EditTaskUpdate('${unique_id}')">Save changes</button>`;

  document.getElementById("editmodalDOM").innerHTML = Edit_modal_task;
  for (let i = 0; i < AdminAllTask.length; i++) {
    if (AdminAllTask[i]._id === unique_id) {
      document.getElementById("titleInput1").value = AdminAllTask[i].Title;
      document.getElementById("descriptionInput1").value = AdminAllTask[i].Description;
      document.getElementById("username1").value = AdminAllTask[i].Assigned;
      document.getElementById("statusDropdown1").value = AdminAllTask[i].Status;
      document.getElementById("durationinput").value = AdminAllTask[i].Duration;
      document.getElementById("commentinput").value = AdminAllTask[i].Comments;
    }
  }

}
/**
 * 
 * @param  UpdateTask edit the task by specific id
 */
function EditTaskUpdate(UpdateTask) {
  event.preventDefault();
  let TitleUpdate = document.getElementById("titleInput1").value;
  let DescriptionUpdate = document.getElementById("descriptionInput1").value;
  let UsernameUpdate = document.getElementById("username1").value;
  let DurationUpdate = document.getElementById("durationinput").value;
  let CommentUpdate = document.getElementById("commentinput").value;
  let StatusUpdate = document.getElementById("statusDropdown1").value;
  let UpdateTask1 = new XMLHttpRequest();
  UpdateTask1.open("PUT", `http://localhost:5000/api/v1/admin/updateTask/${UpdateTask}`);
  UpdateTask1.setRequestHeader("Content-Type", "application/json");
  UpdateTask1.send(JSON.stringify({
    Title: TitleUpdate,
    Description: DescriptionUpdate,
    Assigned: UsernameUpdate,
    Duration: DurationUpdate,
    Status: StatusUpdate,
    Comments: CommentUpdate
  }));
  UpdateTask1.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminTask();
        alert("Task has been updated successfully !!");
      }

    }
  }
}
function onestepDelete(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      popup: "custom-buttons",
      confirmButton: "close",
      cancelButton: "delete"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure you want to delete this?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes,Delete it!",
    cancelButtonText: "No,Cancel",

    reverseButtons: true
  }).then((result) => {

    if (result.isConfirmed) {
      DeleteTask(id);
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your Task Mangement Data is safe",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
    }
  });
}
/**
 * 
 * @param  objectid delete the specific task by specific id
 */
function DeleteTask(objectid) {
  let DeleteTask = new XMLHttpRequest();
  DeleteTask.open("Delete", `http://localhost:5000/api/v1/admin/deleteTask/${objectid}`);
  DeleteTask.send();
  DeleteTask.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminTask();
      }

    }
  }
}
function Add() {
  let popupData = "";
  let Assigned_dropdown = localStorage.getItem("LoginData");
  Assigned_dropdown = JSON.parse(Assigned_dropdown)
  popupData += ` <option selected>Select UserName</option>`
  for (let i = 0; i < Assigned_dropdown.length; i++) {
    popupData += `<option value=${Assigned_dropdown[i].username}>${Assigned_dropdown[i].username}</option>`
  }
  document.getElementById("usernameInput").innerHTML = popupData;
}
/**
 * add new task to the user in admin dashboard
 */
function TaskSave() {
  event.preventDefault();

  let currentDate = new Date();
  let formattedDateTime = currentDate.toLocaleString();
  let TitleAdd = document.getElementById("titleInput").value;
  let DescriptionAdd = document.getElementById("descriptionInput").value;
  let UsernameAdd = document.getElementById("usernameInput").value;
  let Durationtime = document.getElementById("duration").value;
  let Comment = document.getElementById("comment").value;
  let StatusAdd = document.getElementById("statusDropdown").value;
  let AddTask = new XMLHttpRequest();
  AddTask.open("POST", "http://localhost:5000/api/v1/admin/addnewTask");
  AddTask.setRequestHeader("Content-Type", "application/json");
  AddTask.send(JSON.stringify({
    Title: TitleAdd,
    Description: DescriptionAdd,
    Assigned: UsernameAdd,
    Duration: moment(Durationtime).format('DD-MM-YYYY'),
    Status: StatusAdd,
    Notification: true,
    Comments: Comment,
    TaskCreatedAt: moment(formattedDateTime).format('DD-MM-YYYY')

  }));
  AddTask.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        AdminTask();
        document.getElementById("titleInput").value = "";
        document.getElementById("descriptionInput").value = "";
        document.getElementById("usernameInput").value = "";
        document.getElementById("statusDropdown").value = "";
      }

    }
  }
  setTimeout(function () { alert("Task Added Successfully !!"); }, 1000);

}

window.onload = AdminTask;

function filtertable(field) {
  let data1 = "";
  if (field == "Status") {
    DisplayAdminTask();
  }
  else {
    for (let i = 0; i < AdminAllTask.length; i++) {
      if (field == AdminAllTask[i].Status) {
        data1 += `<tr>
        <td>${i + 1}</td>
        <td>${AdminAllTask[i].Title
          }</td>
        <td>${AdminAllTask[i].Description}</td>
        <td> ${AdminAllTask[i].Assigned}</td>
    
        <td><p class=${AdminAllTask[i].Status}>${AdminAllTask[i].Status
          }</p></td>
      <td> ${AdminAllTask[i].Duration}</td>
      <td> ${AdminAllTask[i].Comments}</td>
      <td> ${AdminAllTask[i].TaskCreatedAt}</td>
        <td>  <button type="button" data-bs-toggle="modal"  data-bs-target="#editModal"class="edit-btn" onclick="edittask('${AdminAllTask[i]._id
          }')"><i class="fas fa-edit"></i> Edit</button>
        <button type="button" class="delete-btn" data-bs-toggle="modal" id="DeleteButton" data-bs-target="#staticBackdrop"  onclick="onestepDelete('${AdminAllTask[i]._id
          }')"><i class="fas fa-trash-alt"></i> Delete</button></td</tr>`;
      }
    }
    document.getElementById("TableData").innerHTML = data1;
    document.getElementById("")
  }

}
/**
 * search function
 */
function searchSort() {
  document.getElementById('searchInput').addEventListener('input', function () {
    let input, filter, table, tbody, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tbody = document.getElementById('TableData');
    tr = tbody.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td');
      for (let j = 0; j < td.length; j++) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  });
}
let sortOrders = []; // Array to keep track of sort order for each column
/**
 * 
 * @param columnIndex function for sorting the table
 */
function sortTable(columnIndex) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  if (!sortOrders[columnIndex]) {
    sortOrders[columnIndex] = 1; // 1 for ascending
  } else {
    sortOrders[columnIndex] *= -1; // Toggle between ascending (1) and descending (-1)
  }

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      let xValue = x.innerHTML.toLowerCase();
      let yValue = y.innerHTML.toLowerCase();

      if (sortOrders[columnIndex] === 1 ? xValue > yValue : xValue < yValue) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//disable the previous date for deadline date in form
function deadlineDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Months are zero-based
  let day = currentDate.getDate();
  let formattedDate1 = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  return formattedDate1;
}
document.getElementById('duration').min = deadlineDate();
document.getElementById('durationinput').min = deadlineDate();

