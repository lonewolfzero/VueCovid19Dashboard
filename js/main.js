// Longer version in jQuery
$(document).ready(function () {
    if (getCookie('covid19Provinsi') == "") {
        $('#modalProvinsi').modal('show');
    }
});

$('#home').on('click', function () {
    var home = $('#sub_home');
    if (home.data('click') == "") {
        home.css('width', '200px');
        home.css('height', '180px');
        home.data('click', 'true');
    } else {
        home.css('width', '0');
        home.css('height', '0');
        home.data('click', '');
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000 * 365));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}