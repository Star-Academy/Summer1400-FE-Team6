let firstName = document.getElementById("fName");
let lastName = document.getElementById("lName");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let submitBtn = document.getElementById("submit");

async function sginUp() {
    let body = {username: username.value, email: email.value, password: password.value, firstName:firstName.value, lastName:lastName.value };
    let response = await fetch('http://130.185.120.192:5000/user/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (response.ok) {
        //todo dont know
        window.alert("ثبت نام شدید :)");
        localStorage.setItem("id", responseJson.id)
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("isLogin", "true");
        console.log(localStorage.getItem('id'))
        document.location = "playlist.html";
    }
    else {

        if (response.status === 400) {
            window.alert("اطلاعات خود را چک کنید!");
        } else if (response.status === 500) {
            window.alert("مشکلی در سرور وجود دارد");
        } else {
            window.alert(responseJson.message);
        }
    }
}

submitBtn.addEventListener("click", () => {
    if (username.value && email.value && password.value && firstName.value && lastName.value){
            sginUp();
    }else {
        window.alert("فیلد ها خالی است !");
    }
});