const Web3 = require('web3');
let web3: any;
let date: Date = new Date();
const urlCookieKey: string = "urlCookie";
let gethUrl: HTMLInputElement = (<HTMLInputElement>document.getElementById('gethUrl'));
let gethConnectBtn: HTMLButtonElement = (<HTMLButtonElement>document.getElementById('gethConnectBtn'));
let gethConnectInfo: HTMLParagraphElement = (<HTMLParagraphElement>document.getElementById('gethConnectInfo'));
let accountsBtn: HTMLButtonElement = (<HTMLButtonElement>document.getElementById('accountsBtn'));
let accountsInfo: HTMLParagraphElement = (<HTMLParagraphElement>document.getElementById('accountsInfo'));
let sendToEtheBtn: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("sendToEtheBtn"));
let sendToEtheInfo: HTMLParagraphElement = (<HTMLParagraphElement>document.getElementById("sendToEtheInfo"));
let sendToEtheFrom: HTMLInputElement = (<HTMLInputElement>document.getElementById("sendToEtheFrom"));
let sendToEtheTo: HTMLInputElement = (<HTMLInputElement>document.getElementById("sendToEtheTo"));
let sendToEtheValue: HTMLInputElement = (<HTMLInputElement>document.getElementById("sendToEtheValue"));
let sendToEthePwd: HTMLInputElement = (<HTMLInputElement>document.getElementById("sendToEthePwd"));

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
        } else {
            console.log("false")
        }
        // await web3.eth.getAccounts()

    } catch (err) {
        gethConnectInfo.innerText = err;
    }
};

accountsBtn.onclick = async () => {
    if (web3 === undefined) {
        accountsInfo.innerText = "connect false";
    } else {
        let accounts: Array<string> = await web3.eth.getAccounts();
        let accountsObjArray: Array<object> = [];
        for (let i in accounts) {
            let balance: number = web3.utils.fromWei(await web3.eth.getBalance(accounts[i]), 'ether');
            let accountsObj: object = {account: accounts[i], balance: balance};
            accountsObjArray.push(accountsObj)
        }
        accountsInfo.innerText = JSON.stringify(accountsObjArray)
    }
};

sendToEtheBtn.onclick = async () => {
    if (web3 === undefined) {
        sendToEtheInfo.innerText = "connect false"
    } else {
        if (sendToEtheFrom.value === undefined || sendToEtheFrom.value === "") {
            sendToEtheInfo.innerText = "[Empty] From"
        } else if (sendToEtheTo.value === undefined || sendToEtheTo.value === "") {
            sendToEtheInfo.innerText = "[Empty] To"
        } else if (sendToEtheValue.value === undefined || sendToEtheValue.value === "") {
            sendToEtheInfo.innerText = "[Empty] Value"
        } else if (sendToEthePwd.value === undefined || sendToEthePwd.value === "") {
            sendToEtheInfo.innerText = "[Empty] PWD"
        } else {
            let isTrue = await web3.eth.personal.unlockAccount(sendToEtheFrom.value, sendToEthePwd.value);
            let state: string;
            if (isTrue) {
                state = await web3.eth.sendTransaction({
                    from: sendToEtheFrom.value,
                    to: sendToEtheTo.value,
                    value: sendToEtheValue.value
                });
                sendToEtheInfo.innerText = JSON.stringify(state)
            } else {
                sendToEtheInfo.innerText = isTrue
            }
            await web3.eth.personal.lockAccount(sendToEtheFrom.value)
        }
    }
};

function setUrlCookie(name: string, value: string, day: number) {
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function getUrlCookie(name: string): string {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

function deleteUrlCookie(name: string) {
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}
