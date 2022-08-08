const tx = document.getElementsByName("reviewChanges");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

function clearForm() {
    document.getElementById("senderEmailInput").value = null
    document.getElementById("movieTitleInput").value = null
    document.getElementById("reviewChangesInput").value = null
}

async function sendForm() {
    const title = document.getElementById("movieTitleInput").value;
    const name = document.getElementById("senderEmailInput").value;
    const content = document.getElementById("reviewChangesInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.piuroprauxy.ml/form", true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        email: [name],
        "body": {
            "title": title,
            "name": name,
            "content": content
        }
    }));
    const response = xhr.response;
}
