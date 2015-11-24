/**
 * Created by jack on 2015/8/26.
 */

function check($pintu,type){
    switch(type) {
        case "required":
            return /[^(^\s*)|(\s*$)]/.test($pintu);
            break;
        case "chinese":
            return /^[\u0391-\uFFE5]+$/.test($pintu);
            break;
        case "number":
            return /^\d+$/.test($pintu);
            break;
        case "integer":
            return /^[-\+]?\d+$/.test($pintu);
            break;
        case "plusinteger":
            return /^[+]?\d+$/.test($pintu);
            break;
        case "double":
            return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
            break;
        case "plusdouble":
            return /^[+]?\d+(\.\d+)?$/.test($pintu);
            break;
        case "english":
            return /^[A-Za-z]+$/.test($pintu);
            break;
        case "username":
            return /^[a-z]\w{3,}$/i.test($pintu);
            break;
        case "mobile":
            return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[089]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu);
            break;
        case "phone":
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
            break;
        case "tel":
            return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
            break;
        case "email":
            return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
            break;
        case "url":
            return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
            break;
        case "ip":
            return /^[\d\.]{7,15}$/.test($pintu);
            break;
        case "qq":
            return /^[1-9]\d{4,10}$/.test($pintu);
            break;
        case "currency":
            return /^\d+(\.\d+)?$/.test($pintu);
            break;
        case "zip":
            return /^[1-9]\d{5}$/.test($pintu);
            break;
    }
}

module.exports ={
    check:check
};