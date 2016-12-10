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
//  End of smooth scroll effect

/**
 * Listen to scroll to change header opacity class
 */
function checkScroll(){
  var startY = $('.navbar').height() * 1.15; //The point where the navbar changes in px

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

 
