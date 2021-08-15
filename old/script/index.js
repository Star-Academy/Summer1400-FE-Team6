let navBar = document.getElementById("nav-top");
let loggedIn = "<li><a href=\"playlist.html\">پلی لسیت‌ها</a></li><li><a id='logout'>خروج از حساب کاربری</a></li>";

function loginStatus(){
    if(localStorage.getItem("isLogin") === "true"){
        navBar.innerHTML = loggedIn;
    }
}

loginStatus();

function logoutFun(){
    if(localStorage.getItem("isLogin") === "true"){
        let logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
            localStorage.clear();
            localStorage.setItem("isLogin", "false");
            document.location = "index.html";
        });
    }
}

logoutFun();

