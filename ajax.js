//封装ajax
function ajax(type, url, val, callback, e) {
    var xhr,
        e = e || true;
    type = type.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    if (type == 'POST') {
        xhr.open(type, url, e);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(val);
    }
    else if (type == 'GET') {
        xhr.open(type, url + '?' + val, e);
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
        }
    }
}