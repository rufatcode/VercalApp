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
        window.location.reload();
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
    
    let singleProducts=CheckSesionStorage("SingleProduct");
    for (let i = 0; i < pruducts.length; i++) {
        if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
            singleProducts[0].Count=pruducts[i].Count;
            SetLocalStorage(pruducts,"Basket");
            SetSesionStorage(singleProducts,"SingleProduct"); 
        }
    }
    $("#main>div:first-of-type>div:last-of-type h1").html(singleProducts[0].Name);
    $("#main>div:first-of-type>div:last-of-type>p:first-of-type>span").html(singleProducts[0].Brand);
    $("#main>div:first-of-type>div:last-of-type>h2").html(singleProducts[0].Price);
    $("#main>div:first-of-type>div:last-of-type>span:last-of-type>span").html(singleProducts[0].Count);
    $("#main>div:first-of-type>div:first-of-type img").attr("src",singleProducts[0].ImgSrc);
    $("#main>div:first-of-type>div:last-of-type>button").click(function(){
        singleProducts[0].Count=1;
        for (let i = 0; i < pruducts.length; i++) {
            if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
                pruducts[i].Count=1;
                SetLocalStorage(pruducts,"Basket");
                SetSesionStorage(singleProducts,"SingleProduct"); 
                window.location.reload();
            }
        }
    })
    if (singleProducts[0].Count>0) {
        $("#main>div:first-of-type>div:last-of-type>h2").html(`$  ${singleProducts[0].Price.split("$")[1]*singleProducts[0].Count}`);
        $("#main>div:first-of-type>div:last-of-type>button").css({
            display:"none"
        })
        $("#main>div:first-of-type>div:last-of-type>span:last-of-type").css({
            display:"block"
        })
        $("#main>div:first-of-type>div:last-of-type>span:last-of-type>i:last-of-type").click(function(){
            singleProducts[0].Count+=1;
            for (let i = 0; i < pruducts.length; i++) {
                if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
                    pruducts[i].Count+=1;
                    SetLocalStorage(pruducts,"Basket");
                    SetSesionStorage(singleProducts,"SingleProduct"); 
                    window.location.reload();
                }
            }
        })
        $("#main>div:first-of-type>div:last-of-type>span:last-of-type>i:first-of-type").click(function(){
            singleProducts[0].Count-=1;
            for (let i = 0; i < pruducts.length; i++) {
                if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
                    pruducts[i].Count-=1;
                    SetLocalStorage(pruducts,"Basket");
                    SetSesionStorage(singleProducts,"SingleProduct"); 
                    window.location.reload();
                }
            }
        })

    }

    $("#main>div:first-of-type>div:last-of-type>span:last-of-type")
    $("#main>div:first-of-type>div:first-of-type>.changeImg>div:first-of-type").click(function(){
        $(this).css({
            border: "1px solid rgba(173, 1, 1, 0.631)"
        })
        $(this).next().css({
            border:"1px solid rgba(128, 128, 128, 0.236)"
        })
        $("#main>div:first-of-type>div:first-of-type>.head>img:last-of-type").css({
            display:"none"
        })
        $("#main>div:first-of-type>div:first-of-type>.head>img:first-of-type").css({
            display:"inline"
        })
    })
    $("#main>div:first-of-type>div:first-of-type>.changeImg>div:last-of-type").click(function(){
        $(this).css({
            border: "1px solid rgba(173, 1, 1, 0.631)"
        })
        $(this).prev().css({
            border:"1px solid rgba(128, 128, 128, 0.236)"
        })
        $("#main>div:first-of-type>div:first-of-type>.head>img:first-of-type").css({
            display:"none"
        })
        $("#main>div:first-of-type>div:first-of-type>.head>img:last-of-type").css({
            display:"inline"
        })
    })
    $("#main>div:nth-of-type(2)>.head>span:last-of-type").click(function(){
        $("#main>div:nth-of-type(2)>div:nth-of-type(2)").css({
            display:"none"
        })
        $("#main>div:nth-of-type(2)>div:nth-of-type(3)").css({
            display:"block",
        })
        $("#main>div:nth-of-type(2)>div:nth-of-type(4)").css({
            display:"block"
        })
        $(this).css({
            "border-bottom": "2px solid rgb(233, 69, 96)",
             color:"rgb(233, 69, 96)"
        })
        $("#main>div:nth-of-type(2)>.head>span:first-of-type").css({
            color: "rgb(125, 135, 156)",
            border:"0"
        })

    })
    $("#main>div:nth-of-type(2)>.head>span:first-of-type").click(function(){
        $("#main>div:nth-of-type(2)>div:nth-of-type(2)").css({
            display:"block"
        })
        $("#main>div:nth-of-type(2)>div:nth-of-type(3)").css({
            display:"none",
        })
        $("#main>div:nth-of-type(2)>div:nth-of-type(4)").css({
            display:"none"
        })
        $(this).css({
           "border-bottom": "2px solid rgb(233, 69, 96)",
            color:"rgb(233, 69, 96)"
        })
        $("#main>div:nth-of-type(2)>.head>span:last-of-type").css({
            color: "rgb(125, 135, 156)",
            border:"0"
        })
    })
})