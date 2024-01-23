$(function(){
    var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언
	
    // --vh 모바일 높이값
	function setScreenSize(){
		let vh = window.innerHeight * 0.01;
	  
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}  
	setScreenSize();
	window.addEventListener('resize', () => setScreenSize());

    // 
    $(window).on("scroll", function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        let scrollTop = $(this).scrollTop();
        let limit;
        if($(".topInfo").hasClass("close")){
            limit = 20;
        }else{
            limit = $(".topInfo").outerHeight(true);
        }

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

    // nav
    $("nav>ul>li>a").on("click", function(e){
		
		if($(this).attr("href") != "#" && $($(this).attr("href")).length > 0){
			sectionLocation = $($(this).attr("href")).offset().top - 102;
			$("html, body").animate({"scrollTop":sectionLocation},500);
		}	

		return false;
	})
    $(window).on("scroll", function(){
        let sec01 = $("#content1").offset().top; sec01=0;
        let sec02 = $("#content2").offset().top-$(window).height()*4/6;
        let sec03 = $("#content3").offset().top-$(window).height()*4/6;
        let sec04 = $("#content4").offset().top-$(window).height()*4/6;
        let sec05 = $("#content5").offset().top-$(window).height()*4/6;
        let sec06 = $("#content6").offset().top-$(window).height()*4/6;
        let scrTop = $(window).scrollTop();

        $("nav ul li").removeClass("on");
        if (scrTop >= sec01 && scrTop < sec03) { $("nav ul li a[href='#content1']").parent().addClass("on"); $(".content1").addClass("effect")}
        // else if (scrTop >= sec02 && scrTop < sec03) { $("nav ul li a[href='#content2']").parent().addClass("on"); $(".content2").addClass("effect")}
        else if (scrTop >= sec03 && scrTop < sec05) { $("nav ul li a[href='#content3']").parent().addClass("on"); $(".content3").addClass("effect")}
        // else if (scrTop >= sec04 && scrTop < sec05) { $("nav ul li a[href='#content4']").parent().addClass("on"); $(".content4").addClass("effect")}
        else if (scrTop >= sec05 && scrTop < sec06) { $("nav ul li a[href='#content5']").parent().addClass("on"); $(".content5").addClass("effect")}
        else if (scrTop >= sec06) { $("nav ul li a[href='#content6']").parent().addClass("on"); }
    });


    //Select Box
    $('#divSearch .selectW select').on("focus",function(){
        $('.selectW').click();
    });
    $('#divSearch .selectW').on("click",function(){
        if($(this).hasClass('on')){
			$('#divSearch .selectBox .srchSelectBox').slideUp();
			$(this).removeClass('on');
            return false;
		}else{
			$('#divSearch .selectBox .srchSelectBox').slideDown();
			$(this).addClass('on');
            return false;
		}
    });
    $("#divSearch .inputBox .textInput").on("focus",function(){
        $('#divSearch .selectBox .srchSelectBox').slideUp();
        $('#divSearch .selectW').removeClass('on');
        return false;
    });
	// 영역외 클릭시 닫기
	$('body').click(function(e){
		if(!$('#divSearch .selectW').has(e.target).length){
			$('#divSearch .selectBox .srchSelectBox').stop().slideUp();
			$('#divSearch .selectW').removeClass('on');
		}
	});
    // 검색창 select Box
    $('#divSearch .OptList > ul > li > a').click(function(e){
        var optText = $(this).text();
        $(this).parent().parent().parent().parent().prev().find('select').attr('title',$(this).text());//옵션선택시 텍스트 변경
        $(this).parent().parent().parent().parent().prev().find('label').text($(this).text());//옵션선택시 텍스트 변경
        $(this).parent().parent().parent().parent().siblings().children('select').find('option').removeAttr('selected');
        $(this).parent().parent().parent().parent().siblings().children('select').find('option').filter(function() {return this.text == optText;}).attr('selected', 'selected');

        // inputBox
        $(".inputBox .searchInput").eq($(this).parent().index()).addClass("on").siblings().removeClass("on");
       
        $('.selectBox .srchSelectBox').stop().slideUp();
        $('.selectW').removeClass('on');

        return false;
    });
	// quickMenu
    let quickMenuSwiper = new Swiper(".quickMenu .swiper",{
        slidesPerView: "auto",
        observer: true,
        observeParents: true,      
        centerInsufficientSlides:true,
    });
    // 공지사항
    $(".noticeTab>li>a").on("click", function(){
        $(this).parent().addClass("on").siblings().removeClass("on");

        return false;
    });
 

    // 이벤트존
    $(".eventZone .eventW").slick({
        slidesToShow: 1,
        infinite: true,
        arrows:true,
        appendArrows : $(".eventZone .controller .btnW"),
        prevArrow: $(".eventZone .prevBtn"),
        nextArrow: $(".eventZone .nextBtn"),
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 1500,
        dots: true,
        appendDots:$(".eventZone .controller .pagination"),
        customPaging: function (slider, i) {
            let num;
            let total;
            if(i+1 < 10){
                num = "0" + (i+1);
            }else{
                num = (i+1);
            }
            if(slider.slideCount < 10){
                total = "0" + slider.slideCount;
            }else{
                total = slider.slideCount;
            }
            return '<span class="now">'+num+'</span> <span class="progress"><span></span></span> <span class="total">'+ total +'</span>';
        } 
    });
    $(".eventZone .autoPlay").on("click", function(){
        if($(this).hasClass("stop")){
            $(".eventZone .eventW").slick('slickPlay');
            $(this).removeClass("stop")
            $(this).attr("title","멈춤");
        }else{
            $(".eventZone .eventW").slick('slickPause');
            $(this).addClass("stop");
            $(this).attr("title","재생");
        }
        
        return false;
    });


    // 인포그래픽
    $(".infoGraphic .graphicW").slick({
        slidesToShow: 1,
        infinite: true,
        arrows:true,
        appendArrows : $(".infoGraphic .controller .btnW"),
        prevArrow: $(".infoGraphic .prevBtn"),
        nextArrow: $(".infoGraphic .nextBtn"),
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 1500,
        dots: true,
        appendDots:$(".infoGraphic .controller .pagination"),
        customPaging: function (slider, i) {
            let num;
            let total;
            if(i+1 < 10){
                num = "0" + (i+1);
            }else{
                num = (i+1);
            }
            if(slider.slideCount < 10){
                total = "0" + slider.slideCount;
            }else{
                total = slider.slideCount;
            }
            return '<span class="now">'+num+'</span> <span class="progress"><span></span></span> <span class="total">'+ total +'</span>';
        } 
    });
    $(".infoGraphic .autoPlay").on("click", function(){
        if($(this).hasClass("stop")){
            $(".infoGraphic .graphicW").slick('slickPlay');
            $(this).removeClass("stop")
            $(this).attr("title","멈춤");
        }else{
            $(".infoGraphic .graphicW").slick('slickPause');
            $(this).addClass("stop");
            $(this).attr("title","재생");
        }
        
        return false;
    });



    // 이용시간-slick
    // 서울캠퍼스
    $(".usingTime .campusTime.seoul .timeList").slick({
        slidesToShow: 2,
        slidesPerRow: 2,
        vertical: true,
        verticalSwiping:true,
        infinite: true,
        arrows:true,
        appendArrows : $(".usingTime .campusTime.seoul .controller"),
        prevArrow: $(".usingTime .campusTime.seoul .prevBtn"),
        nextArrow: $(".usingTime .campusTime.seoul .nextBtn"),
        autoplay:true,
        autoplaySpeed: 2500,
        speed: 1000,
        responsive: [
					{ 
						breakpoint: 440,
						settings: {	
							slidesToShow: 4,
                            slidesPerRow: 1,
						} 
					}
		]
    });
    // 국제캠퍼스
    $(".usingTime .campusTime.inter .timeList").slick({
        slidesToShow: 2,
        slidesPerRow: 2,
        vertical: true,
        verticalSwiping:true,
        infinite: true,
        arrows:true,
        appendArrows : $(".usingTime .campusTime.inter .controller"),
        prevArrow: $(".usingTime .campusTime.inter .prevBtn"),
        nextArrow: $(".usingTime .campusTime.inter .nextBtn"),
        autoplay:true,
        autoplaySpeed: 2500,
        speed: 1000,
        responsive: [
            { 
                breakpoint: 440,
                settings: {	
                    slidesToShow: 4,
                    slidesPerRow: 1,
                } 
            }
]
    });


    // 도서관 일정 탭
    $(".scheduleTab>ul>li>a").on("click", function(){
        $(this).parent().addClass("on").siblings().removeClass("on");
        return false;
    });

    // 뉴스레터
    $(".newsLetter .newsLetterW").slick({
        slidesToShow: 1,
        infinite: true,
        arrows:true,
        appendArrows : $(".newsLetter .controller .btnW"),
        prevArrow: $(".newsLetter .prevBtn"),
        nextArrow: $(".newsLetter .nextBtn"),
        autoplay:true,
        autoplaySpeed: 4000,
        speed: 1500,
        dots: true,
        appendDots:$(".newsLetter .controller .pagination"),
        customPaging: function (slider, i) {
            let num;
            let total;
            if(i+1 < 10){
                num = "0" + (i+1);
            }else{
                num = (i+1);
            }
            if(slider.slideCount < 10){
                total = "0" + slider.slideCount;
            }else{
                total = slider.slideCount;
            }
            return '<span class="now">'+num+'</span> <span class="progress"><span></span></span> <span class="total">'+ total +'</span>';
        } 
    });
    $(".newsLetter .autoPlay").on("click", function(){
        if($(this).hasClass("stop")){
            $(".newsLetter .newsLetterW").slick('slickPlay');
            $(this).removeClass("stop")
            $(this).attr("title","멈춤");
        }else{
            $(".newsLetter .newsLetterW").slick('slickPause');
            $(this).addClass("stop");
            $(this).attr("title","재생");
        }
        
        return false;
    });
    // quicguideMenuListkMenu
    let guideMenuListSwiper1 = new Swiper(".guideMenuList1",{
        slidesPerView: "auto",
        observer: true,
        observeParents: true,      
    });
    let guideMenuListSwiper2 = new Swiper(".guideMenuList2",{
        slidesPerView: "auto",
        observer: true,
        observeParents: true,      
    });

    // 컬렉션
    // 도서목록-swiper
    let bookListSwiper = [];
    let bookList = [".bookListW1 .bookList",".bookListW2 .bookList",".bookListW3 .bookList",".bookListW4 .bookList"]
    let bookListpag = [".bookpag1",".bookpag2",".bookpag3",".bookpag4"];
    let bookListprev = [".bookPrev1",".bookPrev2",".bookPrev3",".bookPrev4"];
    let bookListnext = [".bookNext1",".bookNext2",".bookNext3",".bookNext4"];
    function bookListSwiperFn(i){
        if($(bookList[i]).length > 0){
            bookListSwiper[i] = new Swiper(bookList[i],{
                slidesPerView: "auto",
                initialSlide: 0,
                loop: true,
                observer: true,
                // observeParents: true,
                // observeSlideChildren: true,
                centerInsufficientSlides:true,
                centeredSlides: true,
                // speed: 600,
                // autoplay: {
                //     delay: 5000,
                //     disableOnInteraction: true,
                // },
                pagination: {
                    el: bookListpag[i],
                    type: "fraction",
                },
                navigation: {
                    nextEl: bookListnext[i],
                    prevEl: bookListprev[i],
                },
                breakpoints: {

                    1024: {
                    slidesPerView: 5,  //브라우저가 1024보다 클 때
                    centeredSlides: false,
                    },
                    1440: {
                        slidesPerView: 6,  //브라우저가 1440보다 클 때
                        centeredSlides: false,
                        observeParents: false,
                    },
                },
            });
        }else{
            bookListSwiper[i] = undefined;
        }
    }
    if($(".bookListW").length > 0){
        let bookListEl = $(".bookTab>ul>li");
        bookListEl.each(function(i,el){
            bookListSwiperFn(i);
        });

    }
    $(".bookTab > ul> li > a").on("click", function(){
        let i = $(this).parent().index();
        $(this).parent().addClass("on").siblings().removeClass("on");
        // 클릭탭의 swiper 삭제후 다시 생성
        if(bookListSwiper[i] != undefined){
            bookListSwiper[i].destroy();
            bookListSwiper[i]=undefined;
            bookListSwiperFn(i);
        }
        return false;
    });

    // // 더보기 버튼 움직임
    // var pointSize = $(".bookListW .more").width()/2;
    // let topP;
    // let leftP;
    // $(".content6").mousemove(function(e){
    //     $(".content6").addClass("mouseEffect");

    //     topP =  e.clientY - 50;
    //     leftP = e.clientX - 50;
    
    //     if(($(e.target).parents(".bookList").length > 0)){
    //         $(".content6").removeClass("mouseEffect");
            
    //     }else{
    //         $(".content6").addClass("mouseEffect");
    //     }
       
    //     $(".mouseEffect .bookListW .more").css({"position":"fixed","top": topP, "left": leftP, "right":"auto"},100);
    // });

    // $(".content6").on("mouseleave", function(){
    //     $(".content6").removeClass("mouseEffect");
    //     $(".bookListW .more").attr("style","");
    // });

    // userServiceList
    let userServiceListSwiper = new Swiper(".userServiceList",{
        slidesPerView: "auto",
        observer: true,
        observeParents: true,      
    });
    // banner
    let linkListSwiper = new Swiper(".bannerList .linkList",{
        slidesPerView: "auto",
        slidesPerGroup:1,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".bannerList .controller .nextBtn",
            prevEl: ".bannerList .controller .prevBtn",
        },
        loop:true,
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        breakpoints: {
            1024: {
                loop:false,
            }
        }
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

});