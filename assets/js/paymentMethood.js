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
        window.location.replace('../../assets/profile.html');
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
    $("#main>div>div:last-child>div:first-child>i").click(function(){
        if ($(" #main>div>div:first-child").css("display")=="none") {
            $(" #main>div>div:first-child").css({
                display: "block",
            })
        }
        else{
            $(" #main>div>div:first-child").css({
                display: "none",
            })
        }
    })
    $("#main>div>div:last-child>div:first-child>p>span").on("click",function(){
        if ($("#main>div>div:last-child>div:first-child h1>span").html()=="Add New Payment Method") {
            $("#main>div>div:last-child>div:first-child h1>span").html("Payment Methods");
            $(this).html("Add New Payment Method");
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"none"
            })
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"block"
            })
        }
        else{
            $(this).html("Back to Payment Methods");
            $("#main>div>div:last-child>div:first-child h1>span").html("Add New Payment Method");
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"block"
            })
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"none"
            })
        }
       
    })
    let CardNumbers=$("#CardNumbers");
    let CardName=$("#CardName");
    let ExpDate=$("#ExpDate");
    let Cvc=$("#CVC");

    let CardNumbersEdit=$("#CardNumbersEdit");
    let CardNameEdit=$("#CardNameEdit");
    let ExpDateEdit=$("#ExpDateEdit");
    let CvcEdit=$("#CvcEdit");
    $("#main>div>div:last-child>div:nth-of-type(3)>button").click(function(){
        if (dbSignIn[dbSignIn.length-1]!=null) {
            if (CardNumbers.val().trim().length==16&&CardName.val().trim().length>0&&ExpDate.val().trim().length>0&&Cvc.val().trim().length==3) {
                let demoCartNumbers="";
                for (let index = 0; index < CardNumbers.val().trim().length; index++) {
                    demoCartNumbers+=CardNumbers.val().trim()[index];
                    if ((index+1)%4==0&&index!=19) {
                        demoCartNumbers+=" ";
                    }
                }
                let imgArr=["./img/paymentMethod1.svg","./img/paymentMethod2.svg","./img/paymentMethod3.svg","./img/paymentMethod4.svg"];
                axios.post(" http://localhost:3000/PaymentMethods",{
                    CardNumbers:demoCartNumbers,
                    CardName:CardName.val(),
                    ExpDate:ExpDate.val(),
                    Email:dbSignIn[dbSignIn.length-1].Email,
                    Cvc:Cvc.val(),
                    Img:imgArr[Math.floor(Math.random()*5)]
                })
           }
           else{
                CardNumbers.val("");
                CardName.val("");
                ExpDate.val("");
                Cvc.val("");
                sweetAlert("Check Address...", "all informations is required!", "error");
            }
        }
        else{
            sweetAlert("Check Profile...", "Create Personal Account!", "error");
        }
       
       
    })
    axios.get("http://localhost:3000/PaymentMethods").then(data=>{
        
         data.data.forEach(item=>{
            if (dbSignIn[dbSignIn.length-1]!=null) {
                if (dbSignIn[dbSignIn.length-1].Email==item.Email) {
                    let div=$("<div>");
                    div.html(`
                            <span>
                                <img src="${item.Img}" alt="">
                                <span>${item.CardName}</span>
                            </span>
                            <span>${item.CardNumbers.slice(0,5)} **** **** ****</span>
                            <span>${item.ExpDate.split("-")[1]}/${item.ExpDate.split("-")[0]}</span>
                            <span>
                                <i data-Id=${item.id} class="fa-solid fa-pencil"></i>
                                <i data-Id=${item.id} class="fa-solid fa-trash-can"></i>
                            </span>
                        `)
                    $("#main>div>div:last-child>div:nth-of-type(2)").prepend(div);
                    $("#main>div>div:first-child>a:nth-of-type(6)>span").html(div.parent().children().length-1)
                    div.children().last().children().last().click(function(){
                        div.remove();
                        axios.delete(`http://localhost:3000/PaymentMethods/${div.children().last().children().last().attr("data-Id")}`);
                    })
                    div.children().last().children().first().click(function(){
                        $("#main>div>div:last-child>div:nth-of-type(4)").css({
                            display:"block"
                        })
                        $("#main>div>div:last-child>div:nth-of-type(2)").css({
                            display:"none"
                        })
                        let dataId=$(this).attr("data-id");
                        axios.get(`http://localhost:3000/PaymentMethods/${dataId}`).then(item=>{
                            console.log(item.data);
                            CardNameEdit.val(item.data.CardName);
                            let orginalCardNumbers="";
                            for (let i = 0; i < item.data.CardNumbers.length; i++) {
                                if ((i+1)%5!=0) {
                                    orginalCardNumbers+= item.data.CardNumbers[i];
                                }
                                
                            }
                            CardNumbersEdit.val(orginalCardNumbers);
                            ExpDateEdit.val(item.data.ExpDate);
                            CvcEdit.val(item.data.Cvc)
                        })
                        
                        $("#main>div>div:last-child>div:first-child>p>span").html("Back to Address");
                        $("#main>div>div:last-child>div:first-child h1>span").html("Edit Address");
                        $("#main>div>div:last-child>div:nth-of-type(4)>button").click(function(){
                            let demoCartNumbers="";
                                for (let index = 0; index < CardNumbersEdit.val().trim().length; index++) {
                                    demoCartNumbers+=CardNumbersEdit.val().trim()[index];
                                    if ((index+1)%4==0&&index!=19) {
                                        demoCartNumbers+=" ";
                                    }
                                }
                            if (CardNameEdit.val().trim().length>0&&CardNumbersEdit.val().trim().length==16&&ExpDateEdit.val().trim().length>0&&CvcEdit.val().length==3) {
                                
                                axios.put(`http://localhost:3000/PaymentMethods/${div.children().last().children().first().attr("data-Id")}`,{
                                    CardNumbers:demoCartNumbers,
                                    CardName:CardNameEdit.val(),
                                    ExpDate:ExpDateEdit.val(),
                                    Cvc:CvcEdit.val(),
                                    Email:dbSignIn[dbSignIn.length-1].Email,
                                    Img:div.children().first().children().first().attr("src")
                                })
                            }
                            else{
                                CardNumbersEdit.val("");
                                CardNameEdit.val("");
                                ExpDateEdit.val("");
                                CvcEdit.val("");
                                sweetAlert("Check Address...", "all informations is required!", "error");
                            }
                        })
                        $("#main>div>div:last-child>div:first-child>p>span").on("click",function(){
                            window.location.reload();
                        })
                        
                    })
                }
            }
           
            
        })
    })
    $("#main>div>div:last-child>div:nth-of-type(2)>div>span>i:last-of-type").click(function(){
        $(this).parent().parent().remove();
    })
    $("#main>div>div:last-child>div:nth-of-type(2)>div>span>i:first-of-type").click(function(){
        $("#main>div>div:last-child>div:nth-of-type(4)").css({
            display:"block"
        })
        $("#main>div>div:last-child>div:nth-of-type(2)").css({
            display:"none"
        })
        CardNameEdit.val($(this).parent().parent().children().first().children().first().next().html());
        CardNumbersEdit.val($(this).parent().parent().children().first().next().html());
        ExpDateEdit.val("2022-08-01");
        CvcEdit.val(198);
        $("#main>div>div:last-child>div:first-child>p>span").html("Back to Address");
        $("#main>div>div:last-child>div:first-child h1>span").html("Edit Address");
        
        $("#main>div>div:last-child>div:first-child>p>span").on("click",function(){
            window.location.reload();
        })
    })
    
})