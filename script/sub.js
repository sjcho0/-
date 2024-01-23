$(function(){
    var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

    // --vh 모바일 높이값
	function setScreenSize(){
		let vh = window.innerHeight * 0.01;
	  
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}  
	setScreenSize();
	window.addEventListener('resize', () => setScreenSize());

    $(window).on("scroll", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        let scrollTop = $(this).scrollTop();
        let limit = 0;
        

        if(scrollTop >  limit){
            $("#divWrapper").addClass("fixed");
        }else{
            $("#divWrapper").removeClass("fixed");
        }
      
    })

    // topInfo
    $(".topInfo .topInfoClose").on("click", function(){
        if($(".topInfo").hasClass("close")){
            $(".topInfo .infoList").slideDown();
            $(".topInfo").removeClass("close");
            $("#divWrapper").removeClass("tInfoClose");
        }else{
            $(".topInfo .infoList").slideUp();
            $(".topInfo").addClass("close");
            $("#divWrapper").addClass("tInfoClose");
        }
        return false
    });

    // divTopMenu
    $("#divTopMenu>ul>li>a").on("click",function(){
        if($(this).parent().hasClass("on")){
            $("#divWrapper").removeClass("topMenuOpen");
            $(this).parent().find(".depth2W").hide();
            $(this).parent().removeClass("on");
            $(".blackBg").fadeOut();
        }else{
            $("#divWrapper").addClass("topMenuOpen");
            $(this).parent().siblings().find(".depth2W").hide();
            $(this).parent().find(".depth2W").slideDown(500);
            $(this).parent().addClass("on").siblings().removeClass("on");
            $(".blackBg").fadeIn();
        }
        

        return false
    });
    $("#divTopMenu>ul>li>a").on("focus",function(){
        $("#divWrapper").addClass("topMenuOpen");
        $(this).parent().find(".depth2W").slideDown(500);
        $(this).parent().siblings().find(".depth2W").hide();
        $(".blackBg").fadeIn();
        return false
    });
    // menu 제외 클릭시 depth2W 닫힘
    $('html').click(function(e) {   
        if($(e.target).parents('.header1').length < 1){   
            $("#divWrapper").removeClass("topMenuOpen");
            $("#divTopMenu .depth2W").hide();
            $("#divTopMenu>ul>li").removeClass("on");
            $(".blackBg").fadeOut();
        }
    });
    $(".wholeMenuBtn").on("focus",function(){
        $("#divWrapper").removeClass("topMenuOpen");
        $("#divTopMenu .depth2W").hide();
        $("#divTopMenu>ul>li").removeClass("on");
        $(".blackBg").fadeOut();
    });
    $(window).on("resize", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        if(winWidth <= 1064){
            $("#divWrapper").removeClass("topMenuOpen");
            $(".blackBg").fadeOut();
        }
    });
    // 요약정보
    $("#divGlobalMenu .myInfo>a").on("click", function(){
        if($(this).parent().hasClass("on")){
            $(this).next().fadeOut();
            $(this).parent().removeClass("on")
        }else{
            $(this).next().fadeIn();
            $(this).parent().addClass("on")
        }
        return false;
    });
    $(".mobileMenu .myInfo>a").on("click", function(){
        if($("#divGlobalMenu .myInfo").hasClass("on")){
            $("#divGlobalMenu .myInfo .myInfoW").fadeOut();
            $("#divGlobalMenu .myInfo").removeClass("on")
        }else{
            $("#divGlobalMenu .myInfo .myInfoW").fadeIn();
            $("#divGlobalMenu .myInfo").addClass("on")
        }
        return false;
    });
    $(".myInfoW .closeBtn").on("click", function(){
        $(".myInfoW").fadeOut();
        $("#divGlobalMenu .myInfo").removeClass("on")
        
        return false;
    });
    // 요약정보 제외 클릭시 닫힘
    $('html').click(function(e) {   
        if($(e.target).parents('.myInfo').length < 1){   
            $("#divGlobalMenu .myInfo .myInfoW").fadeOut();
        }
    });
    // wholeMenu
    $(window).on("resize", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
               
        if(winWidth <= 1064){
            // 요약정보 닫기
           $(".myInfoW").hide();
           $("#divGlobalMenu .myInfo").removeClass("on")
       }
       $(".wholeMenu .wm .depth3").removeAttr("style"); 
      
    })
    $(".wholeMenuBtn").on("click", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;

        $("html, body").css("overflow","hidden");
        $(".wholeMenu").fadeIn();
        $("#divHeader").addClass("wmOpen");

        // 요약정보 닫기
        $(".myInfoW").fadeOut();
        $("#divGlobalMenu .myInfo").removeClass("on")
        return false;
    });
    $(".wholeMenuClose").on("click", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        
        $("html, body").css("overflow","auto");
        $(".wholeMenu").fadeOut();
        $("#divHeader").removeClass("wmOpen");
        
        if(winWidth <= 1064){
            // 요약정보 닫기
           $(".myInfoW").hide();
           $("#divGlobalMenu .myInfo").removeClass("on")
        }
        return false;
    });
    $(".wholeMenu .wm>ul>li>a").on("click", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        if(winWidth <= 1024){
            $(this).parent().addClass("on").siblings().removeClass("on");
            return false;   
        }
    });
    $(".wholeMenu .wm .depth2>li>a").on("click", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        if(winWidth <= 1064){
            if($(this).parent().hasClass("on")){
                $(this).parent().removeClass("on");
                $(this).parent().children(".depth3").slideUp();
            }else{
                $(".wholeMenu .wm .depth3").slideUp();
                $(".wholeMenu .wm .depth2>li").removeClass("on");
                $(this).parent().addClass("on");
                $(this).parent().children(".depth3").slideDown();
            }
            return false;
        }
    });
    var mobileNavThumbs = new Swiper('.wholeMenu .mobileNav', {
        slidesPerView: "auto",  
        freeMode: true,  
        hashNavigation: true,
    });
    $(function(){
        var link = $('.wholeMenu .mobileNav a');
        link.on('click',function(e){
            //active 클래스 부여
            $(this).addClass('active');
            mobileNavThumbs.slideTo($(".wholeMenu .mobileNav .active").parent().index());	
        });
        $('.wholeMenu .wm').on('scroll',function(){
            findPosition();
        });
        function findPosition(){
            $('.wholeMenu .wm>ul>li').each(function(){
                if( ($(this).offset().top - $('.wholeMenu .wm').offset().top) < 60){
                    
                    link.removeClass('active');
                  
                    $('.wholeMenu .mobileNav').find('[data-scroll="'+ $(this).attr('id') +'"]').addClass('active');
                    mobileNavThumbs.slideTo($(".wholeMenu .mobileNav .active").parent().index());	
                }
                if($('.wholeMenu .wm').scrollTop() == 0 ){
                    link.removeClass('active');
                    $('.wholeMenu .mobileNav').find('[data-scroll="wmItem1"]').addClass('active');
                    mobileNavThumbs.slideTo($(".wholeMenu .mobileNav .active").parent().index());	
                }
            });
        }
        findPosition();
    });
   
    // divTabMenu
    let divTabMenuSwiper = new Swiper('#divTabMenu .inner',{
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
    });
	$(window).on("resize load",function(){
		if($('#divTabMenu .menu').length > 0){
			divTabMenuSwiper.slideTo($("#divTabMenu .menu.selected").index());	
		}
    });


    // divQuick
    $("#divQuick .quickBtn").on("click", function(){
        if($("#divQuick").hasClass("open")){
            $("#divQuick").removeClass("open")
        }else{
            $("#divQuick").addClass("open")
        }
        return false
    });

    // footer 
    // familySite
    $(".familySite>a").on("click", function(){
        if($(this).parent().hasClass("on")){
            $(this).parent().removeClass("on");
            $(this).next().slideUp();
        }else{
            $(this).parent().addClass("on");
            $(this).next().slideDown();
        }
        return false;
    });
    $(".gotoBtnW .gotoTop").on("click", function(){
        $("body, html").animate({scrollTop:0},500)
        return false;
    });



    // guide
    $(".guideTab>li>a").on("click", function(){

        $(this).parent().addClass("on").siblings().removeClass("on");
        $(".guideTabContW .guideTabCont").eq($(this).parent().index()).addClass("on").siblings().removeClass("on");

        return false;
    });
});