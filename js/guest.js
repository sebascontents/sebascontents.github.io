$(document).ready(function () {
    $('.follow_d, .stardiv').click(function () {
        if (window.confirm("Solo usuarios registrados pueden utilizar esta funciÃ³n.")) {
            location.href = "/register";
        }
    });
});
