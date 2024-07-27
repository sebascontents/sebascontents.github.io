document.addEventListener('DOMContentLoaded', (event) => {

$( document ).ready(function() {
var current_url = location.origin + location.pathname;
var token = $("meta[name='csrf-token']").attr("content");
var site_url = $('.navbar-brand').attr('href');

//Notificaciones
$('.shownots').click(function() {
$('.notify-list').toggle();

notify_user();

});

$('body').click(function (e) {
    var e = $(e.target);
    e = e.closest( "span" );

    console.log(e);
    if(!e.hasClass('dnot')) {
        $('.notify-list').hide();

    }

});

/*Lista de notificaciones*/
console.log('USER NOTIFY');
var checked = false;
var notifybtn=$('.shownots');
var notcount=$('.shownots .notcount');
totalnot = notcount.html();
if(totalnot > 0) {notcount.show();}

console.log(totalnot);

function notify_user() {

    notifybtn.toggleClass('open');
    var oldn = '';

    var divnot=$('.notify-list');
    if(notifybtn.hasClass('open')) {
        if(localStorage.getItem('site_notify') != null) {oldn = localStorage.getItem('site_notify');}
        var ajax = notifybtn.attr('data-ajax');

        if(totalnot != 0) {
            $.ajax({
                type:'POST',
                url: ajax,
                data: {"_token": token,},
                success:function(res) {
                    console.log(res);
                    var json=JSON.parse(res);

                    var notlist='';
                    notcount.hide();
                    notcount.html(0);
                    for(i=0;json.length>i;i++){
                        if(json[i]['usuario'] == undefined) {json[i]['usuario'] = "";}
                        notlist+='<li><a href="'+site_url+json[i]['url']+'" class="top-text-block"> <div class="top-text-heading"><b>'+json[i]['usuario']+'</b> '+json[i]['accion']+' <b>'+json[i]['titulo']+'</b></div><div class="top-text-light">'+json[i]['fecha']+'</div></a></li>';


                    }
                    console.log(oldn);
                    if(notlist.length>0){divnot.html(notlist);$('.notify-list li').addClass('d');divnot.append(oldn);}else{divnot.html(oldn);}

                    if(localStorage.getItem('site_notify')) {
                        if(localStorage.getItem('site_notify').length < 10000) {
                            localStorage.setItem('site_notify', notlist+oldn);
                        } else {
                            localStorage.setItem('site_notify', notlist);
                        }
                    } else {
                        localStorage.setItem('site_notify', notlist);
                    }


                },
                error:function(data) {
                    console.log(data.statusText);
                }
            });
        } else {
            var notcache = localStorage.getItem('site_notify');
            if (notcache) {
                divnot.html(notcache);
            } else {
                divnot.html('<li><p class="no pt-3 text-center">No tienes notificaciones nuevas.</p></li>');
            }
        }
    }
};


//Seguir
$('.follow_d').click(function() {
var svg = $(this).find('svg').prop('outerHTML');
 $.ajax({
				type:"POST",
				url: current_url + "/seguir",
				data: {"_token":token},
			    success:function(data){   
			    console.log(data);
			   if(data.active) { $('.follow_d').html(svg+ ' Guardado').addClass('add');} else {$('.follow_d').html(svg+ ' Guardar').removeClass('add');}
			     },
				error: function(xhr, status, error) {
					console.log('error: ' + xhr.responseText);
				},
			     dataType: "json"
			});
			
});


//Dejar de seguir en perfil
function delete_follow() {
$('.delete_follow').click(function (e) {
e.preventDefault();
console.log('click');
var p = $(this).closest("li");
if (window.confirm("Â¿Eliminar este elemento?")) {

		$.ajax({
				type:"POST",
				url: current_url,
				data: {'id': $(this).attr('data-id'),"_token":token},
			    success:function(data){   
			    console.log(data);
				 p.remove();
			     },
				error: function(xhr, status, error) {
					console.log('error: ' + xhr.responseText);
				},
			     dataType: "json"
		});
			
}
			
});
}

delete_follow();


//Scroll infinito
var current_page = 2;
var stop_loading = false;

function profile_scroll() {
console.log("Se muestra"+ current_page);

		$.ajax({
				type:"POST",
				url: current_url+"/ajax",
				data: {"p": current_page, "_token":token},
			    success:function(data){   
			    console.log(data);
			    
				if(!jQuery.isEmptyObject(data.data)) {
				//Tiene contenido, se muestra


				for(i=0;i<data.data.length;i++) {
				var template_tmp = $('.item.tmp').prop("outerHTML").replace('tmp', '').replace('style="display: none;"', '').replace('data-src', 'src');
			
				//Agregar valor a variables

				template_tmp = template_tmp.split('%titulo_corto%').join(data.data[i].dorama.titulo_corto).split('%id%').join(data.data[i].id).split('%thumb%').join(data.data[i].dorama.portada).split('%nombre%').join(data.data[i].dorama.nombre).split('%url%').join(data.data[i].dorama.url);
				$('#loading.profile_ajax').before(template_tmp);
				}
				
			
				delete_follow();
				current_page++;
				loading_scroll = false;
				} else {
				//Finaliza
				$('#loading.profile_ajax').remove();
				}
				
			     },
				error: function(xhr, status, error) {
					console.log('error: ' + xhr.responseText);
				},
			     dataType: "json"
		});
		
		
}

if($('.profile_ajax').length) {
var loading_scroll = false;
function loading_scroll_fn() {

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() + $('.footer').height() + 50 > $(document).height() && loading_scroll == false) {
       loading_scroll = true;
		profile_scroll();
   }
});


}
loading_scroll_fn();

$(document).scroll(function () {
loading_scroll_fn();
});
}

});
