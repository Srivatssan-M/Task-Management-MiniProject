/**
 * check and validate the admin
 */
function adminCheck() {
    let username = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    const http = new XMLHttpRequest();
    http.open("POST", `http://localhost:5000/api/v1/admin/login`);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
        username: username,
        password: password
    }));
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const newobj = this.responseText;
                localStorage.setItem("token", JSON.parse(newobj).token)
                if (JSON.parse(newobj).token) {
                    window.location.replace("../admin_Dashboard.html")
                } else {
                    alert('Invalid Credentials');
                }
            }
            else {
                alert('Invalid Credentials');
            }
        }
    }
    event.preventDefault();
}

