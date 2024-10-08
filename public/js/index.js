const searchButton = document.getElementById('searchButton');
const searchOverlay = document.getElementById('searchOverlay');
const searchCloseButton = document.getElementById('searchCloseButton');
const site_url = $('.navbar-brand').attr('href');
const token = $("meta[name='csrf-token']").attr("content");

searchButton.addEventListener('click', function() {
  searchOverlay.style.display = 'block';
});

searchCloseButton.addEventListener('click', function() {
  searchOverlay.style.display = 'none';
});


/* Buscador ajax */
var timeout = null;
var qtmpval = $('#qtmp').text();

$(".search input").click(function() {
    $(".pcsearchauto").addClass('load');
    $('#qtmp, #qtmpm').text(qtmpval);
    $('#qtmp, #qtmpm').show();
    console.log("CLICK 1");
});

$("#search input").keyup(function() {
    clearTimeout(timeout);
    $('#qloader').show();
    var qval_c = $(this).val();
    $('.qr_r').remove();
    if(qval_c.length > 2) {
        $('#qtmp, #qtmpm').text('Buscando...');
        $(".pcsearchauto").addClass('load');
        $('#qtmp, #qtmpm').show();

        $(window).click(function() {
           // $('.pcsearchauto').removeClass('load');
           // $('#qtmp, #qtmpm').show();
        });

        $('.form_search_ajax').click(function(event){
            event.stopPropagation();
        });
        timeout = setTimeout(function() {

            $.ajax({
                type:"POST",
                url: site_url + "/buscar_ajax",
                data: {"_token":token, q: qval_c},
                success:function(data){

                    $('.search_item').remove();
                    $('.itemmob').remove();

                    //console.log('Busca:');console.log(data);
                    $('#qtmp, #qtmpm').hide();
                    //Carga resultados
                    if(data.length == 0) {
                        $('#qtmp, #qtmpm').text("No se encontraron resultados.");
                        $('#qtmp, #qtmpm').show();
                    } else {

                        for(var i =0;i<data.length;i++) {
                            $('.pcsearchauto').append('<li class="mb-2"><a class="dropdown-item search_item pcsearches" href="'+data[i].url+'"><div class="pcsearchitems"><img src="'+data[i].imagen+'"><p>'+data[i].nombre+'</p></div></a></li>');

                            $('.qmob').append('<div class="mobsearch itemmob"><a href="'+data[i].url+'"><div class="mobsearchimg"><img src="'+data[i].imagen+'"></div><div class="mobsearchtxt"><p>'+data[i].nombre+'</p></div></a></div>');

                        }

                    }
                },
                dataType: "json"
            });

        }, 500);

    } else {
        $('.pcsearchauto').removeClass('load');
        $('.search_item').remove();
        $('.itemmob').remove();
    }

});
/* Fin buscador ajax */
