$(document).ready(function() {
  var calcTermRange = document.getElementById('calc_term_range');
  var calcPaymentRange = document.getElementById('calc_payment_range');

  var gradValue = Math.round((calcTermRange.value/calcTermRange.getAttribute('max')*1)*100);
  var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
  calcTermRange.style.background = colorcalcTermRange;

  var gradVal = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
  var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
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
