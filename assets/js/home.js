import{CheckLocalStorage,SetLocalStorage,CheckSesionStorage,SetSesionStorage} from "./base.js"
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
        nav:false,
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
        nav:false,
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
    $('#BigDiscounts .owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            400:{
                item:2
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    })
    $("#Phones>div:first-child >h1>span:last-child").click(function(){
        $("#Phones>div:first-child >button").css({
            display:"none"
        })
        $("#Phones>div:first-child >div").css({
            display:"block"
        })
        $(this).css({
            color:"black"
        })
        $(this).prev().prev().css({
            color:"rgba(128, 128, 128, 0.361)"
        })
        $("#Phones>div:first-child").css({
            height:"420px"
        })
    })
    $("#Phones>div:first-child >h1>span:first-child").click(function(){
        $("#Phones>div:first-child >button").css({
            display:"block"
        })
        $("#Phones>div:first-child >div").css({
            display:"none"
        })
        $(this).css({
            color:"black"
        })
        $(this).next().next().css({
            color:"rgba(128, 128, 128, 0.361)"
        })
        $("#Phones>div:first-child").css({
            height:"560px"
        })
    })
    
    let dbSignIn=CheckSesionStorage("signIn1");
    let dbSignUp=CheckLocalStorage("signUp1")
    let emailInput=$("#email");
    let passwordInput=$("#password");
    $("#signIn>div>form>button:first-of-type").click(function(){
        let succes=false;
        for (let i = 0; i < dbSignUp.length; i++) {
            if (emailInput.val()==dbSignUp[i].Email) {
                succes=true;
            }
        }
        if(succes==false){
            emailInput.next().css({
                display:"block"
            })
            emailInput.val("");
            return
        }
        else{
            emailInput.next().css({
                display:"none"
            })
        }
        let existUser=dbSignUp.find(x=>x.Email==emailInput.val())
        
        if (existUser.Password!=passwordInput.val()) {
            passwordInput.next().css({
                display:"block"
            })
            passwordInput.val("");
            return
        }
        else{
            passwordInput.next().css({
                display:"none"
            })
        }
        dbSignIn.push({
            id:existUser.Id,
            Email:existUser.Email,
            Password:existUser.Password
        })
        SetSesionStorage(dbSignIn,"signIn1");
        window.location.replace("../../assets/profile.html");
    })
    $("#signIn>div>form>div .visible").click(function(){
        if($(this).css("display")=="block"){
            $(this).next().css({
                display:"block"
            })
            $(this).css({
                display:"none"
            })
            $(this).next().next().attr("type","text");
            
        }
        
    })
    $("#signIn>div>form>div .unvisible").click(function(){
        if($(this).css("display")=="block"){
            $(this).prev().css({
                display:"block"
            })
            $(this).css({
                display:"none"
            })
            $(this).next().attr("type","password");
            
        }
    })
    $("nav .profileAndBasket i:first-of-type").click(function(){
        $("#signIn").css({
            display:"block"
        })
        
    })
    $("#signIn>div>form>p:last-child a").click(function(){
        $("#signIn").css({
            display:"none"
        })
    })
    let arrPlus=document.querySelectorAll("p>span:last-of-type>.fa-plus");
    let arrMinus=document.querySelectorAll("p>span:last-of-type>.fa-minus");
    let pruducts=CheckLocalStorage("Basket");
    
    document.querySelector("nav>div>div:last-child >span").innerHTML=0;
    let count=0;
    for (let i = 0; i < pruducts.length; i++) {
       count+=pruducts[i].Count
    }
    document.querySelector("nav>div>div:last-child >span").innerHTML=count;
    for (let i = 0; i < arrPlus.length; i++) {
        // pruducts.push({
        //     Name:arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
        //     Count:parseInt(arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML),
        //     Sale:parseInt(arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML.split("%")[0]),
        //     Price:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
        //     ImgSrc:arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.src,
        //     OldPrice:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
        // })
        arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i].Count
        if (arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
            arrPlus[i].parentElement.firstElementChild.style.display="none";
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
            
            arrPlus[i].parentElement.style.top="0px";
        }
        arrPlus[i].addEventListener("click",function(){
            arrPlus[i].parentElement.firstElementChild.style.display="block";
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="block"
            arrPlus[i].parentElement.style.top="-48px";
            pruducts[i].Count+=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i].Count;
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
        })
        arrPlus[i].parentElement.firstElementChild.addEventListener("click",function(){
            pruducts[i].Count-=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i].Count;
            SetLocalStorage(pruducts,"Basket");
            if (arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
                arrPlus[i].parentElement.firstElementChild.style.display="none";
                arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
                
                arrPlus[i].parentElement.style.top="0px";
            }
            window.location.reload();
            
        })
        
    }
    
    
})