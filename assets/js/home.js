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
    let dbSignUp=CheckLocalStorage("signUp1");
    let singleProducts=CheckSesionStorage("SingleProduct");
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
    document.querySelector("#basket>div>h1>span").innerHTML=count+" item";
    if (count==0) {
        $("#basket>div>.first").css({
            display:"block"
        })
    }
    for (let i = 0; i < arrPlus.length; i++) {
        let finded=false;
        for (let j = 0; j < pruducts.length; j++) {
            if (pruducts[j].ImgSrc==arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.src) {
                finded=true;
            }
        }
        if (finded==false) {
            pruducts.push({
                Name:arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML,
                Count:parseInt(arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML),
                Sale:parseInt(arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML.split("%")[0]),
                Price:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
                ImgSrc:arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.src,
                OldPrice:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
            })
        }
        arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i].Count
        if (arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
            arrPlus[i].parentElement.firstElementChild.style.display="none";
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
            
            arrPlus[i].parentElement.style.top="0px";
        }
        arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.addEventListener("click",function(){
            if (singleProducts.length>0) {
                singleProducts.pop();
            }
           singleProducts.push({
                    ImgSrc:this.getAttribute("src"),
                    Brand:"Electronic Equipments",
                    Name:this.nextElementSibling.innerHTML,
                    Price:this.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                    Count:this.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
                })
                SetSesionStorage(singleProducts,"SingleProduct"); 
                window.location.replace("../../assets/singleProduct.html");
        })
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
    SetLocalStorage(pruducts,"Basket");
    $("nav .profileAndBasket i:first-of-type").next().click(function(){
        $("#basket").css({
            display:"flex"
        })
        
    })
    $("#basket>div>button:last-of-type").click(function(){
        window.location.reload();
    })
    let totalValue=0;
    for (let i = 0; i < pruducts.length; i++) {

        if (pruducts[i].Count>0) {
            let content=$("#basket>div>.content");
            
            let div=$("<div>");
            let ProductCountSpan=$("<span>");
            let plusIcon=$("<i>");
            plusIcon.addClass("fa-solid fa-plus");
            let childCount=$("<span>");
            childCount.html(pruducts[i].Count);
            let minusIcon=$("<i>");
            minusIcon.addClass("fa-solid fa-minus");
            ProductCountSpan.append(plusIcon,childCount,minusIcon);
            let img=$("<img>");
            img.attr("src",pruducts[i].ImgSrc);
            let productDiv=$("<div>");
            let productName=$("<h1>");
            productName.html(pruducts[i].Name);
            let Price=$("<span>");
            Price.html(`$ ${pruducts[i].Price} x`);
            let childCount1=$("<span>");
            childCount1.html(pruducts[i].Count);
            Price.append(childCount1);
            let totalPrice=$("<p>");
            totalPrice.html(`$ ${parseInt(pruducts[i].Price)*pruducts[i].Count}.00`);
            productDiv.append(productName,Price,totalPrice);
            let removeIcon=$("<i>");
            removeIcon.addClass("fa-solid fa-xmark");
            div.append(ProductCountSpan,img,productDiv,removeIcon)
            totalValue+=parseInt(pruducts[i].Price)*pruducts[i].Count;
            $("#basket>div>button:first-of-type >span").html(`($ ${totalValue}.00)`);
            if (pruducts[i].Count==1) {
            minusIcon.css({
                "background-color": "rgba(128, 128, 128, 0.275)",
                color:"gray",
                border:"0"
            })
            }
            plusIcon.click(function(){
                pruducts[i].Count=parseInt(pruducts[i].Count)+1;
                plusIcon.next().html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().find(">:first-child").html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().next().html(`$ ${pruducts[i].Count*pruducts[i].Price}.00`);
                let demoCount=0;
                let totalPriceDemo=0
                for (let i = 0; i < pruducts.length; i++) {
                   demoCount+=pruducts[i].Count;
                   totalPriceDemo+=pruducts[i].Count*pruducts[i].Price;
                }
                document.querySelector("nav>div>div:last-child >span").innerHTML=demoCount;
                document.querySelector("#basket>div>h1>span").innerHTML=demoCount+" item";
                $("#basket>div>button:first-of-type >span").html(`($ ${totalPriceDemo}.00)`);
                minusIcon.css({
                    "background-color": "white",
                    color:"red",
                    border:"1px solid rgba(255, 0, 0, 0.428)"
                })
                SetLocalStorage(pruducts,"Basket");
            })
            minusIcon.click(function(){
                if (pruducts[i].Count>1) {
                    pruducts[i].Count=parseInt(pruducts[i].Count)-1;
                    plusIcon.next().html(pruducts[i].Count);
                    plusIcon.parent().next().next().find(">:first-child").next().find(">:first-child").html(pruducts[i].Count);
                    plusIcon.parent().next().next().find(">:first-child").next().next().html(`$ ${pruducts[i].Count*pruducts[i].Price}.00`);
                    let demoCount=0;
                    let totalPriceDemo=0
                    for (let i = 0; i < pruducts.length; i++) {
                        demoCount+=pruducts[i].Count;
                        totalPriceDemo+=pruducts[i].Count*pruducts[i].Price;
                    }
                    document.querySelector("nav>div>div:last-child >span").innerHTML=demoCount;
                    document.querySelector("#basket>div>h1>span").innerHTML=demoCount+" item";
                    $("#basket>div>button:first-of-type >span").html(`($ ${totalPriceDemo}.00)`);
                    if (pruducts[i].Count==1) {
                        minusIcon.css({
                            "background-color": "rgba(128, 128, 128, 0.275)",
                            color:"gray",
                            border:"0"
                        })
                    }
                    else{
                        minusIcon.css({
                            "background-color": "white",
                            color:"red",
                            border:"1px solid rgba(255, 0, 0, 0.428)"
                        })
                    }
                    SetLocalStorage(pruducts,"Basket");
                }
            
            })
            removeIcon.click(function(){
                pruducts[i].Count=0;
                let demoCount=0;
                let totalPriceDemo=0
                for (let i = 0; i < pruducts.length; i++) {
                   demoCount+=pruducts[i].Count;
                   totalPriceDemo+=pruducts[i].Count*pruducts[i].Price;
                }
                document.querySelector("nav>div>div:last-child >span").innerHTML=demoCount;
                document.querySelector("#basket>div>h1>span").innerHTML=demoCount+" item";
                $("#basket>div>button:first-of-type >span").html(`($ ${totalPriceDemo}.00)`);
                plusIcon.parent().parent().remove();
                SetLocalStorage(pruducts,"Basket");
            })
            
            content.append(div);
            

        }
    }
    $("#basket>div>button:first-of-type").next().click(function(){
        window.location.replace("../../assets/cart.html");
    })
    $("#basket>div>button:first-of-type").click(function(){
        window.location.replace("../../assets/details.html");
    })
    $("#headling .catagory  table td").click(function(){
        window.location.replace("../../assets/product.html");
    })
    $("#headling .catagory>.catagories>ul>li  li").click(function(){
        window.location.replace("../../assets/product.html");
    })
    
})