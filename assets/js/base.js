export function CheckLocalStorage(dbName){
    if(localStorage.getItem(dbName)==null){
        localStorage.setItem(dbName,JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem(dbName));
}
export function SetLocalStorage(data,dbName){
    localStorage.setItem(dbName,JSON.stringify(data));
}
export function CheckPassword(password){
    if(password.length<8||password.length>16){
        return null;
    }
    return password;
}
export function CheckEmail(email,signUp){
    let db=CheckLocalStorage(signUp);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    for (let i = 0; i < db.length; i++) {
        if (db[i].Email==email) {
            return null;
        }
    }
    if(email.match(mailformat)!=null){
        return email;
    }
    return null;
}
export function CheckPhone(phone,signUp){
    let db=CheckLocalStorage(signUp);
    let phoneFormat=/^(50|51|55|70|77|99)+\d{7}$/;
    for (let i = 0; i < db.length; i++) {
        if (db[i].Phone==phone) {
            return null;
        }
    }
    if (phone.match(phoneFormat)==null) {
        return null;
    }
    return phone;
}