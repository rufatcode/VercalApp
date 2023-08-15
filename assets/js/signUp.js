import{CheckLocalStorage,SetLocalStorage,CheckPassword,CheckEmail,CheckPhone} from "./base.js"
$("document").ready(function(){
    let dbSignUp=CheckLocalStorage("signUp1");
    let userName=$("body>div>form #name");
    let userEmail=$("body>div>form #email");
    let userPassword=$("body>div>form #password");
    let userRePassword=$("body>div>form #Repassword");
    $("body>div>form>button:first-of-type").click(function(){
        let user={}
        if(userName.val()==""||userName.val().length<5){
            userName.next().css({
                display:"block"
            })
            userName.val("");
            return
        }
        else{
            userName.next().css({
                display:"none"
            })
        }
        if(CheckEmail(userEmail.val(),"signUp1")==null){
            userEmail.next().css({
                display:"block"
                
            })
            userEmail.val("");
            return
            
        }
        else{
            userEmail.next().css({
                display:"none"
            })
        }
        if(CheckPassword(userPassword.val())==null){
            userPassword.next().css({
                display:"block"
                
            })
            userPassword.val("");
            return
        }
        else{
            userPassword.next().css({
                display:"none"
            })
        }
        if(CheckPassword(userRePassword.val())==null){
            userRePassword.next().css({
                display:"block"
                
            })
            userRePassword.val("");
            return
        }
        else{
            userRePassword.next().css({
                display:"none"
            })
        }
        if(userPassword.val()!=userRePassword.val()){
            userRePassword.next().next().css({
                display:"block"
                
            })
            return;
        }
        else{
            userRePassword.next().next().css({
                display:"none"
                
            })
        }
        console.log(user.Id);
        if(user.Id==undefined){
            user.Id=1;
        }
        else{
            user.Id=dbSignUp[dbSignUp.length-1].Id+1;
        }
        user.Name=userName.val();
        user.Email=userEmail.val();
        user.Password=userPassword.val();
        dbSignUp.push(user);
        SetLocalStorage(dbSignUp,"signUp1");
        window.location.replace("./signIn.js");

    })
    $("body>div>form>div .visible").click(function(){
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
    $("body>div>form>div .unvisible").click(function(){
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
})