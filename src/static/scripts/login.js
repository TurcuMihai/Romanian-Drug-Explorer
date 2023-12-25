function authenticate()
{

    $.ajax({
        url: "/api/authenticate_user",
        type: "POST",
        data: JSON.stringify({
            "USERNAME": $('#username').val(),
            "PASSWORD": $('#password').val()
        }),
        success: function(data) { 
            localStorage.setItem("token", data);
            if ($('#username').val() === "admin") {
                localStorage.setItem("role","admin");
            } else {
                localStorage.setItem("role","user");
            }
            window.location.href = '/acasa.html';
        },
        error: function(e) {
            alert("Eroare la autentificare");
        }
    });   
}

function register()
{   
    if($('#password').val() != 
        $('#confirmpassword').val()) {
        alert("Eroare la autentificare");
        return;
    }
    if($('#password').val() === "" || 
    $('#confirmpassword').val() === "" || 
    $('#username').val() === "") {
    alert("Campuri invalide");
    return;
}

    $.ajax({
        url: "/api/register_user",
        type: "POST",
        data: JSON.stringify({
            "USERNAME": $('#username').val(),
            "PASSWORD": $('#password').val()
        }),
        success: function(data) { 
            if(data == 'OK')
                window.location.href = '/login.html';
            else alert(data);
        },
        error: function(e) {
            alert("Eroare la autentificare");
        }
    });   
}

function anulareLogin()
{
    document.getElementById("username").value = null;
    document.getElementById("password").value = null;

}

function anulareSignIn()
{
    document.getElementById("username").value = null;
    document.getElementById("password").value = null;
    document.getElementById("confirmpassword").value = null;

}