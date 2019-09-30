let Web3 = require('web3');

let gethConnectBtn = document.querySelector('#gethConnectBtn');
let gethUrl = document.querySelector('#gethUrl');
let gethConnectInfo = document.querySelector('#gethConnectInfo');
let accountsDiv = document.querySelector('#accountsDiv');
let accountsBtn = document.querySelector('#accountsBtn');
let accountsInfo = document.querySelector('#accountsInfo');

let web3 = false;

let urlCookieKey = "urlCookie";

let init = getUrlCookie(urlCookieKey);
if (init !== null) {
    gethUrl.value = init
}

gethConnectBtn.onclick = async () => {
    try {
        // web3 = new Web3(new Web3.providers.HttpProvider(gethUrl.value)); // [0.20.X] http://192.168.0.206:8545
        web3 = new Web3(gethUrl.value); // [1.X.X] ws://192.168.0.206:8546
        const con = await web3.eth.net.isListening();
        gethConnectInfo.innerText = "connect (" + con + ")";
        if (con) {
            setUrlCookie(urlCookieKey, gethUrl.value, 1);
            accountsDiv.style.display = "inline"
        } else {
            console.log("false")
        }
        // await web3.eth.getAccounts()

    } catch (err) {
        gethConnectInfo.innerText = err;
        accountsDiv.style.display = "none"
    }
};

accountsBtn.onclick = async () => {
    if (web3 === false) {
        accountsInfo.innerText = "connect false";
    } else {
        let accounts = await web3.eth.getAccounts();
        let accountsObjArray = [];
        for (let i in accounts) {
            let balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[i]));
            let accountsObj = {account: accounts[i], balance: balance};
            accountsObjArray.push(accountsObj)
        }
        accountsInfo.innerText = JSON.stringify(accountsObjArray)
    }
};

function setUrlCookie(name, value, day) {
    let date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getUrlCookie(name) {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function deleteUrlCookie(name) {
    let date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}
