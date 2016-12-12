// Adds Smooth Scroll Effect
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

/**
* End of smooth scroll effect
*/

/**
 * Listen to scroll to change header opacity class
 */
function checkScroll(){
  var startY = $('.navbar').height() * 1.0; //The point where the navbar changes in px

  if($(window).scrollTop() > startY){
    $('.navbar').addClass("scrolled");
  }else{
    $('.navbar').removeClass("scrolled");
  }
}
if($('.navbar').length > 0){
  $(window).on("scroll load resize", function(){
    checkScroll();
  });
}
/**
 * END OF NAV SCROLL EFFECTS
 */

var $gameArea = $("#gameArea");

var triviaGame = {
  questions: {
    q1: {
      header: "Question 1",
      text: "<b>Explain what a class selector is and how it’s used: </b>",
      choices: [
        "<p><span id='questNums'><b>1 )</b></span> A class can be thought of as a grouped collection of CSS attributes applied to HTML elements. This allows you to apply the same styling to multiple HTML elements by placing them in the same CSS class.</p>",
        "<p><span id='questNums'><b>2 )</b></span>A class can be thought of as a single identifier of CSS attributes applied to HTML elements. This allows you to apply the styling to HTML elements by placing them in the same CSS class.</p>"
      ],
      answer: 0
    },
    q2: {
      header: "Question 2",
      text: "Explain what a Id selector is and how it’s used: ",
      choices: [
        "<p><b>1)</b> A Id can be thought of as a grouped collection of CSS attributes applied to HTML elements. This allows you to apply the same styling to multiple HTML elements by placing them in the same CSS Id.</p>",
        "<p><b>2)</b>A Id can be thought of as a single identifier of CSS attributes applied to HTML elements. This allows you to apply the styling to HTML elements by placing them in the same CSS Id.</p>"
      ],
      answer: 1
    }
  }
}

$(document).ready(function() {
  $gameArea.hide().fadeOut();

  var triGameRef = triviaGame.questions
  $("#startGame").on('click', function(){
    $gameArea.fadeIn("slow");
    $("#gameAreaHeader").html(triviaGame.questions.q1.header);
    $("#gameContent").html(triviaGame.questions.q1.text).fadeIn("slow");
    $("#choices").html(triviaGame.questions.q1.choices).fadeIn("slow");
    $("#choices").on('click', function(){
      
    })
  });
});
