$(document).ready(function() {
$('.btn-hamburger').click(function () {
    $('.main-header-menu').slideToggle();
});
$('.show-more-seo').click(function(e) {
        $('.main-page-seo-text p:not(:first-child)').slideToggle();
        $(this).toggleClass('rotate');
        $(this).text(function(i, text) {
            return text === "Узнать больше" ? "Скрыть" : "Узнать больше";
        })
    });


$('.question-item').click(function(){
$(this).toggleClass('rotate');
$(this).parent().find('.answer-item').slideToggle();
});
function getCookie(name){
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setCookie(name, value, options){
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    
    if (expires && expires.toUTCString) { 
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;
    options.domain = '.' + window.location.hostname;
    options.path = '/';

    for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", { expires: -1 });
}

    /* ↓ LOCATION ↓ */
    $('.city_popup_wrp').find('.city_name_wrp').click(function(){
        var city_name = $(this).find('.text').text();
        $(this).closest('li').addClass('active').siblings().removeClass('active');
        $('.main-header-top').find('.location_change_btn a span').text(city_name);
        $('#overlay').fadeOut(400);
        $('.city_popup_wrp').css({
                        'display': 'none',
                        'top': '100%',
                        'left': '50%'
                    });
        if(city_name){
            setCookie('selected_city_name', city_name, {'expires': 3600*24*30});
        }
    });
    
    var city_name_from_cookie = getCookie('selected_city_name');
    
    if(city_name_from_cookie && city_name_from_cookie.length){
        
        $('.city_popup_wrp').find('.city_name_wrp').each(function(){
            var $this = $(this);
            var city_name = $this.text();
            
            if(city_name && city_name == city_name_from_cookie){
                $this.click();
                return false;
            }
        });
    }
    
    /* ↑ LOCATION ↑ */



  var calcTermRange = document.getElementById('calc_term_range');
  var calcPaymentRange = document.getElementById('calc_payment_range');

  var gradValue = Math.round((calcTermRange.value/calcTermRange.getAttribute('max')*1)*100);
  var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
  calcTermRange.style.background = colorcalcTermRange;

  var gradVal = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
  var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) 2%, rgb(225, 225, 225) 2%)';
  calcPaymentRange.style.background = colorcalcTermRange;

  calcTermRange.addEventListener('touchmove', function(evt) {
    var gradValue = Math.round((calcTermRange.value/calcTermRange.getAttribute('max')*1)*100);
    var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
    calcTermRange.style.background = colorcalcTermRange;
  });

  calcTermRange.addEventListener('mousemove', function(evt) {
    var gradValue = Math.round((calcTermRange.value/calcTermRange.getAttribute('max')*1)*100);
    var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
    calcTermRange.style.background = colorcalcTermRange;
  });

  calcPaymentRange.addEventListener('touchmove', function(evt) {
    var gradValue = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
    var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
    calcPaymentRange.style.background = colorcalcTermRange;
  });

  calcPaymentRange.addEventListener('mousemove', function(evt) {
    var gradValue = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
    var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
    calcPaymentRange.style.background = colorcalcTermRange;
  });

  document.getElementById('form-calculator').addEventListener('mousemove', function(evt) {
    var valPaymentRange = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
    var colorPaymentRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + valPaymentRange + '%, rgb(225, 225, 225) ' + valPaymentRange + '%)';
    calcPaymentRange.style.background = colorPaymentRange;
  })

  document.getElementById('form-calculator').addEventListener('touchmove', function(evt) {
    var valPaymentRange = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
    var colorPaymentRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + valPaymentRange + '%, rgb(225, 225, 225) ' + valPaymentRange + '%)';
    calcPaymentRange.style.background = colorPaymentRange;
  });




$('.main-slick').slick({
    dots: true,
    arrows: false,
});
$('.news-block-slick').slick({
    dots: true,
    arrows: false,
});



})
