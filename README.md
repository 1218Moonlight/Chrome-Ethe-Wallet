Geth
---
> * ./geth --ws --wsaddr=0.0.0.0 --wsport 8546 --wsorigins "*" --wsapi "db,eth,net,web3,personal,admin,miner,txpool" --allow-insecure-unlock console
> * 테스트 서버를 위한 환경입니다. 절대로 본 서비스에서 0.0.0.0으로 지정하지 마세요. 해킹당합니다.
>* Test Serverの為の環境です。絶対に本サービスでは0.0.0.0を設定しないでください。ハッキングされます。

browserify (https://github.com/browserify/browserify)
---
> * browserify ./src/index.js > ./app/index.js

Chrome Extensions
---
> * chrome://extensions/
> * (Select) path/Chrome-Ethe-Wallet/app
