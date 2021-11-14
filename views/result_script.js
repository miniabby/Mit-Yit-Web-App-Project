var coll = document.getElementsByClassName("collapsible");
var like = document.getElementsByClassName("like");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }   
        });
    }

for (let i = 0; i < like.length; i++) {
    like[i].addEventListener("click", function() {
        var content = this.previousElementSibling;
        content.style.display = "block";
        var http = new XMLHttpRequest();
        const url = "/match/like";
        http.open("POST", url, true);

        http.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        let table = document.getElementsByTagName('section')[3+i];

        let data = JSON.stringify({
            username: table.getElementsByTagName('p')[0].innerHTML,
        });

        http.send(data);
    })
}
