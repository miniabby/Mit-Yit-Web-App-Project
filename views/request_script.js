var accept = document.getElementsByClassName("accept");
var reject = document.getElementsByClassName("reject");


for (let i = 0; i < accept.length; i++) {
    accept[i].addEventListener("click", function() {
        var content = this.previousElementSibling;
        content.style.display = "block";
        accept[i].style.display = "none";
        reject[i].style.display = "none";

        var http = new XMLHttpRequest();
        const url = "/match/accept";
        http.open("POST", url, true);

        http.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        let table = document.getElementsByTagName('section')[3+i];

        let data = JSON.stringify({
            user: table.getElementsByTagName('p')[0].innerHTML,
            id: table.getElementsByTagName('p')[2].innerHTML,
        });

        http.send(data);
    })
}

for (let i = 0; i < reject.length; i++) {
    reject[i].addEventListener("click", function() {
        var content = this.previousElementSibling;
        content.style.display = "block";
        accept[i].style.display = "none";
        reject[i].style.display = "none";

        var http = new XMLHttpRequest();
        const url = "/match/reject";
        http.open("POST", url, true);

        http.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        let table = document.getElementsByTagName('section')[3+i];

        let data = JSON.stringify({
            user: table.getElementsByTagName('p')[0].innerHTML,
            id: table.getElementsByTagName('p')[2].innerHTML,
        });

        http.send(data);
    })
}