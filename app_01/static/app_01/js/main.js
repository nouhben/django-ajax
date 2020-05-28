$(document).ready(function () {
    $('#get-btn').click(function (e) {
        $.ajax({
            url: '', //where to send the request to the django webserver
            type: 'GET', //i want to read somthng from server
            data: {
                //data that i want to send to the server
                //the 'this' refers to "$('#get-btn)"
                btn_text: $(this).text() //use this key on the django view
            },
            success: function (response) {
                //response is the response i get from the server === django view handler me: request  ----> view : server
                //           me: response <---- view
                $('#get-btn').text(response.seconds)
            },
        })
    });
});



//ajax form
/*
const getForm = document.getElementById('getForm');
const postForm = document.getElementById('postForm');

getForm.addEventListener('submit', submitGetForm);
postForm.addEventListener('submit', submitPostForm);

function submitGetForm(e) {
    //stop the auto submission
    e.preventDefault();
    const info = document.getElementById('username1').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php?name=' + info, true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText)
        }
    }
    xhr.send();
}

function submitPostForm(e) {
    e.preventDefault();
    const info = document.getElementById('username2').value;
    const params = "name=" + info;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText)
        }
    }
    xhr.send(params);
}

//php forms
const postBtn = document.getElementById('con_post');
const getBtn = document.getElementById('con_get');

postBtn.addEventListener('click', postName);
getBtn.addEventListener('click', getName);

function getName(event) {
    const username = document.getElementById('usernameGet').value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php?name=' + username, true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
        }
    }
    xhr.onerror = function () {
        console.log('ERROR');
    }
    xhr.send();
}
function postName(event) {
    const username = document.getElementById('usernamePost').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php?name=' + username, true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
        }
    }
    xhr.send();
}
*/