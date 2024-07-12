function toggleMenu() {
    toggle = document.querySelector('.toggle');
    tablediv = document.querySelector('.tablediv');

    toggle.classList.toggle('active');
    tablediv.classList.toggle('active');
}

var full_url = location.protocol+"//"+location.hostname+location.pathname;
var player_load = false;
window.onload = function() {

    $(function() {
        //Primera opciÃ³n
        $('.dropcaps li:first-child a').addClass('active');
        var player_url = $('#play-video a').attr('data-player')
        $('#videoLoading').attr('data-video', player_url);

        function player_height() {
            var player_height = $('.embed-responsive-item').width()/1.7;
            $('.embed-responsive-item').height(player_height);
        }
        player_height();

        $( window ).resize(function() {
            player_height();
        });

        $('.play-video').click(function() {
            player_load = false;
            $('.ifplay').html('');
            $('#videoLoading #message').html(default_playbtn);
            $('#videoLoading').show();
            $('.active').removeClass('active');
            $(this).addClass('active');
            $("#selectText").text($(this).text());
            var player_url = $(this).attr('data-player');
            //$('#videoLoading').attr('data-video', player_url);
            //$('#videoLoading').attr('data-name', $(this).text());

            $('.ifplay').html('<iframe class="embed-responsive-item" scrolling="no" width="100%" src="'+(atob($(".player").attr('data-key'))+player_url)+'" frameborder="0" allowfullscreen=""></iframe>');

            player_height();
        });

        var default_playbtn = $('#videoLoading #message').html();

        function show_player() {
            var curr_play = $('.ifplay iframe');
            curr_play.show();
            player_height();
            $('#videoLoading').hide();
        }

       /* $('#videoLoading').click(function() {
            $('#videoLoading #message').html("<p>Cargando...</p>");
            var player_name = $(this).attr('data-name');
            var player_url = player_name == "yourupload" ? atob($(this).attr('data-video')) : atob($(".player").attr('data-key'))+$(this).attr('data-video');

            //atob($(this).attr('data-video')).replace('http://', '//');

            $('.ifplay').html('<iframe style="display: none;" class="embed-responsive-item" scrolling="no" width="100%" src="'+player_url+'" frameborder="0" allowfullscreen=""></iframe>');

            loading_player = setTimeout(show_player, 1500);



        });*/


        $('.play-video').first().click();

        /*Reportar*/
        $('.sdreport').click(function(e) {
            e.preventDefault();
            var rbtn = $(this);
            rbtn.prop('disabled','true');

            var formData = {
                motivo: $('#reportModal select').val(),
                explicacion: $('#reportModal textarea').val(),
                _token: token,
            };

            /*Marca*/
            $.ajax({
                type:"POST",
                url: full_url + "/reportar",
                data: formData,
                success:function(results) {
                    $("#reportModal button[data-bs-dismiss]").click();

                    if(results == 1) {
                        alert('Tu reporte ha sido enviado!! ten paciencia, sera reparado.');
                    } else {
                        alert(results);
                    }
                    rbtn.prop("disabled", false);
                }
            });

        });

    });
}
