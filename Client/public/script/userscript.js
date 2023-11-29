const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

logInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function userCheck() {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const http = new XMLHttpRequest();
    http.open("POST", `http://localhost:5000/api/v1/user/login`);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
        username: username,
        password: password
    }));
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const newobj = this.responseText;

                localStorage.setItem("token", JSON.parse(newobj).token);
                localStorage.setItem("Username", username);
                if (JSON.parse(newobj).token) {
                    auth()
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

function userRegister() {
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:5000/api/v1/user/register", true);
    req.setRequestHeader("Content-type", "application/json");
    const data = document.getElementById("name").value;
    const data1 = document.getElementById("useremail").value;
    const data2 = document.getElementById("regpassword").value;
    // const r = "user";
    req.send(JSON.stringify({ username: data, email: data1, password: data2 }));
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 201) {
                setregdata();


            }
        }
    }
    alert('User registered Successfully');
    window.location.replace("../userlogin.html");
    event.preventDefault();
}

function auth() {
    const http = new XMLHttpRequest();
    http.open("GET", `http://localhost:5000/api/v1/user/auth-user`, true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader("x-user-auth-token", localStorage.getItem("token"));
    http.send();
    http.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 201) {
            }
            else {
                alert(this.responseText);

            }
        }

    }
    window.location.replace("../user_Dashboard.html")
    event.preventDefault();
}
function setregdata() {

    let Alluser = new XMLHttpRequest();
    Alluser.open("Get", `http://localhost:5000/api/v1/user/getallUserData`);
    Alluser.send();
    Alluser.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let AlluserData = this.responseText;
                localStorage.setItem("LoginData", AlluserData);

            }
        }
    }

}