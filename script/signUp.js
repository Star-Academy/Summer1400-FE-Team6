let firstName = document.getElementById("fName");
let lastName = document.getElementById("lName");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-pass");
let submitBtn = document.getElementById("submit");

async function sginUp() {
    let response = await fetch('http://130.185.120.192:5000/user/register', {
        method: 'POST',
        body: JSON.stringify({username: username.value, email: email.value, password: password.value, firstName:firstName.value, lastName:lastName.value })
    });
    if (response.ok) {
        //todo dont know

        window.alert("ثبت نام شدید :)");
        document.location = "login.html";
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
    if (username.value && email.value && password.value && confirmPassword.value && firstName.value && lastName.value){
        if (password.value === confirmPassword.value){
            sginUp();
        }else {
            window.alert("پسورد های وارد شده برابر نیست!");
        }
    }else {
        window.alert("فیلد ها خالی است !");
    }
});