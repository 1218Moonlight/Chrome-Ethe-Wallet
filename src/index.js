let Web3 = require('web3');

let gethConnectBtn = document.querySelector('#gethConnectBtn');
let gethUrl = document.querySelector('#gethUrl');
let gethConnectInfo = document.querySelector('#gethConnectInfo');
let accountsDiv = document.querySelector('#accountsDiv');
let accountsBtn = document.querySelector('#accountsBtn');
let accountsInfo = document.querySelector('#accountsInfo');
let web3 = false;

gethConnectBtn.onclick = () => {
    web3 = new Web3(new Web3.providers.HttpProvider(gethUrl.value)); // http://192.168.0.204:8545
    try {
        let con = web3.isConnected();
        gethConnectInfo.innerText = "connect (" + con + ")";
        if (con) {
            accountsDiv.style.display = "inline"
        } else {
            accountsDiv.style.display = "none"
        }
    } catch (err) {
        gethConnectInfo.innerText = err;
        accountsDiv.style.display = "none"
    }
};

accountsBtn.onclick = () => {
    if (web3 === false) {
        accountsInfo.innerText = "connect false";
    } else {
        accountsInfo.innerText = web3.eth.accounts
    }
};
