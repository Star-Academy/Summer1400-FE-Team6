let email = document.getElementById("username");
let password = document.getElementById("password");
let submitBtn = document.getElementById("submit");
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function login() {
    let body;

    if (re.test(email.value)) {
        body = {email: email.value, password: password.value};
    } else {
        body = {email: email.value, password: password.value};
    }

    let response = await fetch('http://130.185.120.192:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    console.log(response)
    console.log(responseJson)
    if (response.ok) {
        //todo dont Know

        localStorage.setItem("id", responseJson.id)
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("isLogin", "true");
        console.log(localStorage.getItem('id'))
        document.location = "playlist.html";
    } else {
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
    if (email.value && password.value) login();
    else window.alert("فیلد ها خالی است !");
});