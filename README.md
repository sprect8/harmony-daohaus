# harmony-daohaus
Deployment of DaoHaus Smart contracts on the Harmony One Network  
This is an automated set of scripts that will deploy 
- Molochv2.1 (factory and moloch)
- Nifty Minion (factory and minion template)
- wrap-n-zap

To begin,
1. Use LTS version of Node (14/16) this is required by Hardhat
2. nvm use 14 
3. npm install 
4. Configure scripts/set-env (you can use the existing seed, it will have some testnet ONE)
5. npm run get
6. npm run compile
7. npm run deploy

Please refer to the deploy.tesetnet.md for latest deployment on testnet