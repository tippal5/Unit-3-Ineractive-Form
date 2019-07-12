// this is the code for to focus on name box when the page is opened
$(document).ready(function () {
  $('#name').focus();
});


$('#other-title').hide();

$('#title').change(function () {
  if ($('#title').val() === "other") {
    $('#other-title').show().focus();
  } else {
    $('#other-title').hide();
  }
});

$('#design option:first').hide();
$('#color option').hide();
$("#colors-js-puns").hide();

$('#design').change(function () {
  if ($('#design option:selected').val() === "js puns") {
    $('#color option:contains("JS Puns shirt only")').show();
    $('#color option:contains("JS shirt only")').hide();
    $('#color').val("cornflowerblue");
    $("#colors-js-puns").show();

  } else {
    ($('#design option:selected').val() === "heart js")
    $('#color option:contains("JS shirt only")').show();
    $('#color option:contains("JS Puns shirt only")').hide();
    $('#color').val("tomato");
    $("#colors-js-puns").show();

  }
});

let total = 0;

$('.activities input').on("click", function (e) {
  let timeDate = $(e.target).parent().text().match(/— (.*)\$/)[0];

  if (this.checked) {
    $(`.activities label:contains(${timeDate}) input:not(:checked)`).prop("disabled", true);
  } else {
    $(`.activities label:contains(${timeDate}) input`).prop("disabled", false);
  }
  total = 0;
  $('.activities input:checked').each(function () {
    total += $(this).parent().text().match(/[0-9]+$/)[0] * 1;
  });
  $('#total').text('$' + total);


});

$('#payment option:first').hide();
$('p:contains("PayPal")').hide();
$('p:contains("Bitcoin")').hide();

$('#payment').change(function () {

  if ($('#payment').val() === "credit card") {
    $('#credit-card').show().nextAll();
    $('p:contains("PayPal")').hide();
    $('p:contains("Bitcoin")').hide();
  }

  if ($('#payment').val() === "bitcoin") {
    $('#credit-card').hide().nextAll();
    $('p:contains("PayPal")').hide();
    $('p:contains("Bitcoin")').show();
  }

  if ($('#payment').val() === "paypal") {
    $('#credit-card').hide().nextAll();
    $('p:contains("PayPal")').show();
    $('p:contains("Bitcoin")').hide();
  }
});
// validation part

// if name contains empty string alert message to fill out the for and prevent the registration
// if email contains empty string alert message to fill out the for and prevent the registration
// if job role not selected  alert message to fill out the for and prevent the registration
// if total equals 0 alert message to fill out the for and prevent the registration
// if payment is not completed aler message.

function validateForm() {
  let formIsValid = validateName();
  formIsValid = validateEmail() && formIsValid;
  formIsValid = validateActivities() && formIsValid;
  formIsValid = validateCreditCard() && formIsValid;
  formIsValid = validateZip() && formIsValid;
  formIsValid = validateCVV() && formIsValid;
  return formIsValid;
}

function validateName() {
  var x = $("#name").val(); // validate name.
  $('#name + .err-msg').remove();
  if (x === "") {
    $('#name').after('<span class="err-msg" style="color:red">Enter a valid Name</span>');
    return false;
  } else {
    $('#name + .err-msg').remove();
    return true;
  }

}

function validateEmail() {

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailString = $('#mail').val();
  $('#mail + .err-msg').remove();
  if (!emailRegex.test(emailString)) {
    $('#mail').after('<span class = "err-msg" style="color:red">Enter a valid E-mail</span>');
    return false;
  } else {
    $('#mail + .err-msg').remove();
    return true;
  }


  console.log('Email must be filled out');

};

function validateActivities() {
  const totalRegex = /\$[0-9]{3,}/
  let totalString = $('#total').text();
  $('#total + .err-msg').remove();
  if (!totalRegex.test(totalString)) {
    $('#total').after('<span class="err-msg" style="color:red">Please select Activities!</span>');
    return false;
  } else {
    $('#total + .err-msg').remove();
    return true;
  }

};

function validateCreditCard() {
  //   Validate credit card number
  const ccRegex = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/
  let ccString = $('#cc-num').val();
  $('#cc-num + .err-msg').remove();
  if (!ccRegex.test(ccString)) {
    $('#cc-num').after('<span class="err-msg" style="color:red">Please enter a valid Credit Card!</span>');
    return false;
  } else {
    $('#cc-num + .err-msg').remove();
    return true;
  }
};


// Validate Zip Code
function validateZip() {
  const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/
  let zipString = $('#zip').val();
  $('#zip + .err-msg').remove();
  if (!zipRegex.test(zipString)) {
    $('#zip').after('<span class="err-msg" style="color:red">Please enter a valid Zip Code!</span>');
    return false;
  } else {
    $('#zip + .err-msg').remove();
    return true;
  };
};
//   //Validate CVV
function validateCVV() {
  const cvvRegex = /^[0-9]{3}$/
  let cvvString = $('#cvv').val();
  $('#cvv + .err-msg').remove();
  //e.preventDefault();
  if (!cvvRegex.test(cvvString)) {
    $('#cvv').after('<span class="err-msg" style="color:red">Please enter a valid CVV!</span>');
    return false;
  } else {
    $('#cvv + .err-msg').remove();
    return true;
  }
};


$('form').submit(function (e) {
  
  e.preventDefault();
  // validateForm();
  if (!validateForm()) {
    alert('Please Complete the Requiered Fields');
  } else {
    alert('Thank you for registering!')
    location.reload(true);
  }
});

