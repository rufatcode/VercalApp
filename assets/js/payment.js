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
   
    
    $("#main>div>div:first-child >.head >button:first-of-type").click(function(){
        window.location.replace("../../assets/cart.html");
    })
    $("#main>div>div:first-child >.head >button:first-of-type").next().next().click(function(){
        window.location.replace("../../assets/details.html");
    })
    $("#main>div>div:first-child >.head >button:first-of-type").next().next().next().next().click(function(){
        window.location.replace("../../assets/payment.html");
    })
  
    let tax=totalValue*2/100;
    if (totalValue>1000&&totalValue<2000) {
        tax/=2;
    }
    else if (totalValue>2000) {
        tax=0;
    }
    $("#main>div>div:last-child >p:nth-of-type(1)>span").html(`$ ${totalValue}.00`);
    $("#main>div>div:last-child >p:nth-of-type(3)>span").html(`$ ${tax}`);
    if (totalValue>=2000) {
        $("#main>div>div:last-child >p:nth-of-type(5)>span").html(`$ ${tax+totalValue}.00`)
    }
    else{
        $("#main>div>div:last-child >p:nth-of-type(5)>span").html(`$ ${tax+totalValue}`)
    }
    $("#main>div>div:first-child>button:first-of-type").click(function(){
        window.location.replace("../../assets/details.html");
    })
    
    let cardNumberInput=$("#cartNumber");
    let cardNameInput=$("#cartName");
    let expDateInput=$("#expDate");
    let userCvv=$("#userCvv");
    let userEmail=$("#userEmail");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let payCartSubmit=$("#main>div>div:first-child >.content>button:first-of-type");
    let paypalSubmit=$("#main>div>div:first-child >.content>button:nth-of-type(2)");
    let creditCard=$("#main>div>div:first-child >.content>input:nth-of-type(1)");
    let paypal=$("#main>div>div:first-child >.content>input:nth-of-type(2)");
    let delivery=$("#main>div>div:first-child >.content>input:nth-of-type(4)");
    paypalSubmit.click(function(){
        if(paypal.is(":checked")){
            if (userEmail.val().match(mailformat)==null) {
                userEmail.next().next().css({
                    display:"block"
                })
            }
            else{
                userEmail.next().next().css({
                    display:"none"
                })
                swal({
                    text: `$ ${tax+totalValue} paid successfully`,
                    title:"Patment Info",
                    icon:"success"
                  });
            }
        }
    })
    payCartSubmit.click(function(){
        if (creditCard.is(":checked")) {
            cardNumberInput.val(cardNumberInput.val().split(" ").join(""));
            if (cardNumberInput.val().length!=16||isNaN(cardNumberInput.val())) {
                cardNumberInput.next().css({
                    display:"block"
                })
            }
            else{
                cardNumberInput.next().css({
                    display:"none"
                })
                let str="";
                for (let i = 0; i < cardNumberInput.val().length; i++) {
                    str+=cardNumberInput.val()[i];
                    if (i==3||i==7||i==11) {
                        str+=" ";
                    }
                }
                cardNumberInput.attr("type","text");
                cardNumberInput.val(str);
                if (cardNameInput.val()=="") {
                    cardNameInput.next().css({
                        display:"block"
                    })
                    
                }
                else{
                    cardNameInput.next().css({
                        display:"none"
                    })
                    if (expDateInput.val()=="") {
                        expDateInput.next().css({
                            display:"block"
                        })
                    }
                    else{
                        expDateInput.next().css({
                            display:"none"
                        })
                        if (userCvv.val().length!=3) {
                            userCvv.next().css({
                                display:"block"
                            })
                        }
                        else{
                            userCvv.next().css({
                                display:"none"
                            })
                            swal({
                                text: `$ ${tax+totalValue} paid successfully`,
                                title:"Patment Info",
                                icon:"success"
                              });
                        }
                    }
                }
            }
        }
        
    })
    $("#main>div>div:first-child>button:last-of-type").click(function(){
        if (creditCard.is(":checked")) {
            cardNumberInput.val(cardNumberInput.val().split(" ").join(""));
            if (cardNumberInput.val().length!=16||isNaN(cardNumberInput.val())) {
                cardNumberInput.next().css({
                    display:"block"
                })
            }
            else{
                cardNumberInput.next().css({
                    display:"none"
                })
                let str="";
                for (let i = 0; i < cardNumberInput.val().length; i++) {
                    str+=cardNumberInput.val()[i];
                    if (i==3||i==7||i==11) {
                        str+=" ";
                    }
                }
                cardNumberInput.attr("type","text");
                cardNumberInput.val(str);
                if (cardNameInput.val()=="") {
                    cardNameInput.next().css({
                        display:"block"
                    })
                    
                }
                else{
                    cardNameInput.next().css({
                        display:"none"
                    })
                    if (expDateInput.val()=="") {
                        expDateInput.next().css({
                            display:"block"
                        })
                    }
                    else{
                        expDateInput.next().css({
                            display:"none"
                        })
                        if (userCvv.val().length!=3) {
                            userCvv.next().css({
                                display:"block"
                            })
                        }
                        else{
                            userCvv.next().css({
                                display:"none"
                            })
                            window.location.replace("../../assets/orders.html");
                        }
                    }
                }
            }
        }
        else if(paypal.is(":checked")){
            if (userEmail.val().match(mailformat)==null) {
                userEmail.next().next().css({
                    display:"block"
                })
            }
            else{
                userEmail.next().next().css({
                    display:"none"
                })
                window.location.replace("../../assets/orders.html");
            }
        }
        else{
            window.location.replace("../../assets/orders.html");
        }
        
    })
    creditCard.click(function(){
        paypal.next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().next().next().css({
            display:"none"
        })
        paypal.prev().css({
            display:"block"
        })
        paypal.prev().prev().css({
            display:"block"
        })
        paypal.prev().prev().prev().css({
            display:"flex"
        })
        

    })
    paypal.click(function(){
        $(this).next().next().next().css({
            display:"block"
        })
        $(this).next().next().next().next().css({
            display:"inline"
        })
        $(this).next().next().next().next().next().css({
            display:"inline"
        })
        $(this).next().next().next().next().next().next().next().css({
            display:"block"
        })
        $(this).prev().css({
            display:"none"
        })
        $(this).prev().prev().css({
            display:"none"
        })
        $(this).prev().prev().prev().css({
            display:"none"
        })

    })
    delivery.click(function(){
        paypal.next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().next().css({
            display:"none"
        })
        paypal.next().next().next().next().next().next().css({
            display:"none"
        })
        paypal.prev().css({
            display:"none"
        })
        paypal.prev().prev().css({
            display:"none"
        })
        paypal.prev().prev().prev().css({
            display:"none"
        })
    })
})