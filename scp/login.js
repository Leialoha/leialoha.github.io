
document.getElementById('login-2VoZ6Z2EJhtXUkzIW5HO').onclick = () => {
    var USERNAME = document.getElementById('username-BP5CAEHcztbpS78TvhJ4').value;
    var PASSWORD = document.getElementById('password-eaiWgIRzao1ilxm70eHt').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = JSON.parse(this.responseText);

        document.getElementById("message-AlS18vmmXD4qT7t2yImG").className = "";
        if (this.status != 200) {
            document.getElementById("message-AlS18vmmXD4qT7t2yImG").classList.add('error-lK7SB5Vdb1rNC7f1psHc')
            document.getElementById("message-AlS18vmmXD4qT7t2yImG").innerText = data.message;
        }
        
        CheckLogin();
    }
    xhttp.open("GET", "/api/login?username=" + USERNAME + "&password=" + PASSWORD);
    xhttp.send();
};

function CheckLogin() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var data = JSON.parse(this.responseText);
        if (this.status == 200) {
            document.getElementById('login-MHLnNs8WDS9esw6TUErB').classList.add('hidden-2lt3nJhcHvEEjpz5aYNL');
            document.getElementById('dash-5s11z7CXEp2dZFrpmLrm').classList.remove('hidden-2lt3nJhcHvEEjpz5aYNL');

            LoadDashboard();
        }
    }
    xhttp.open("GET", "/api/login/check");
    xhttp.send();
}

CheckLogin();
