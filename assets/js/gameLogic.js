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

// jQuery variables
var $gameArea = $("#gameArea");
var $gameContentArea = $("#gameContentArea");
var $timerClockArea = $("#timerClockArea");

var triviaGame = {

  // game variables
  correctGuesses: 0,
  wrongGuesses: 0,
  timeLimit: 120, // 2mins
  countDownStarted: false,
  gameOver: false,

  // questions object
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
    },
    q3: {
      question: "Which HTML tag is used to define an internal style sheet?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>A 'css' tag</p></div>",
        "<div class='answers' data-integrity='false'><p>A 'script' tag</p></div>",
        "<div class='answers' data-integrity='truth'><p>A 'style' tag</div>",
        "<div class='answers' data-integrity='false'><p>A 'sheet' tag</div>"
      ]
    },
    q4: {
      question: "Which is the correct CSS syntax?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>{body;color:black;}</p></div>",
        "<div class='answers' data-integrity='false'><p>{body:color=black;}</p></div>",
        "<div class='answers' data-integrity='truth'><p>body {color: black;}</p></div>",
        "<div class='answers' data-integrity='false'><p>body:color=black;</p></div>"
      ]
    },
    q5: {
      question: "How do you change the font of an element?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>font-style</p></div>",
        "<div class='answers' data-integrity='false'><p>font-face</p></div>",
        "<div class='answers' data-integrity='truth'><p>font-family</p></div>",
        "<div class='answers' data-integrity='false'><p>font-type</p></div>"
      ]
    },
    q6: {
      question: "How do you insert a comment in a CSS file?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>// this is a comment</p></div>",
        "<div class='answers' data-integrity='truth'><p>/* this is a comment */</p></div>",
        "<div class='answers' data-integrity='false'><p>' this is a comment</p></div>",
        "<div class='answers' data-integrity='false'><p># this is a comment</p></div>"
      ]
    },
    q7: {
      question: "Which CSS property is used to change the text color of an element?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>font-color</p></div>",
        "<div class='answers' data-integrity='truth'><p>color</p></div>",
        "<div class='answers' data-integrity='false'><p>text-color</p></div>",
        "<div class='answers' data-integrity='false'><p>font-colored</p></div>"
      ]
    },
    q8: {
      question: "What is the correct CSS syntax for making all the &#60p&#62 elements bold?",
      answerChoices: [
        "<div class='answers' data-integrity='false'><p>&#60;p style='text-size:bold;'></p></div>",
        "<div class='answers' data-integrity='truth'><p>p {font-weight:bold;}</p></div>",
        "<div class='answers' data-integrity='false'><p>&#60;p style='font-size:bold;'></p></div>",
        "<div class='answers' data-integrity='false'><p>p {text-size:bold;}</p></div>"
      ]
    },
    q9: {
      question: "How do you make each word in a text start with a capital letter?",
      answerChoices: [
        "<div class='answers' data-integrity='truth'><p>text-transform:capitalize</p></div>",
        "<div class='answers' data-integrity='false'><p>You can't do that with CSS</p></div>",
        "<div class='answers' data-integrity='false'><p>text-transform:uppercase</p></div>"
      ]
    },
    q10: {
      question: "How do you display all hyperlinks without an underline?",
      answerChoices: [
        "<div class='answers' data-integrity='truth'><p>a {text-decoration:none;}</p></div>",
        "<div class='answers' data-integrity='false'><p>a {underline:none;}</p></div>",
        "<div class='answers' data-integrity='false'><p>a {text-decoration:no-underline;}</p></div>",
        "<div class='answers' data-integrity='false'><p>a {font-decoration:none;}</p></div>"
      ]
    }
  },

  randomQuestion: function() {
    randomArr = [];
    for (var question in this.questions) {
      if (this.questions.hasOwnProperty(question)) {
        randomArr.push({
          info: this.questions[question]
        });
      }
    }
    randomQuestionIndex = Math.floor(Math.random() * randomArr.length);
    randomQuestion = randomArr[randomQuestionIndex];
    $("#gameAreaHeader").html(randomQuestion.info.question).fadeIn("slow");
    $("#choices").html(randomQuestion.info.answerChoices).fadeIn("slow");
    $(".answers").on('click', function() {
      var data = $(this).data('integrity');
      if (data === "truth") {
        console.log('right');
        triviaGame.handleCorrectGuesses();
      } else {
        console.log('wrong');
        triviaGame.handleWrongGuesses();
      }
    });
  },

  decrement: function() {
    triviaGame.timeLimit--
      $timerClockArea.html(triviaGame.timeLimit);
  },

  startCountdown: function() {
    countdownClock = setInterval(this.decrement, 1000);
  },

  handleCorrectGuesses: function() {
    this.correctGuesses += 1;
    if (!this.countDownStarted) {
      this.startCountdown();
      this.countDownStarted = true;
    }
    this.randomQuestion();
  },

  handleWrongGuesses: function() {
    this.wrongGuesses += 1;
    if (!this.countDownStarted) {
      this.startCountdown();
      this.countDownStarted = true;
    }
    this.randomQuestion();
  }
}

$(document).ready(function() {
  $gameArea.hide().fadeOut();
  $gameContentArea.empty();

  triviaGame.randomQuestion();

  $("#startGame").on('click', function() {
    $gameArea.fadeIn("slow");
  });
});
