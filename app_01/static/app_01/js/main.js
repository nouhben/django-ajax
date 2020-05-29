$(document).ready(function () {
    document.cookie = "name=sophia";
    function getCookie(name) {
        if (name && (name !== /\s*/ || name !== '')) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const re = /;\s*/;
                let cookies = document.cookie.split(re);
                for (let i = 0; i < cookies.length; i++) {
                    cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === name + '=') {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1).trim());
                        break;
                    }
                };
            }
            return cookieValue;
        }
        return null;
    }
    const csrfToken = getCookie('csrftoken');
    //for security we use this instead of passing it inside the body of post request
    //via csrfmiddleware
    function csrfSafeMethod(httpMethod) {
        //the list contains the safe methodes that does not require csrf
        return ['GET', 'TRACE', 'OPTIONS', 'HEAD',].includes(httpMethod);
    }
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            //we need to check if it is safe and if it is crossdomain
            if (!(csrfSafeMethod(settings.type) || this.crossDomain)) {
                xhr.setRequestHeader('X-CSRFToken', csrfToken);
            }
        }
    });
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
                //response is the response i get from the server == django view handler 
                //me: request  ----> view : server
                //me: response <---- view
                const btns = ['btn-primary', 'btn-success',
                    'btn-warning', 'btn-info',
                    'btn-light', 'btn-dark'];
                let i = Math.floor(Math.random() * Math.floor(btns.length));
                //document.getElementById('get-btn').classList.remove();
                document.getElementById('get-btn').classList.toggle(btns[i]);
                $('#seconds').append(
                    '<li class="card p-3 mt-3">t = ' + response.seconds + '</li>'
                );

            },
        })
    });

    $('#seconds').on('click', 'li', function () {
        //we have many li elements so we make one event handler on the 
        //parent and get the event target from the event object
        //'click' then 'li' which son the clicked happend on the what to //do
        $.ajax({
            url: '',
            type: 'POST',
            data: {
                // someText: $(this).text(), //the 'this' refers to the li element on which the //click does happend
                text: $(this).text(),
                myname: 'hello my world!',
                //csrfmiddlewaretoken: csrf, ==> we don't need it its in the header already
            },
            success: function (response) {
                $('#right').append('<li class="card border border-dark mt-3 p-3">' + response.data + '</li>')
            },
        });

    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const getBtn = document.getElementById('get-btn');
//     getBtn.addEventListener('click', function (e) {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', '', true);
//         xhr.onload = function () {
//             if (xhr.status == 200) {
//                 const newItem = document.createElement('li');
//                 ['card', 'p-3', 'mt-3'].forEach(c => {
//                     newItem.classList.add(c);
//                 });
//                 console.log(JSON.parse(xhr.responseText))
//                 newItem.appendChild(document.createTextNode(JSON.parse(xhr.responseText)));
//                 document.getElementById('seconds').appendChild(newItem);
//             }
//         };
//         xhr.onerror = function () {
//             console.log('hello world: error');
//         }
//         xhr.send();
//     });
// })


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