$(document).ready(function () {
    var eps;
    var epnav = $('.epnav');
    var total;
    var perpage = 50;
    var pages = Math.ceil(total / perpage);
    var loader = $('.caplist .loader').prop('outerHTML');
    var eplist = $('.eplist');
    $.ajax({
        type: "POST",
        url: $('.caplist').attr('data-ajax'),
        data: {
            "_token": token
        },
        success: function (data) {
            console.log(data);
            total = data.eps.length;
            $('.ep_count').text(total);
            eps = data.eps;
            perpage = parseInt(data.perpage);
            var pag_index = 1;
            console.log(total);
            if (total == 0) {
                $('.caplist').html('<p class="mt-5">Lo sentimos, no hay episodios aÃºn.</p>');
            } else {
                if (total >= perpage) {
                    epnav.show();
                }
                var current = 0;

                function create_nav() {
                    var init = eps[current].num;
                    current = current + perpage;
                    var last = eps[current] !== undefined ? eps[current].num - 1 : eps.pop().num;
                    last = last == init ? '' : '-' + last;
                    epnav.append('<li><button data-paginate="' + pag_index + '" class="btn btn-secondary fw-semibold border-0">' + init + last + '</button></li>');
                    if (current < total) {
                        pag_index++;
                        create_nav();
                    }
                }
                create_nav();
                var pagbns = $('.epnav button');
                pagbns.click(function () {
                    pagbns.removeClass('bg-principal');
                    $(this).addClass('bg-principal');
                    eplist.before(loader);
                    eplist.html('');
                    $.ajax({
                        type: "POST",
                        url: data.paginate_url,
                        data: {
                            "_token": token,
                            p: $(this).attr('data-paginate')
                        },
                        success: function (data) {
                            $('.caplist .loader').remove();
                            console.log(data);
                            var el = data.caps;
                            for (var i = 0; i < el.length; i++) {
                                eplist.append('<li class="col mb-3"> <article> <a class="ko" href="' + el[i].url + '"> <div class="position-relative  overflow-hidden"> <img class="lazy w-100 rounded-3 aspect" src="' + data.default+'" data-src="' + el[i].thumb + '" alt=""> <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/> <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/> </svg></span> <div class="play imgefecto"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" class="bi bi-play text-light" viewBox="0 0 16 16"> <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path> </svg></div> </div> <h2 class="fs-5 mt-2 mb-1 text-light text-truncate d-flex gap-1">CapÃ­tulo ' + el[i].episodio + ' <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-check-all lalo" viewBox="0 0 16 16">   <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/> </svg></h2></a></article></li>');
                            }
                            lazyLoadInstance.update();
                        },
                        dataType: "json"
                    });
                });
                pagbns.first().click();
            }
            $('.caplist .loader').remove();
        },
        dataType: "json"
    });
});
