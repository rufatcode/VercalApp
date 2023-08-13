$("document").ready(function(){
    
    $("#headling .catagory>span").click(function(){
        if ($("#headling .catagory>div").attr("class").includes("d-none")) {
            $("#headling .catagory>div").removeClass("d-none");
            $("#headling .catagory>div").addClass("d-block");
            $("#headling .catagory>span>i").addClass("fa-chevron-down");
            $("#headling .catagory>span>i").removeClass("fa-chevron-right");
            
        }
        else{
            $("#headling .catagory>div").addClass("d-none");
            $("#headling .catagory>div").removeClass("d-block");
            $("#headling .catagory>span>i").removeClass("fa-chevron-down");
            $("#headling .catagory>span>i").addClass("fa-chevron-right");
            
        }
    })
    $("nav .searchContent>input").mouseenter(function(){
        $("nav .searchContent>input").css({
            'border-color':'red',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("nav .searchContent>input").mouseleave(function(){
        $("nav .searchContent>input").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })
    
    $("nav .searchContent .Selection").mouseenter(function(){
        $("nav .searchContent>input").css({
            'border-color':'red',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("nav .searchContent .Selection").mouseleave(function(){
        $("nav .searchContent>input").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
        $("nav .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })

    $("nav .Selection").click(function(){
        if ($("nav .Selection>div").attr("class").includes("d-none")) {
            $("nav .Selection>div").removeClass("d-none");
            $("nav .Selection>div").addClass("d-block");

            
        }

        else{
            $("nav .Selection>div").addClass("d-none");
            $("nav .Selection>div").removeClass("d-block");
            
        }
       
    })
    $("nav .Selection .Catagory p").click(function(){
        $("nav .Selection>span").html($(this).html());   
    })


    
    

    
    
    
    
    
    if (window.screen.width<"900") {
        $(" nav>div>.searchContent input").addClass("rounded-end-pill");
    }
    else{
        $(" nav>div>.searchContent input").removeClass("rounded-end-pill");
    }
    
    $('#stock .owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        autoplayTimeout:3000,
        smartSpeed:500,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
    $('#FlashDeals .owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            400:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })
    $('#TopCategories .owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })
    $('#TopCategories .last .owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    })
    $('#TopRating .first .owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    })
    
    
    
})