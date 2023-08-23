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


    $("#SearchPhone .searchContent .Selection").click(function(){
        
        if ($("#SearchPhone .searchContent .Selection>div").attr("class").includes("d-none")) {
            $("#SearchPhone .searchContent .Selection>div").removeClass("d-none");
            $("#SearchPhone .searchContent .Selection>div").addClass("d-block");

            
        }

        else{
            $("#SearchPhone .searchContent .Selection>div").addClass("d-none");
            $("#SearchPhone .searchContent .Selection>div").removeClass("d-block");
            
        }
       
       
    })
    $("#SearchPhone .searchContent .Selection").mouseenter(function(){
        $("#SearchPhone .searchContent .Selection").css({
            'border-color':'red',
        })
    })
    $("#SearchPhone .searchContent .Selection").mouseleave(function(){
        $("#SearchPhone .searchContent .Selection").css({
            'border-color':'rgba(0, 0, 0, 0.054)',
        })
    })
    $("#SearchPhone .searchContent .Selection>.Catagory>p>span").click(function(){
        $("#SearchPhone .searchContent .Selection>span").html($(this).html());   
    })

    $("#main>div>.first>.bath").click(function(){
        if($("#main>div>.first>ul").attr("class").includes("d-none")){
            $("#main>div>.first>ul").addClass("d-block");
            $("#main>div>.first>ul").removeClass("d-none");
           
            $("#main>div>.first>.bath>i").removeClass("fa-chevron-right");
            $("#main>div>.first>.bath>i").addClass("fa-chevron-down");
        }
        else{
            $("#main>div>.first>ul").removeClass("d-block");
            $("#main>div>.first>ul").addClass("d-none");
            $("#main>div>.first>.bath>i").removeClass("fa-chevron-down");
            $("#main>div>.first>.bath>i").addClass("fa-chevron-right");
        }
    })
    $("#main>div:last-child >div span").eq(1).css({
        color:"red",
        border: "0.5px solid black",
        "border-color":"red",
    })
    $("#main>div:last-child >div span").slice(1,8).click(function(){
        $("#main>div:last-child >div span").slice(1,8).css({
            color:"black",
            border:"0",
        })
        $(this).css({
            color:"red",
            border: "0.5px solid black",
            "border-color":"red",

        })
        if ($(this).html()=="1") {
            $("#main>div:last-child >div span").eq(0).css({
                opacity:"0.4"
            })
        }
        else{
            $("#main>div:last-child >div span").eq(0).css({
                opacity:"1"
            })
        }
        if ($(this).html()=="9") {
            $("#main>div:last-child >div span").eq(8).css({
                opacity:"0.4"
            })
        }
        else{
            $("#main>div:last-child >div span").eq(8).css({
                opacity:"1"
            })
        }
        
    })
    $("#main>div:last-child >div span").eq(0).click(function(){
        let arr=$("#main>div:last-child >div span").slice(1,8);
        arr.each(index => {
            if(arr[index].style.color=="red"&&index>0){
                
                arr[index-1].click();
                
             }
        });
    })
    $("#main>div:last-child >div span").eq(8).click(function(){
        let arr=$("#main>div:last-child >div span").slice(1,8);
        arr.each(index => {
            if(arr[index].style.color=="red"&&index<6){
                arr[index+1].click();
                return false;
            }
        });
        
    })
    if (window.screen.width<"900") {
        $(" nav>div>.searchContent input").addClass("rounded-end-pill");
    }
    else{
        $(" nav>div>.searchContent input").removeClass("rounded-end-pill");
    }
    $("#SearchPhone .searchContent>i").click(function(){
        $("#main .barShow").removeClass("d-none");
        $("#main>div>div:last-child").removeClass("d-flex");
        $("#main>div>div:last-child").addClass("d-none");
        $(this).css({
            color:"red"
        })
        $(this).prev().css({
            fill:"black"
        })
    })
    $("#SearchPhone .searchContent>i").prev().click(function(){
        $("#main .barShow").addClass("d-none");
        $("#main>div>div:last-child").addClass("d-flex");
        $("#main>div>div:last-child").removeClass("d-none");
        $(this).css({
            fill:"red"
        })
        $(this).next().css({
            color:"black"
        })
    })

    let dbSignIn=CheckSesionStorage("signIn1");
    let dbSignUp=CheckLocalStorage("signUp1")
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
    let arrPlus=document.querySelectorAll("#main>div:first-child >div:last-child p>span:last-of-type>.fa-plus");
    let arrMinusBar=document.querySelectorAll("#main>div:first-child >.barShow p>span:last-of-type>.fa-minus");
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
        let find=false;
        for (let j = 0; j < pruducts.length; j++) {
            if (pruducts[j].ImgSrc==arrPlus[i].parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.src) {
                find=true;
            }
        }
        if (find==false) {
            pruducts.push({
                Name:arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.innerHTML,
                Count:parseInt(arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML),
                Sale:parseInt(arrPlus[i].parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML.split("%")[0]),
                Price:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
                ImgSrc:arrPlus[i].parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.src,
                OldPrice:parseInt(arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.slice(1,arrPlus[i].parentElement.parentElement.firstElementChild.innerHTML.length)),
            })
        }
       arrPlus[i].parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.addEventListener("click",function(){
            if (singleProducts.length>0) {
                singleProducts.pop();
            }
           singleProducts.push({
                    ImgSrc:this.getAttribute("src"),
                    Brand:"Glasses",
                    Name:this.nextElementSibling.firstElementChild.innerHTML,
                    Price:this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                    Count:this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
                })
                SetSesionStorage(singleProducts,"SingleProduct");  
                window.location.replace("../../assets/singleProduct.html");
       })
        arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
        arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
        if (arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
            arrPlus[i].parentElement.firstElementChild.style.display="none";
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
            
            arrPlus[i].parentElement.style.top="0px";
        }
        
        arrPlus[i].addEventListener("click",function(){
            arrPlus[i].parentElement.firstElementChild.style.display="block";
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="block"
            arrPlus[i].parentElement.style.top="-48px";
            pruducts[i+45].Count+=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
        })
        arrPlus[i].parentElement.firstElementChild.addEventListener("click",function(){
            pruducts[i+45].Count-=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
            SetLocalStorage(pruducts,"Basket");
            if (arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
                arrPlus[i].parentElement.firstElementChild.style.display="none";
                arrPlus[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
                
                arrPlus[i].parentElement.style.top="0px";
            }
            window.location.reload();
            
        })
        if (arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
            arrMinusBar[i].style.display="none";
            arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
            
            arrMinusBar[i].parentElement.style.top="0px";
        }
        arrMinusBar[i].parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.addEventListener("click",function(){
            
            if (singleProducts.length>0) {
                singleProducts.pop();
            }
           singleProducts.push({
                    ImgSrc:this.getAttribute("src"),
                    Brand:"Glasses",
                    Name:this.nextElementSibling.firstElementChild.nextElementSibling.innerHTML,
                    Price:this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML,
                    Count:this.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML
                })
                SetSesionStorage(singleProducts,"SingleProduct"); 
                window.location.replace("../../assets/singleProduct.html");
       })
        arrMinusBar[i].addEventListener("click",function(){
            arrMinusBar[i].style.display="block";
            arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.style.display="block"
            arrMinusBar[i].parentElement.style.top="-48px";
            pruducts[i+45].Count-=1;
            arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
        })
        arrMinusBar[i].parentElement.firstElementChild.addEventListener("click",function(){
            pruducts[i+45].Count+=1;
            arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+45].Count;
            SetLocalStorage(pruducts,"Basket");
            if (arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.innerHTML==0) {
                arrMinusBar[i].style.display="none";
                arrMinusBar[i].parentElement.firstElementChild.nextElementSibling.style.display="none"
                
                arrMinusBar[i].parentElement.style.top="0px";
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