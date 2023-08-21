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
            let totalPriceDemo=totalValue;
            let demoCount=count;
            plusIcon.click(function(){
                pruducts[i].Count=parseInt(pruducts[i].Count)+1;
                plusIcon.next().html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().find(">:first-child").html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().next().html(`$ ${pruducts[i].Count*pruducts[i].Price}.00`);
                totalPriceDemo+=pruducts[i].Price;
                demoCount++;
                document.querySelector("nav>div>div:last-child >span").innerHTML=demoCount;
                document.querySelector("#basket>div>h1>span").innerHTML=demoCount+" item";
                $("#basket>div>button:first-of-type >span").html(`($ ${totalPriceDemo}.00)`);
                SetLocalStorage(pruducts,"Basket");
            })
            minusIcon.click(function(){
            if (pruducts[i].Count>1) {
                pruducts[i].Count=parseInt(pruducts[i].Count)-1;
                plusIcon.next().html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().find(">:first-child").html(pruducts[i].Count);
                plusIcon.parent().next().next().find(">:first-child").next().next().html(`$ ${pruducts[i].Count*pruducts[i].Price}.00`);
                totalPriceDemo-=pruducts[i].Price;
                demoCount--;
                document.querySelector("nav>div>div:last-child >span").innerHTML=demoCount;
                document.querySelector("#basket>div>h1>span").innerHTML=demoCount+" item";
                $("#basket>div>button:first-of-type >span").html(`($ ${totalPriceDemo}.00)`);
                SetLocalStorage(pruducts,"Basket");
            }
            
            })
            removeIcon.click(function(){
                demoCount-=pruducts[i].Count;
                totalPriceDemo-=pruducts[i].Count*pruducts[i].Price;
                pruducts[i].Count=0;
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
    $("#main>div>div:last-child>div:last-child>div:first-of-type>i").click(function(){
        $("#main>div>div:last-child>div:last-child>input").click();
        if (dbSignIn.length>0) {
            $("#main>div>div:last-child>div:last-child>input").change(function(){
                for (const file of event.target.files) {
                    let fileReader=new FileReader();
                    fileReader.onload=function(e){
                        let newDbSignUp=dbSignUp.find(x=>x.Email==dbSignIn[dbSignIn.length-1].Email);
                        newDbSignUp.Img=e.target.result
                        for (let i = 0; i < dbSignUp.length; i++) {
                            if (dbSignUp[i].Email==newDbSignUp.Email) {
                                dbSignUp[i]=newDbSignUp;
                            }
                        }
                        $("#main>div>div:last-child>div:last-child>button").on("click",function(){
                            SetLocalStorage(dbSignUp,"signUp1");
                            window.location.reload();
                        })
                       
                    }
                    fileReader.readAsDataURL(file);
                    
                }
                
            })
        }
        
        
    })
    let area=document.querySelector("#main>div>div:last-child>div:last-child>div:first-of-type");
    area.ondragover=function(e){
        e.preventDefault();
    }
    area.ondrop=function(e){
        e.preventDefault();
        if (dbSignIn.length>0) {
            for (const file of e.dataTransfer.files) {
                let fileReader=new FileReader();
                fileReader.onload=function(e){
                    let newDbSignUp=dbSignUp.find(x=>x.Email==dbSignIn[dbSignIn.length-1].Email);
                    newDbSignUp.Img=e.target.result
                    for (let i = 0; i < dbSignUp.length; i++) {
                        if (dbSignUp[i].Email==newDbSignUp.Email) {
                            dbSignUp[i]=newDbSignUp;
                        }
                    }
                    $("#main>div>div:last-child>div:last-child>button").on("click",function(){
                        SetLocalStorage(dbSignUp,"signUp1");
                        window.location.reload();
                    })
                }
                fileReader.readAsDataURL(file);
            }
        }
        
        
    }
    $("#main>div>div:last-child>div:last-child>button").on("click",function(){
        if (dbSignIn.length>0) {
            let firstNameInput=$("#firstName");
            let editEmailInput=$("#editEmail");
            let birthDayInput=$("#birthDay");
            let lastNameInput=$("#lastName");
            let PhoneInput=$("#Phone");
            let newDbSignUp=dbSignUp.find(x=>x.Email==dbSignIn[dbSignIn.length-1].Email);
            if (firstNameInput.val().trim()!="") {
                let secondPart=newDbSignUp.Name.split(" ")[1];
                newDbSignUp.Name=firstNameInput.val()+" "+secondPart;
            }
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (editEmailInput.val().match(mailformat)!=null) {
                newDbSignUp.Email1=editEmailInput.val();
            }
            if (birthDayInput.val()!="") {
                newDbSignUp.BirthDay=birthDayInput.val();
            }
            if (lastNameInput.val().trim()!="") {
                let firstPart=newDbSignUp.Name.split(" ")[0];
                newDbSignUp.Name=firstPart+" "+lastNameInput.val();
            }
            let phoneFormat=/^\+994(50|51|55|70|77|99)+\d{7}$/;
            if (PhoneInput.val().match(phoneFormat)!=null) {
                newDbSignUp.Phone=PhoneInput.val();
            }
            for (let i = 0; i < dbSignUp.length; i++) {
                if (dbSignUp[i].Email==newDbSignUp.Email) {
                    dbSignUp[i]=newDbSignUp;
                    SetLocalStorage(dbSignUp,"signUp1");
                   
                }
            }
        }
        window.location.reload();

    })
    if (dbSignIn.length>0) {
        let user=dbSignUp.find(x=>x.Email==dbSignIn[dbSignIn.length-1].Email);
        $("#main>div>div:last-child>div:nth-of-type(2)>div>h1>p:first-of-type").html(user.Name);
        $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:first-of-type>p:last-of-type").html(user.Name.split(" ")[0]);
        $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:nth-of-type(2)>p:last-of-type").html(user.Name.split(" ")[1]);
        if (user.Email1!=undefined) {
            $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:nth-of-type(3)>p:last-of-type").html(user.Email1);
        }
        else{
            $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:nth-of-type(3)>p:last-of-type").html(user.Email);
        }
        if (user.Img!=undefined) {
            $("#main>div>div:last-child>div:nth-of-type(2)>div>img").attr("src",user.Img);
            $("#main>div>div:last-child>div:last-child>div:first-of-type>img").attr("src",user.Img);
        }
        if (user.Phone!=undefined) {
            $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:nth-of-type(4)>p:last-of-type").html(user.Phone);
        }
        if (user.BirthDay!=undefined) {
            $("#main>div>div:last-child>div:nth-of-type(3)>div>h1:nth-of-type(5)>p:last-of-type").html(user.BirthDay);
        }
    }
    
   
    $("#main>div>div:last-child>div:first-child>p>span").click(function(){
        if ($("#main>div>div:last-child>div:first-child h1>span").html()=="My Profile") {
            $("#main>div>div:last-child>div:first-child h1>span").html("Edit Profile");
            $(this).html("My Profile");
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"none"
            })
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"none"
            })
            $("#main>div>div:last-child>div:nth-of-type(4)").css({
                display:"block"
            })
        }
        else{
            $(this).html("Edit Profile");
            $("#main>div>div:last-child>div:first-child h1>span").html("My Profile");
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"flex"
            })
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"block"
            })
            $("#main>div>div:last-child>div:nth-of-type(4)").css({
                display:"none"
            })
        }
       
    })
})