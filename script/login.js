let email = document.getElementById("username");
let password = document.getElementById("password");
let submitBtn = document.getElementById("submit");

async function login() {
    let response = await fetch('http://130.185.120.192:5000/user/login', {
        method: 'POST',
        body: JSON.stringify({email: email.value, password: password.value})
    });
    let responseJson = await response.json();

    if (response.ok) {
        //todo dont Know

        localStorage.setItem("id", responseJson.id)
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("isLogin", "true");

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