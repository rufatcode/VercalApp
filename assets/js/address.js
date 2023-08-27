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
        if ($("#main>div>div:last-child>div:first-child h1>span").html()=="Add New Address") {
            $("#main>div>div:last-child>div:first-child h1>span").html("My Addresses");
            $(this).html("Add New Address");
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"none"
            })
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"block"
            })
        }
        else{
            $(this).html("Back to Address");
            $("#main>div>div:last-child>div:first-child h1>span").html("Add New Address");
            $("#main>div>div:last-child>div:nth-of-type(3)").css({
                display:"block"
            })
            $("#main>div>div:last-child>div:nth-of-type(2)").css({
                display:"none"
            })
        }
       
    })
    axios.get('https://countriesnow.space/api/v0.1/countries/').then(datas=>{
        datas.data.data.forEach(element => {
            let option=$("<option>");
            option.attr("value",element.country);
            $("#CountryList").append(option);
        });
    })
    $("#Country").on("change",function(){
        $("#CityList").html("");
        axios.get(`https://countriesnow.space/api/v0.1/countries/`).then(datas=>{
            datas.data.data.forEach(item=>{
                
                if (item.country==$(this).val()) {
                    item.cities.forEach(j=>{
                        let option=$("<option>");
                        option.attr("value",j);
                        $("#CityList").append(option);
                    })
                    
                }
            })
        })
    })
    let phoneFormat=/^\+994(50|51|55|70|77|99)+\d{7}$/;
    let AddressnName=$("#FullName");
    let AddressStreet=$("#Street");
    let AddressCountry=$("#Country");
    let AddressPhone=$("#Phone");
    let AddressCity=$("#City");
    $("#main>div>div:last-child>div:last-child>button").click(function(){
        if (dbSignIn[dbSignIn.length-1]!=null) {
            if (AddressnName.val().trim().length>0&&AddressStreet.val().trim().length>0&&AddressCountry.val().trim().length>0&&AddressPhone.val().match(phoneFormat)!=null&&AddressCity.val().trim().length>0) {
                axios.post("http://localhost:3000/address",{
                    Name:AddressnName.val(),
                    Location:`${AddressStreet.val()},${AddressCity.val()},${AddressCountry.val()}`,
                    Phone:AddressPhone.val(),
                    Email:dbSignIn[dbSignIn.length-1].Email
                })
           }
           else{
                AddressnName.val("");
                AddressStreet.val("");
                AddressCountry.val("");
                AddressPhone.val("");
                AddressCity.val("");
                sweetAlert("Check Address...", "all informations is required!", "error");
            }
        }
       
       
    })
    axios.get("http://localhost:3000/address").then(data=>{
        data.data.forEach(item=>{
            if (dbSignIn[dbSignIn.length-1]!=null) {
                if (dbSignIn[dbSignIn.length-1].Email==item.Email) {
                    let div=$("<div>");
                    div.html(`
                            <span>${item.Name}</span>
                            <span>${item.Location}</span>
                            <span>${item.Phone}</span>
                            <span>
                                <i ${item.id} class="fa-solid fa-pencil"></i>
                                <i data-Id=${item.id} class="fa-solid fa-trash-can"></i>
                            </span>
                        `)
                    $("#main>div>div:last-child>div:nth-of-type(2)").prepend(div);
                    div.children().last().children().last().click(function(){
                        div.remove();
                        axios.delete(`http://localhost:3000/address/${div.children().last().children().last().attr("data-Id")}`);
                    })
                    div.children().last().children().first().click(function(){
                        $("#main>div>div:last-child>div:nth-of-type(3)").css({
                            display:"block"
                        })
                        $("#main>div>div:last-child>div:nth-of-type(2)").css({
                            display:"none"
                        })
                        $("#main>div>div:last-child>div:first-child>p>span").html("Back to Address");
                        $("#main>div>div:last-child>div:first-child h1>span").html("Edit Address");
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
        $("#main>div>div:last-child>div:nth-of-type(3)").css({
            display:"block"
        })
        $("#main>div>div:last-child>div:nth-of-type(2)").css({
            display:"none"
        })
        AddressnName.val($(this).parent().parent().children().first().html());
        AddressStreet.val($(this).parent().parent().children().first().next().html().split(",")[0]);
        AddressCountry.val($(this).parent().parent().children().first().next().html().split(",")[1]);
        AddressCity.val($(this).parent().parent().children().first().next().html().split(",")[2]);
        AddressPhone.val($(this).parent().parent().children().first().next().next().html());
        $("#main>div>div:last-child>div:first-child>p>span").html("Back to Address");
        $("#main>div>div:last-child>div:first-child h1>span").html("Edit Address");
        $("#main>div>div:last-child>div:first-child>p>span").on("click",function(){
            window.location.reload();
        })
    })
})