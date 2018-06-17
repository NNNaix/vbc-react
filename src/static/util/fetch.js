/**
 * 将对象转换为格式是"key1=value1&key2=value2"的字符串
 * @param obj object
 */

function obj2String(obj,arr=[],index = 0) {
    for(let item in obj){
        arr[index++] =[item,obj[item]]
    }
    return new URLSearchParams(arr).toString();
}

/**
 * Fetch ajax请求
 * @param url 请求地址
 * @param paramObj 请求参数
 * @param method  请求方式
 * @param handle 回调函数
 */
function Fetch(url,paramObj,method='GET',handle) {
    const searchStr = obj2String(paramObj);
    let initObj = {};
    if(method ==='GET'){
        url +='?'+searchStr;
        initObj = {
            method:method,
            credentials:'include'
        }
    }else {
        initObj = {
            method:method,
            credentials:'include',
            headers:new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body:searchStr
        }
    }
    fetch(url,initObj).then((res)=>{
        if(res){
            return res.json();
        }
    }).then((data)=>{
        handle(data)
    }).catch((err)=>{
        console.log(err)
    })
}

/**
 *
 * @param url 请求地址
 * @param paramObj 请求参数对象
 * @param handle 回调函数
 */
function GET(url,paramObj,handle) {
    return Fetch(url,paramObj,'GET',handle);
}

/**
 *
 * @param url 请求地址
 * @param paramObj 请求参数对象
 * @param handle 回调函数
 */
function POST(url,paramObj,handle) {
    return Fetch(url,paramObj,'POST',handle);
}

export  {POST,GET}