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
    
    $("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").on("keyup",function(){
        if ($("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").val().trim()!="") {
            $("#main>div:nth-of-type(2)>div:nth-of-type(4)>button").css({
                "background-color":"rgba(255, 166, 0, 0.907)",
                color: "white"
            })
        }
        else{
            $("#main>div:nth-of-type(2)>div:nth-of-type(4)>button").css({
                "background-color":"rgb(218, 225, 231)",
                 color: "rgb(125, 135, 156)"
            })
        }
    })
    let starIcons=$("#main>div:nth-of-type(2)>div:nth-of-type(4)>span:first-of-type>i");
    for (let i = 0; i < starIcons.length; i++) {
        
    }
    starIcons.click(function(){
        let active=$(this);
        
        for (let i = 0; i <= $(this).index(); i++) {
            active.removeClass("fa-regular");
            active.addClass("fa-solid");
            active=active.prev();
        }
        let next=$(this).next();
        for (let i = $(this).index()+1; i <= 5; i++) {
            next.addClass("fa-regular");
            next.removeClass("fa-solid");
            next=next.next();
        }
    })

    $("#main>div:nth-of-type(2)>div:nth-of-type(4)>button").click(function(){
        if ($("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").val().trim()!="") {
            let element=$("#main>div:nth-of-type(2)>div:nth-of-type(3)");
            let div=$("<div>");
            if (dbSignIn.length==0) {
                sweetAlert("Oops...", "LogIn please!", "error");
                return;
            }
            let imgSrc='../../assets/img/profileImg.jpeg';
            let user=dbSignUp.find(item=>item.Email==dbSignIn[dbSignIn.length-1].Email);
            if (user.Img!=undefined) {
                imgSrc=user.Img;
            }
            div.html(`
                <div>
                    <img src="${imgSrc}" alt="">
                    <h1>
                    <p>${user.Name}</p>
                    <span>
                    </span>
                    <span>1 minuts ago</span>
                    </h1>
                </div>
                <p>${$("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").val()}</p>
            `)
            element.append(div);
            let classList=[];
            for (let i = 0; i < 5; i++) {
                let temp=starIcons[i];
                classList.push(temp.className);
                let starIconsComment=$("<i>");
                starIconsComment.css({
                    color:"#f2cf09"
                })
                starIconsComment.addClass(temp.className);
                div.children().first().children().next().children().first().next().append(starIconsComment);
            }
            for (let i = 0; i < pruducts.length; i++) {
                if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
                    if (pruducts[i].Comment==undefined) {
                        pruducts[i].Comment=[];
                    }
                    pruducts[i].Comment.push({
                            ProfileImg:imgSrc,
                            StarIcon:classList,
                            UserName:user.Name,
                            Content:$("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").val(),
                            CommentDate:Date.now()/1000/60
                        })
                    $("#main>div:nth-of-type(2)>.head>span:last-of-type>span").html(`(${pruducts[i].Comment.length+3})`)
                    SetLocalStorage(pruducts,"Basket"); 
                }
            }
            
            $("#main>div:nth-of-type(2)>div:nth-of-type(4)>textarea").val("");
            $("#main>div:nth-of-type(2)>div:nth-of-type(4)>button").css({
                "background-color":"rgb(218, 225, 231)",
                 color: "rgb(125, 135, 156)"
            })
            for (let i = 0; i < 5; i++) {
                starIcons[i].className="fa-star fa-regular";
            }
        }
    })
    if (singleProducts!=null&&dbSignIn.length!=0) {
        let element=$("#main>div:nth-of-type(2)>div:nth-of-type(3)");
            
        let imgSrc='../../assets/img/profileImg.jpeg';
        let user=dbSignUp.find(item=>item.Email==dbSignIn[dbSignIn.length-1].Email);
        if (user.Img!=undefined) {
            imgSrc=user.Img;
        }
        for (let i = 0; i < pruducts.length; i++) {
            if (pruducts[i].ImgSrc.split("/")[pruducts[i].ImgSrc.split("/").length-1]==singleProducts[0].ImgSrc.split("/")[singleProducts[0].ImgSrc.split("/").length-1]) {
                if (pruducts[i].Comment!=undefined) {
                    $("#main>div:nth-of-type(2)>.head>span:last-of-type>span").html(`(${pruducts[i].Comment.length+3})`)
                for (let k = 0; k < pruducts[i].Comment.length; k++) {
                    let div=$("<div>");
                    imgSrc=pruducts[i].Comment[k].ProfileImg;
                    div.html(`
                        <div>
                            <img src="${imgSrc}" alt="">
                            <h1>
                                <p>${pruducts[i].Comment[k].UserName}</p>
                                <span>
                                </span>
                                <span>1 minuts ago</span>
                            </h1>
                        </div>
                        <p>${pruducts[i].Comment[k].Content}</p>
                    `)
                    element.append(div);
                    if (Date.now()/1000/60-pruducts[i].Comment[k].CommentDate<60) {
                        div.children().first().children().next().children().first().next().next().html(`${parseInt(Date.now()/1000/60-pruducts[i].Comment[k].CommentDate)} minuts ago`);
                    }
                    else if (Date.now()/1000/60-pruducts[i].Comment[k].CommentDate>60 && Date.now()/1000/60-pruducts[i].Comment[k].CommentDate<1400) {
                        div.children().first().children().next().children().first().next().next().html(`${parseInt(Date.now()/1000/60/60-pruducts[i].Comment[k].CommentDate/60)} hours ago`);
                    }
                    else if (Date.now()/1000/60-pruducts[i].Comment[k].CommentDate>1400 && Date.now()/1000/60-pruducts[i].Comment[k].CommentDate<43200) {
                        div.children().first().children().next().children().first().next().next().html(`${parseInt(Date.now()/1000/60/60/24-pruducts[i].Comment[k].CommentDate/60/24)} day ago`);
                    }
                    else if (Date.now()/1000/60-pruducts[i].Comment[k].CommentDate>43200 && Date.now()/1000/60-pruducts[i].Comment[k].CommentDate<518400) {
                        div.children().first().children().next().children().first().next().next().html(`${parseInt(Date.now()/1000/60/60/24/30-pruducts[i].Comment[k].CommentDate/60/24/30)} month ago`);
                    }
                    else if (Date.now()/1000/60-pruducts[i].Comment[k].CommentDate>518400) {
                        div.children().first().children().next().children().first().next().next().html(`${parseInt(Date.now()/1000/60/60/24/30/12-pruducts[i].Comment[k].CommentDate/60/24/30/12)} years ago`);
                    }
                    
                    for (let j = 0; j < 5; j++) {
                        let starIconsComment=$("<i>");
                        starIconsComment.css({
                            color:"#f2cf09"
                        })
                        starIconsComment.addClass(pruducts[i].Comment[k].StarIcon[j]);
                        div.children().first().children().next().children().first().next().append(starIconsComment);
                    }
                }
                }
                
            }
        }
        
    }
    let arrPlus=document.querySelectorAll("p>span:last-of-type>.fa-plus");
    document.querySelector("nav>div>div:last-child >span").innerHTML=0;
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
        arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+60].Count
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
            pruducts[i+60].Count+=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+60].Count;
            SetLocalStorage(pruducts,"Basket");
            window.location.reload();
        })
        arrPlus[i].parentElement.firstElementChild.addEventListener("click",function(){
            pruducts[i+60].Count-=1;
            arrPlus[i].parentElement.firstElementChild.nextElementSibling.innerHTML=pruducts[i+60].Count;
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
    
})