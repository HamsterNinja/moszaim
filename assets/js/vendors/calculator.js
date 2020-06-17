function isValidEmail(emailAddress) {
  var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
  return pattern.test(emailAddress);
}

function isValidPhone(phone) {
  return (phone && phone.length > 1);
}

function resizeModal(event, maxWidth) {
  if (maxWidth === undefined) {
    maxWidth = null;
  }
  var wWidth = $(window).width();
  var width = wWidth * 0.9;
  if (!maxWidth) {
    if (!event) {
      $('#modal_form').css('max-width', 'none');
    }
    if ($('#modal_form').css('max-width') != 'none') {
      maxWidth = parseInt($('#modal_form').css('max-width'));
    }
  }
  if (maxWidth) {
    $('#modal_form').css('max-width', maxWidth);
    width = Math.min(width, maxWidth);
  }
  $('#modal_form').css('width', width);
  //$('#modal_form').css('margin-left', (width / 0.9) * -0.45);
  if (event) {
    $('#modal_form').css('top', (window.pageYOffset + 30) + 'px');
  }
}

function showModal(content, maxWidth) {
  if (maxWidth === undefined) {
    maxWidth = null;
  }
  $('#modal_content').html(content);
  resizeModal(null, maxWidth);
  $('#overlay').fadeIn(400, function() {
    $('#modal_form').css('display', 'block').animate({
      opacity: 1,
      top: (window.pageYOffset + 30) + 'px'
    }, 200);
  });
  $('.modal-wrapper').fadeToggle(500);
}



(function($) {
  "use strict";

  $(document).ready(function() {
    var page = $('[name=def-page]').val();
    var maxsum =0;
    if(page=='truck'||page=='special'){
      maxsum =15;
    } else if(page=='moto'){
      maxsum =5;
    } else if(page=='legal'){
      maxsum =30;
    } else {
      maxsum =15;
    }


    noUiSlider.create(document.getElementById('calc_sum_range'), {
      start: 300000,
      connect: 'lower',
      range: {
        'min': [30000, 10000],
        '50%': [1000000, 100000],
        'max': maxsum*1000000
      }
    });

    document.getElementById('calc_sum_range').noUiSlider.on('slide', function () {
      var calcPaymentRange = document.getElementById('calc_payment_range');

      var gradValue = Math.round((calcPaymentRange.value/calcPaymentRange.getAttribute('max')*1)*100);
      var colorcalcTermRange = 'linear-gradient(90deg, rgb(0, 174, 239) ' + gradValue + '%, rgb(225, 225, 225) ' + gradValue + '%)';
      calcPaymentRange.style.background = colorcalcTermRange;
    });

    $('#calc_sum').siblings('.under-input-wrapper').find('.under-input-2').html('до '+maxsum+' 000 000 ₽');
    $('.max-sum').html(maxsum+' 000 000 ₽');
    $(function (){
      if($('body').width()<768){
        $('.li-main-1').html('<div class="li-pre"></div>100% одобрение');
        $('.li-main-2').html('<div class="li-pre"></div>Сумма от 30 000 до <span class="max-sum">'+maxsum+' млн. ₽</span>');
        $('.li-main-3').html('<div class="li-pre"></div>Срок от 1 месяца до 3 лет');
      }
    });
    //gMask();
    $('.mob-menu-but-h-3').click(function(){
      $('.modal-wrapper').fadeToggle(500);
      $('html').css('overflow-y','scroll');
    });
    $('a.city').click(function(event) {
      event.preventDefault();
      showModal($('#city_select').html());
    });


    $(window).on("resize", resizeModal);
    if ($.cookie('city-selected')) {
      $('.city-select').hide();
    } else {
      $('.city-select').show();
    }
    $('.city-select .btn').click(function() {
      $.cookie('city-selected', '1', {
        path: '/'
      });
      $('.city-select').hide();
    });
    $('.form-notification .form-button.show-profile').click(function() {
      $('#profile').fadeIn(500);
      $('#register').hide();
      $('html, body').scrollTo($('#profile').offset()['top'] - 100, 500);
      trackGoal('PROFILE-STEP1');
    });
    var url_params = getUrlVars();
    if (url_params['lh']) {
      $.cookie('lead_hash', url_params['lh'], {
        expires: 1,
        path: '/'
      });
    }
    if ($.cookie('lead_hash') && $('#profile').length > 0) {
      initProfileForm(1);
      $('#profile').fadeIn(500);
      $('#register').hide();
    }
    fn.Launch();

    function gMask(){
      var val = $('#sumcr').val();
      val = val.replace(/[^-0-9]/gim,'');
      val = val.replace(' ','');
      //$('#sumcr').inputmask( { "mask":getMask(val), "greedy": false ,placeholder:"",numericInput: true } );
    };
    $('#sumcr').inputmask( { "mask":'9{0,3} 9{0,3} 9{0,3} ₽', "greedy": false ,placeholder:"",numericInput: true } );
    $('#calc_overpayment,#calc_payments_sum,#calc_payment').change(function(){
      var targ = $(this);
      var val =   targ.val();
      targ.val(addSpaces(val)+' ₽');
      //targ.inputmask( { "mask":getMask(val), "greedy": false ,placeholder:"",numericInput: true } );
    });
    function getMask(numb){
      var  procent1 = ("" + numb).split(".")[0];
      var procent2 = ("" + numb).split(".")[1];
      var mask,mask1,mask2;
      if(procent2!=null){
        if(procent>0 && procent2<10){
          mask2= '.9{1} ₽';
        } else if(procent2>9){
          mask2= '.9{2} ₽';
        }
      }else{
        mask2= ' ₽';
      }
      if(procent1!=null){
        if(procent1<1000){
          mask1= '9{1,3}';

        }else if(procent1>999&&procent1<1000000){
          mask1= '9{1,3} 9{1,3}';
        }else if(procent1>999999&&procent1<1000000000){
          mask1= '9{1,3} 9{1,3} 9{1,3}';
        }
      }
      mask =mask1 + mask2;

      return mask;
    }

  });
})(jQuery);

function isIE() {
  var ua = navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    return true;
  } else {
    return false;
  }
}

function addSpaces(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}

function calcSumFromPriceAndFee(fromPayment) {
  var price = $('#calc_price_range').val();
  var fee = $('#calc_fee_range').val();
  var sum = price - fee;
  document.getElementById('calc_sum_range').noUiSlider.set(sum);
  calcSumRangeInput(fromPayment);
}

function calcPriceRangeInput(fromPayment) {
  var ir = $('#calc_price_range');
  var val = ir.val();
  $('#calc_price').val(addSpaces(val) + ' ₽');
  var max_fee = val - document.getElementById('calc_sum_range').noUiSlider.options.range.min;

  if ($('#calc_min_fee').length > 0) {
    var min_fee = val * $('#calc_min_fee').val();
    var max_sum = val - min_fee
  }
  calcFeeRangeInput(fromPayment);
}



function calcFeeRangeInput(fromPayment) {
  var ir = $('#calc_fee_range');
  var val = ir.val();
  $('#calc_fee').val(addSpaces(val) + ' ₽');
  calcSumFromPriceAndFee(fromPayment);
}

function calcSumRangeInput(fromPayment) {
  var ir = document.getElementById('calc_sum_range');
  var val = parseFloat(ir.noUiSlider.get());
  if(val<30000){

  }else if(val>100000){
    // val =val -30000;
  }
  $('#calc_sum').val(addSpaces(val) + ' ₽');
  var payment_type = $('#calc_payment_type').val();
  if (fromPayment !== true) {
    $('#calc_payment_range').attr('step', 1);
    $('#calc_fee_range').attr('step', 50000);
  }
  if ($('#calc_fee_range').length > 0) {
    var price = $('#calc_price_range').val();
    var sum = val;
    var fee = price - sum;
    $('#calc_fee_range').val(fee);
    $('#calc_fee').val(addSpaces(fee) + ' ₽');
  }
  calcResult(fromPayment[0]);
}

function calcTermRangeInput() {
  var ir = $('#calc_term_range');
  var val = ir.val();
  if (val == 0) {
    val = 1;
    ir.attr('min', 1);
    ir.val(val);
  } else if (val < 12) {
    ir.attr('min', 1);
  } else if (val < 24) {
    ir.attr('min', 0);
  } else if (val >= 24) {
    ir.attr('min', 0);
  }
  $('#calc_term').val(addSpaces(val) +' '+ plural(val,'месяц','месяца','месяцев'));
  calcResult();
}
function plural(number, one, two, five){
  var result;

  if ((number - number % 10) % 100 != 10) {
    if (number % 10 == 1) {
      result = one;
    } else if (number % 10 >= 2 && number % 10 <= 4) {
      result = two;
    } else {
      result = five;
    }
  } else {
    result = five;
  }
  return result;
}

function calcRateRangeInput() {
  var ir = $('#calc_rate_range');
  var val = ir.val();
  $('#calc_rate').val(addSpaces(val) + '%');
  calcResult();
}

function calcPaymentRangeInput() {
  var ir = $('#calc_payment_range');
  ir.attr('step', 1000);
  ir.attr('min', Math.floor(ir.attr('min') / 1000) * 1000);
  ir.attr('max', Math.ceil((ir.attr('max') / 1000) * 1000)+1);
  var payment = ir.val();
  var term = parseFloat($('#calc_term_range').val());
  var rate = parseFloat($('#calc_rate_range').val() /100);
  var payment_type = $('#calc_payment_type').val();
  if (payment_type == '1') {
    var kef = (rate + (rate / (Math.pow(1 + rate, term) - 1)));
    var sum = Math.round(payment / kef);
  } else if (payment_type >= 2) {
    var sum = Math.round(payment / rate);
  }
  // $('#calc_sum_range').attr('step', 1);
  $('#calc_fee_range').attr('step', 1);
  // $('#calc_sum_range').val(sum);
  document.getElementById('calc_sum_range').noUiSlider.set(sum);
  calcSumRangeInput(true);
}

function calcResult(fromPayment) {
  var sum = parseFloat(document.getElementById('calc_sum_range').noUiSlider.get());
  var min_sum = document.getElementById('calc_sum_range').noUiSlider.options.range.min;
  var max_sum = document.getElementById('calc_sum_range').noUiSlider.options.range.max;
  var term = parseFloat($('#calc_term_range').val());
  var min_term = $('#calc_term_range').attr('min');
  var max_term = $('#calc_term_range').attr('max');
  var rate = parseFloat($('#calc_rate_range').val()/100);
  var min_rate = $('#calc_rate_range').attr('min')/100;
  var max_rate = $('#calc_rate_range').attr('max')/100;
  var payment_type = $('#calc_payment_type').val();
  if (payment_type == '1') {
    var stv = getStv(true);

    var mths =parseFloat($('#calc_term_range').val());
    var procent = (sum*((mths*stv)/100));
    var total = parseFloat(procent) + parseInt(sum);
    var every = total/mths;

    procent =Math.ceil((procent)*100)/100;
    total =Math.ceil((total)*100)/100;
    every =Math.ceil((every)*100)/100;

    var kef = (rate + (rate / (Math.pow(1 + rate, term) - 1)));
    var payment = (sum * kef).toFixed(2);
    var payments_sum = payment * term;
    var overpayment = payments_sum - sum;
    var min_payment = Math.round(min_sum * (rate + (rate / (Math.pow(1 + rate, term) - 1))));
    var max_payment = Math.round(max_sum * (rate + (rate / (Math.pow(1 + rate, term) - 1))));
  } else if (payment_type == '2') {
    var payment = (sum * rate).toFixed(2);
    var min_payment = Math.round(min_sum * rate);
    var max_payment = Math.round(max_sum * rate);
    var overpayment = payment * term;
    var payments_sum = overpayment + sum;
  } else if (payment_type == '3') {
    var payment = (sum * rate).toFixed(2);
    var min_payment = Math.round(min_sum * rate);
    var max_payment = Math.round(max_sum * rate);
    var overpayment = payment * term;
    var payments_sum = overpayment + sum;
  } else if (payment_type == '4') {
    var payment = 0.00;
    var min_payment = 0;
    var max_payment = 0;
    var overpayment = sum * rate * term;
    var payments_sum = overpayment + sum;
  } else if (payment_type == '5') {
    var payment = 0.00;
    var min_payment = 0;
    var max_payment = 0;
    var payments_sum = sum * Math.pow(1 + rate, term);
    var overpayment = payments_sum - sum;
  }
  if (fromPayment !== true || $('#calc_payment_range').val() > max_payment) {
    $('#calc_payment_range').attr('min', min_payment);
    $('#calc_payment_range').attr('max', max_payment);
  }

  $('#calc_payment_range').val( payment);

  $('#calc_payment').val(addSpaces(Math.round(payment)) + ' ₽');
  $('#calc_payment_range').val(payment);
  $('#calc_payments_sum').val(addSpaces(Math.round(payments_sum)) + ' ₽');
  $('#calc_overpayment').val(addSpaces(Math.round(overpayment)) + ' ₽');
  $('#sumcr').val(addSpaces(sum) + ' ₽');
  $('[name=sum-f]').val(addSpaces(sum) + ' ₽');
  $('[name=sumcr]').val(addSpaces(sum) + ' ₽');
  $('[name=summ]').val(addSpaces(sum) + ' ₽');
}

function getTotal(){
  var stv = $('#calc_rate_range').val();
  var mths =parseFloat($('#calc_term_range').val());
  var procent = (summa*((mths*stv)/100));
  var total = parseFloat(procent) + parseInt(summa);
  var every = total/mths;


  procent =Math.ceil((procent)*100)/100;
  total =Math.ceil((total)*100)/100;
  every =Math.ceil((every)*100)/100;


 // $('[name=procent]').inputmask( { "mask":getMask(procent), "greedy": false ,placeholder:"",numericInput: true } );
 // $('[name=sum]').inputmask( { "mask":getMask(total), "greedy": false ,placeholder:"",numericInput: true } );
  //$('[name=payment]').inputmask( { "mask":getMask(every), "greedy": false ,placeholder:"",numericInput: true } );
  //$('[name=sumcr],[name=sum-f]').inputmask( { "mask":getMask(total), "greedy": false ,placeholder:"",numericInput: true } );



  $('[name=payment]').val(every+' ₽');
  $('[name=procent]').val(procent+' ₽');
  $('[name=sum]').val(total+' ₽');
  $('[name=sumcr],[name=sum-f]').val(total+' ₽');

}
$('[name=sumcr],[name=sum-f],[name=summ],[name=sum]').change(function(){

	var targ = $(this);
	var val = targ.val().replace(/[^-0-9]/gim,'').replace(' ','');
	targ.val(addSpaces(val)+' ₽');
});
function getStv(flag){
  var res,stv,stv2;
  var summa = parseFloat(document.getElementById('calc_sum_range').noUiSlider.get());
  var mths =parseFloat($('#calc_term_range').val());
  if(flag){
    if(mths<13){
      stv = 3.3;
    }else if(mths>=13 && mths<24){
      stv = 2.5;
    }else if(mths>=24  ){
      stv = 2;
    }
  }


  if(summa<100000){
    stv2 = 3.3;
  }else if(summa>=100000 && summa<500000){
    stv2 = 3;
  }else if(summa>=500000 && summa<1000000){
    stv2 = 2.5;
  }else if(summa>=1000000){
    stv2 = 2;
  }

  if(stv>stv2){
    res=stv2;
  }else{
    res=stv;
  }
  $('#calc_rate_range').val(res);

  $('.form-stv ').html(res);
  return res;
}
function showShedule() {
  var sum = parseFloat(document.getElementById('calc_sum_range').noUiSlider.get());
  var term = parseInt($('#calc_term_range').val());
  var base_rate = $('#calc_rate_range').val();
  var rate = parseFloat(base_rate /  100);
  var payment_type = $('#calc_payment_type').val();
  if (payment_type == '1') {
    var kef = (rate + (rate / (Math.pow(1 + rate, term) - 1)));
    var payment = (sum * kef);
    var title = 'График платежей';
  } else if (payment_type == '1') {
    var payment = (sum * rate);
    var title = 'График платежей';
  } else if (payment_type == '3') {
    var payment = (sum * rate);
    var title = 'График выплат';
  } else if (payment_type == '4') {
    var payment = 0;
    var title = 'График выплат';
  } else if (payment_type == '5') {
    var payment = 0;
    var title = 'График выплат';
  }
  var table = '<div class="col-sm-12"><div class="section-header text-left"><h2><span class="fa fa-th-list"></span> ' + title + '</h2><h4>';
  table += '<p class="mt20"><span class="gr"> Cумма: </span> <strong>' + addSpaces(sum) + ' ₽</strong>.</p> ';
  table += '<p class="mt20"><span class="gr"> Срок: </span><strong>' + term + ' месяцев</strong>.</p> ';
  table += '<p class="mt20><span class="gr"> Ставка: </span><strong>' + base_rate + '% в месяц</strong>.</p></h4>';
  if (payment_type <= 2) {

    table += '</div></div><div class="col-sm-12"><table class="calc-shedule"><tr class="calc-shedule-header"><th>№</th><th>Платеж, ₽</th><th>Платеж по процентам, ₽</th><th>Платеж по основному долгу, ₽</th><th>Остаток основного долга, ₽</th></tr>';
    var balance = sum;
    var rate_pay = 0;
    var loan_pay = 0;
    var payments_sum = 0;
    var rates_sum = 0;
    var pay = payment;
    var max_rate_pay = (sum * rate);
    for (var i = 1; i <= term; i++) {
      rate_pay = (balance * rate);
      loan_pay = (pay - rate_pay);
      if (balance - loan_pay < 0) {
        loan_pay = balance - 0;
        pay = loan_pay + (rate_pay - 0);
      }
      balance = (balance - loan_pay);
      if (i == term) {
        pay = (pay * 1 + balance * 1);
        loan_pay = (loan_pay * 1 + balance * 1);
        var max_loan_pay = loan_pay;
      }
    }
    balance = sum;
    for (var i = 1; i <= term; i++) {
      rate_pay = (balance * rate);
      loan_pay = (payment - rate_pay);
      if (balance - loan_pay < 0) {
        loan_pay = balance - 0;
        payment = loan_pay + (rate_pay - 0);
      }
      balance = (balance - loan_pay);
      if (i == term) {
        payment = (payment * 1 + balance * 1);
        loan_pay = (loan_pay * 1 + balance * 1);
        balance = 0;
      }
      payments_sum += payment * 1;
      rates_sum += rate_pay * 1;
      table += '<tr><td>' + i + '.</td>';
      table += '<td>' + addSpaces(payment.toFixed(2)) + '</td>';
      table += '<td><div style="background:#b0ebf3;width:' + (rate_pay * 100 / Math.max(max_loan_pay, max_rate_pay)).toFixed(2) + '%;height:25px;float:right;"></div><div style="padding-left:3px;">' + addSpaces(rate_pay.toFixed(2)) + '</div></td>';
      table += '<td><div style="background:#90ee90;width:' + (loan_pay * 100 / Math.max(max_loan_pay, max_rate_pay)).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(loan_pay.toFixed(2)) + '</div></td>';
      table += '<td><div style="background:#ffc0cb;width:' + (balance * 100 / sum).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(balance.toFixed(2)) + '</div></td></tr>';
    }
    table += '<tr class="calc-shedule-results"><td>Итого:</td>';
    table += '<td>' + addSpaces(payments_sum.toFixed(2)) + '</td>';
    table += '<td>' + addSpaces(rates_sum.toFixed(2)) + '</td>';
    table += '<td>' + addSpaces(sum.toFixed(2)) + '</td>';
    table += '<td></td></tr>';
    table += '</table></div>';
  } else {
    table += '</div></div><div class="col-sm-12"><table class="calc-shedule"><tr class="calc-shedule-header"><th>№</th><th>Начислено процентов, ₽</th><th>Выплата, ₽</th><th>Нарастающий доход, ₽</th><th>Сумма вклада, ₽</th></tr>';
    var balance = sum;
    var profit = 0;
    var interest = 0;
    var payment = 0;
    var interests_sum = 0;
    var payments_sum = 0;
    if (payment_type == '5') {
      var balance_result = sum * Math.pow(1 + rate, term);
      var profit_result = balance_result - sum;
    } else {
      var profit_result = sum * rate * term;
      var balance_result = sum + profit_result;
    }
    for (var i = 1; i <= term; i++) {
      if (payment_type == '3') {
        interest = balance * rate;
        payment = interest;
        profit = profit + interest;
        balance = balance + interest - payment;
        if (i == term) {
          payment = payment + balance;
        }
      } else if (payment_type == '4') {
        if (i == term) {
          interest = balance * rate * term;
          payment = interest + balance;
          profit = interest;
        }
      } else if (payment_type == '5') {
        interest = balance * rate;
        profit = profit + interest;
        balance = balance + interest - payment;
        if (i == term) {
          payment = payment + balance;
        }
      }
      interests_sum = interests_sum + interest;
      payments_sum = payments_sum + payment;
      table += '<tr><td>' + i + '.</td>';
      table += '<td>' + addSpaces(interest.toFixed(2)) + '</td>';
      table += '<td>' + addSpaces(payment.toFixed(2)) + '</td>';
      table += '<td><div style="background:#90ee90;width:' + (profit * 100 / profit_result).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(profit.toFixed(2)) + '</div></td>';
      table += '<td><div style="background:#ffc0cb;width:' + (balance * 100 / balance_result).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(balance.toFixed(2)) + '</div></td></tr>';
    }
    table += '<tr class="calc-shedule-results"><td>Итого:</td>';
    table += '<td>' + addSpaces(interests_sum.toFixed(2)) + '</td>';
    table += '<td>' + addSpaces(payments_sum.toFixed(2)) + '</td>';
    table += '<td>' + addSpaces(profit.toFixed(2)) + '</td>';
    table += '<td>' + addSpaces(balance.toFixed(2)) + '</td>';
    table += '</tr>';
    table += '</table></div>';
  }
  showModal(table);
}

function showTermCompare() {
  var sum = parseFloat(document.getElementById('calc_sum_range').noUiSlider.get());
  var base_rate = $('#calc_rate_range').val();
  var rate = parseFloat(base_rate / (12 * 100));
  var payment_type = $('#calc_payment_type').val();
  var table = '<div class="col-sm-12"><div class="section-header text-left"><h2><span class="fa fa-pie-chart"></span> Сравнение платежей для разных сроков</h2><h4>';
  table += 'Сумма: <strong>' + addSpaces(sum) + ' ₽</strong>. ';
  table += 'Ставка: <strong>' + base_rate + '% годовых</strong>.';
  table += '</h4><p><a href="#" onclick="showShedule(); return false;"><span class="fa fa-th-list"></span> График платежей...</a></p></div></div>';
  table += '<div class="col-sm-12"><table class="calc-shedule"><tr class="calc-shedule-header"><th>№</th><th>Срок, месяцев</th><th>Ежемесячный платеж, ₽</th><th>Сумма к выплате, ₽</th><th>Переплата процентов, ₽</th></tr>';
  var kef = 0;
  var payment = 0;
  var payments_sum = 0;
  var overpayment = 0;
  var years = Math.floor($('#calc_term_range').attr('max') / 12);
  if (payment_type == '1') {
    var max_payment = (sum * (rate + (rate / (Math.pow(1 + rate, 12) - 1)))).toFixed(2);
    var max_overpayment = (sum * (rate + (rate / (Math.pow(1 + rate, 12 * years) - 1)))).toFixed(2) * 12 * years - sum;
  } else if (payment_type == '2') {
    max_payment = (sum * rate).toFixed(2);
    max_overpayment = max_payment * 12 * years;
  }
  for (var i = 1; i <= years; i++) {
    term = i * 12;
    if (payment_type == '1') {
      kef = (rate + (rate / (Math.pow(1 + rate, term) - 1)));
      payment = (sum * kef).toFixed(2);
      payments_sum = payment * term;
      overpayment = payments_sum - sum;
    } else if (payment_type == '2') {
      payment = (sum * rate).toFixed(2);
      overpayment = payment * term;
      payments_sum = overpayment + sum;
    }
    table += '<tr><td>' + i + '.</td>';
    table += '<td>' + term + (term < 100 ? '&nbsp;&nbsp;' : '&nbsp;') + ' <a href="#" onclick="$(\'#calc_term_range\').val(' + term + ').change();showShedule();return false;">график <span class="fa fa-carret-right"></span></a></td>';
    table += '<td><div style="background:#ffc0cb;width:' + (payment * 100 / max_payment).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(payment) + '</div></td>';
    table += '<td>' + addSpaces(payments_sum.toFixed(2)) + '</td>';
    table += '<td><div style="background:#b0ebf3;width:' + (overpayment * 100 / max_overpayment).toFixed(2) + '%;height:25px;float:left;margin-right:-100%;"></div><div style="padding-left:3px;">' + addSpaces(overpayment.toFixed(2)) + '</div></td></tr>';
  }
  table += '</table></div>';
  showModal(table);
}
$(document).ready(function() {
  if (isIE()) {
    var rangeMethod1 = 'change';
    var rangeMethod2 = 'keyup';
  } else {
    var rangeMethod1 = 'input change';
    var rangeMethod2 = 'input change';
  }
  $('#calc_price_range').on(rangeMethod1, calcPriceRangeInput);
  $('#calc_fee_range').on(rangeMethod1, calcFeeRangeInput);

  document.getElementById('calc_sum_range').noUiSlider.on('slide', calcSumRangeInput);

  $('#calc_term_range').on(rangeMethod1, calcTermRangeInput);
  $('#calc_rate_range').on(rangeMethod1, calcRateRangeInput);
  $('#calc_payment_range').on(rangeMethod1, calcPaymentRangeInput);
  $('#calc_payment_type').change(function() {
    calcResult();
  });
  $('#calc_price').change(function() {
    calcPriceRangeInput();
  });
  $('#calc_fee').change(function() {
    calcFeeRangeInput();
  });
  $('#calc_sum').change(function() {
    calcSumRangeInput();
  });
  $('#calc_term').change(function() {
    calcTermRangeInput();
  });
  $('#calc_rate').change(function() {
    calcRateRangeInput();
  });

  $('#calc_payment').change(function() {
    var it = $(this);
    var val = it.val().replace(/[^\d]/g, '');
    $('#calc_payment_range').val(val);
    calcPaymentRangeInput();
  });
  $('#calc_price').on(rangeMethod2, function() {
    var it = $(this);
    var val = it.val().replace(/[^\d]/g, '');
    $('#calc_price_range').val(val);
    calcSumFromPriceAndFee();
  });
  $('#calc_fee').on(rangeMethod2, function() {
    var it = $(this);
    var val = it.val().replace(/[^\d]/g, '');
    $('#calc_fee_range').val(val);
    calcSumFromPriceAndFee();
  });
  $('#calc_sum').on(rangeMethod2, function() {
    var it = $(this);
    var val = it.val().replace(/[^\d]/g, '');
    document.getElementById('calc_sum_range').noUiSlider.set(val);
    // $('#calc_sum_range').val(val);
    calcResult();
  });
  $('#calc_term').on(rangeMethod2, function() {
    var it = $(this);
    var val = it.val().replace(/[^\d]/g, '');
    $('#calc_term_range').val(val);
    calcResult();
  });
  $('#calc_rate').on(rangeMethod2, function() {
    var it = $(this);
    var val = it.val().replace(/[^\d\.\,]/g, '').replace(/\,/g, '.');
    $('#calc_rate_range').val(val);
    calcResult();
  });
  $('.file-text-graf').click(function(event) {
    event.preventDefault();
    // $('html').css('overflow-y','hidden');
    showShedule();

  });
  $('.calc-term-compare-show').click(function(event) {
    event.preventDefault();
    showTermCompare();
  });
  $('.calc-preset').click(function() {
    var min_rate = $(this).data('rate-min');
    var max_rate = $(this).data('rate-max');
    var rate_step = $(this).data('rate-step');
    var min_term = $(this).data('term-min');
    var max_term = $(this).data('term-max');
    var min_sum = $(this).data('sum-min');
    var max_sum = $(this).data('sum-max');
    var min_fee = $(this).data('min-fee');
    $('#calc_rate_range').attr('min', min_rate);
    $('#calc_rate_range').attr('max', max_rate);
    $('#calc_rate_range').attr('step', rate_step);
    $('#min_rate').html('от ' + min_rate + '% годовых');
    $('#max_rate').html('до ' + max_rate + '% годовых');
    $('#calc_term_range').attr('min', min_term);
    $('#calc_term_range').attr('max', max_term);
    $('#min_term').html('от ' + min_term + ' месяцев');
    $('#max_term').html('до ' + max_term + ' месяцев');

    document.getElementById('calc_sum_range').updateOptions({
      range: {
        min: min_sum
      }
    });

    // $('#calc_sum_range').attr('min', );
    $('#min_sum').html('от ' + addSpaces(min_sum) + ' ₽');
    $('#calc_price_range').attr('min', min_sum);
    $('#calc_price_range').attr('max', max_sum);
    $('#min_price').html('от ' + addSpaces(min_sum) + ' ₽');
    $('#max_price').html('от ' + addSpaces(max_sum) + ' ₽');
    $('#calc_min_fee').val(min_fee);
    calcRateRangeInput();
    calcTermRangeInput();
    calcPriceRangeInput();
    calcSumRangeInput();
    calcResult();
    $('html, body').scrollTo($('#calculator'), 300);
  });
  $('#sumcr').on('keyup change',function(){
    var val = $(this).val();
    var summa = val.replace(/[^-0-9]/gim,'');
    val = addSpaces(val.replace(/[^-0-9]/gim,'')+ ' ₽');

    $(this).val(val);

    var stv2= 0;
    if(summa<100000){
      stv2 = 3.3;
    }else if(summa>=100000 && summa<500000){
      stv2 = 3;
    }else if(summa>=500000 && summa<1000000){
      stv2 = 2.5;
    }else if(summa>=1000000   ){
      stv2 = 2;
    }

    $('#calc_rate_range').val(stv2);
    $('.form-stv ').html(stv2);

    $('[name=calc_sum]').val(val);
    //$('[name=calc_sum]').trigger('change');
  });
  $('#sum-f').on('keyup change',function(){
    var val = $(this).val();
    var summa = val.replace(/[^-0-9]/gim,'');
    val = addSpaces(val.replace(/[^-0-9]/gim,'')+ ' ₽');

    $(this).val(val);

    var stv2= 0;
    if(summa<100000){
      stv2 = 3.3;
    }else if(summa>=100000 && summa<500000){
      stv2 = 3;
    }else if(summa>=500000 && summa<1000000){
      stv2 = 2.5;
    }else if(summa>=1000000   ){
      stv2 = 2;
    }

    $('#calc_rate_range').val(stv2);
    $('.form-stv ').html(stv2);
    $('[name=calc_sum],#sumcr').val(val);

    //$('[name=calc_sum]').trigger('change');
  });
  calcResult();
});