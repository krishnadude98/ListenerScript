# Event Listner for Test Contract

This project conatins script that will listen for events of whitelisted contract and store it in mongodb atlas nosql database 




## Authors

- [@krishnadude98](https://www.github.com/krishnadude98)


## Installation

Install my-project with npm

```bash
  npm install 
```
    
## Initialisation

Create .env file with 
```
DB_URI="mongodb+srv://krishna:krishna@cluster0.vh9i70a.mongodb.net/test"
GORELLI_PROVIDER="<YOUR ALCHEMY NODE RPC URL>"
```
   
## Features

- It will listen for addToWhitelistEvent and balanceUpdated events
- automatically update mongodb database 


## Screenshots

![event data](screenshots/event_data.png)

![user data](screenshots/user_data.png)

![whitelist data](screenshots/whitelist_data.png)
