function showModal(id) {
  $("#" + id).fadeIn(200);
  $('body').toggleClass('no-scroll');
}

function hideModal(id) {
  $("#" + id).fadeOut(300);
  $('body').toggleClass('no-scroll');
}

let today = new Date().toISOString().substr(0, 10);
//document.querySelector("#datepicker").value = today;




// Button click ripple effect
$(document).ready(function () {
  $(function () {
    var ink, d, x, y;
    $(".ripplelink").click(function (e) {
      if ($(this).find(".ink").length === 0) {
        $(this).prepend("<span class='ink'></span>");
      }

      ink = $(this).find(".ink");
      ink.removeClass("animate");

      if (!ink.height() && !ink.width()) {
        d = Math.max($(this).outerWidth(), $(this).outerHeight());
        ink.css({
          height: d,
          width: d
        });
      }

      x = e.pageX - $(this).offset().left - ink.width() / 2;
      y = e.pageY - $(this).offset().top - ink.height() / 2;

      ink.css({
        top: y + 'px',
        left: x + 'px'
      }).addClass("animate");
    });
  });
});


$(document).ready(function () {
  $('#loginPopUp').click(function () {
    $('.loginForm').addClass("active");
    $('body').addClass("active");
  });
  $('.loginFormClose').click(function () {
    //alert("alert");
    $('.loginForm').removeClass("active");
    $('body').removeClass("active");
  });


  // All status 
  $('input').click(function () {
    $('input:not(:checked)').parent().parent().removeClass("active");
    $('input:checked').parent().parent().addClass("active");
  });
  $('input:checked').parent().parent().addClass("active");
});


$('.dr-call').click(function () {
  $('.dr-cell-no').addClass("active");
  $('body').addClass("active");
});
$('.dr-cell-no-close').click(function () {
  $('.dr-cell-no').removeClass("active");
  $('body').removeClass("active");
});