
import $ from 'jquery';
// create global $ and jQuery variables
global.$ = global.jQuery = $;

// var offsetTop = $('#skills').offset().top;
// $(window).on("scroll", function () {
//     var height = $(window).height();
//     var multiply = 4;
//     if ($(window).scrollTop() + height > offsetTop) {
//         $('.bar-container').each(function () {
//             $(this).find('.progressbar').animate({
//                 width: $(this).attr('data-percent'),

//             }, 2000);
//             var $this = $(this);  // here $this keeps the reference of $(this) in setTimeout
//             setTimeout(function () {
//                 $this.parent('li').children(".progressbar-title").children('.percent').html($this.attr('data-percent'));
//             }, 500 * multiply);
//             multiply++;

//         });
//     }
// });

var lang = {
    "html": "100%",
    "css": "90%",
    "javascript": "70%",
    "php": "55%",
    "angular": "65%"
  };
  
  var multiply = 4;
  
  $.each( lang, function( language, pourcent) {
  
    var delay = 700;
    
    setTimeout(function() {
      $('#'+language+'-pourcent').html(pourcent);
    },delay*multiply);
    
    multiply++;
  
  });