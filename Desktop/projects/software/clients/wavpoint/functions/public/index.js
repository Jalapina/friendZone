$(document).ready(function(){

    var video=document.getElementById("myVideo") ;   
    var clickfoward=document.getElementById("clickfoward") ;   
    var clickbackward=document.getElementById("clickbackward") ;   
    var unmute_div = document.getElementsByClassName("unmute")   

    $(video).on("click", function(e){
      video.muted = !video.muted;
    }); 
    let height = $(video).height()
    console.log(height)
     function unmute_logo_display_none(){
      $(unmute_div).css("display","none")
    }
    setTimeout(unmute_logo_display_none, 4000)

    var slideIndex = 1;
    showDivs(slideIndex);

    $(clickfoward).on("click", function(){
      showDivs(slideIndex += 1);
    }) 
    $(clickbackward).on("click", function(){
      showDivs(slideIndex += -1);
    }) 

    var counter = 0;
    var i = setInterval(function(){
        showDivs(slideIndex += 1);
        counter++;
    }, 4500);

    
    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {slideIndex = 1}
      if (n < 1) {slideIndex = x.length}
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      x[slideIndex-1].style.display = "inline-block";  
    }
}); 