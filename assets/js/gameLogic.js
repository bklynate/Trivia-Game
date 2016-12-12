/**
 * Start of smooth scroll effect
 */
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
function checkScroll() {
  var startY = $('.navbar').height() * 1.0; //The point where the navbar changes in px

  if ($(window).scrollTop() > startY) {
    $('.navbar').addClass("scrolled");
  }
  else {
    $('.navbar').removeClass("scrolled");
  }
}
if ($('.navbar').length > 0) {
  $(window).on("scroll load resize", function() {
    checkScroll();
  });
}
/**
 * END OF NAV SCROLL EFFECTS
 */

var $gameArea = $("#gameArea");
var $gameContentArea = $("#gameContentArea");

var triviaGame = {
  questions: {
    q1: {
      question: "What does CSS stand for?",
      answerChoices: [
        "<div class='answers' data-integrity='truth'><p>Cascading Style Sheets</p></div>",
        "<div class='answers' data-integrity='false'><p>Colorful Style Sheets</p></div>",
        "<div class='answers' data-integrity='false'><p>Computer Style Sheets</p></div>",
        "<div class='answers' data-integrity='false'><p>Creative Style Sheets</p></div>"
      ]
    },
    q2: {
      question: "Where in an HTML document is the correct place to refer to an external style sheet?",
      answerChoices: [
        "<div class='answers' data-integrity='truth'><p>In the 'head' section</p></div>",
        "<div class='answers' data-integrity='false'><p>In the 'body' section</p></div>",
        "<div class='answers' data-integrity='false'><p>At the end of the document</p></div>"
      ]
    }
  },

  randomQuestion: function() {
    randomArr = [];
    for (var question in this.questions) {
      if (this.questions.hasOwnProperty(question)) {
        randomArr.push({
          info: this.questions[question]
        }); //Dynamic
      }
    }
    randomQuestionIndex = Math.floor(Math.random() * randomArr.length);
    randomQuestion = randomArr[randomQuestionIndex];
    $("#gameAreaHeader").html(randomQuestion.info.question).fadeIn("slow");

    $("#choices").html(randomQuestion.info.answerChoices).fadeIn("slow");
  }
}

$(document).ready(function() {
  $gameArea.hide().fadeOut();
  $gameContentArea.empty();

  $("#startGame").on('click', function() {
    $gameArea.fadeIn("slow");
    triviaGame.randomQuestion();
    $(".answers").hover(function() {
      $(this).css("color", "white");
      $(this).css("background-color", "black");
    }, function() {
      $(this).css("color", "black");
      $(this).css("background-color", "#f2f2f2");
    });
    $(".answers").on('click', function() {
      var data = $(this).data('integrity');
      if (data === "truth") {
        alert("TRUE")
      }
      else {
        alert('WRONG!!');
      }
    });
  });
});
