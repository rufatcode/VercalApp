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
        $("#basket").css({
            display:"none",
        })
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
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
            })
            minusIcon.click(function(){
            if (pruducts[i].Count>1) {
                pruducts[i].Count=parseInt(pruducts[i].Count)-1;
                SetLocalStorage(pruducts,"Basket");
                window.location.reload();
            }
            
            })
            removeIcon.click(function(){
            pruducts[i].Count=0;
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
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
    $("#main>div>div:last-child >h1>span").html(`$ ${totalValue}.00`);
    $("#headling .catagory  table td").click(function(){
        window.location.replace("../../assets/product.html");
    })
    $("#headling .catagory>.catagories>ul>li  li").click(function(){
        window.location.replace("../../assets/product.html");
    })
    let countrySelect=document.querySelector("#main>div>div:last-child >div:first-of-type >datalist");
    let citySelect=document.querySelector("#main>div>div:last-child >div:last-of-type >datalist");
    $.ajax({
        method: "get",
        url: "https://countriesnow.space/api/v0.1/countries/",
        success: function (data) {
           
            data.data.forEach(item => {
                let option=document.createElement("option");
                option.innerHTML=item.country;
                option.setAttribute("value",item.country);
                countrySelect.appendChild(option);
            });
        },
        error:function(error){
            console.log(error);
        }
    });
    let countryInput=document.querySelector("#main>div>div:last-child >div:first-of-type >input");
    countryInput.addEventListener("change",function(){
        citySelect.innerHTML="";
        $.ajax({
            method: "get",
            url: "https://countriesnow.space/api/v0.1/countries/",
            success: function (data) {
                let city=data.data.filter(item=>item.country==countryInput.value);
                city[0].cities.forEach(item=>{
                    let option=document.createElement("option");
                    option.innerHTML=item;
                    option.setAttribute("value",item);
                    citySelect.append(option);
                })
            },
            error:function(error){
                console.log(error);
            }
        });
    })
    let cartContent=document.querySelector("#main>div>div:first-child >.content");
    for (let i = 0; i < pruducts.length; i++) {
        if (pruducts[i].Count>0) {
            let div=document.createElement("div");
            let img=document.createElement("img");
            img.src=pruducts[i].ImgSrc;
            let infoDiv=document.createElement("div");
            let h1=document.createElement("h1");
            h1.innerHTML=pruducts[i].Name;
            let price=document.createElement("p");
            let priceSpan=document.createElement("span");
            priceSpan.innerHTML=`$ ${pruducts[i].Price}.00 x `;
            let countSpan=document.createElement("span");
            countSpan.innerHTML=pruducts[i].Count;
            priceSpan.append(countSpan);
            let priceSpanDemo=document.createElement("span");
            priceSpanDemo.innerHTML=`$ ${pruducts[i].Price*pruducts[i].Count}.00`;
            price.append(priceSpan,priceSpanDemo);
            infoDiv.append(h1,price);
            let removeIcon=document.createElement("i");
            removeIcon.classList.add("fa-solid","fa-xmark");
            removeIcon.addEventListener("click",function(){
                pruducts[i].Count=0;
                SetLocalStorage(pruducts,"Basket");
                window.location.reload();
            })
            let AddRemoveSpan=document.createElement("span");
            let minusIcon=document.createElement("i");
            minusIcon.classList.add("fa-solid","fa-minus");
            let countProduct=document.createElement("span");
            countProduct.innerHTML=pruducts[i].Count;
            let plusIcon=document.createElement("i");
            plusIcon.classList.add("fa-solid","fa-plus");
            if (pruducts[i].Count==1) {
                minusIcon.style.background="rgb(218, 225, 231)";
                minusIcon.style.color="rgb(125, 135, 156)";
                minusIcon.style.border="1px solid rgb(218, 225, 231)";
            }
            plusIcon.addEventListener("click",function(){
                pruducts[i].Count+=1;
                SetLocalStorage(pruducts,"Basket");
                window.location.reload();
            })
            minusIcon.addEventListener("click",function(){
                if (pruducts[i].Count>1) {
                    pruducts[i].Count-=1;
                    SetLocalStorage(pruducts,"Basket");
                    window.location.reload();
                }
               
            })
            AddRemoveSpan.append(minusIcon,countProduct,plusIcon);
            div.append(img,infoDiv,removeIcon,AddRemoveSpan);
            cartContent.append(div);
        }
        
    }
    $("#main>div>div:first-child >.head >button:first-of-type").next().next().click(function(){
        window.location.replace("../../assets/details.html");
    })
    $("#main>div>div:last-child >button:last-of-type").click(function(){
       if ($("#main>div>div:last-child >div:first-of-type >input").val()=="") {
        $("#main>div>div:last-child >div:first-of-type >input").next().css({
            display:"block"
        })
       }
       else{
            if ($("#main>div>div:last-child >div:last-of-type >input").val()=="") {
                $("#main>div>div:last-child >div:last-of-type >input").next().css({
                    display:"block"
                })
                $("#main>div>div:last-child >div:first-of-type >input").next().css({
                    display:"none"
                })
            }
            else{
                if ($("#main>div>div:last-child #zipCode").val()=="") {
                    $("#main>div>div:last-child >p").css({
                        display:"block"
                    })
                    $("#main>div>div:last-child >div:last-of-type >input").next().css({
                        display:"none"
                    })
                    $("#main>div>div:last-child >div:first-of-type >input").next().css({
                        display:"none"
                    })
                }
                else{
                    window.location.replace("../../assets/details.html");
                }
               
            }
           
       }
        
    })
})