# trading_cards

## Project overview

For this project, the goal was to build an API that could buy, sell, and trade pokemon cards between users. We started with a seed file of 102 pokemon cards from the first generation to build our database. For our collectors, we used our group members, (Ian, Ayden, and Kevin) with a starting budget of $300.

The routes for this API are here: 

### Display all cards
/allCards

### Display all collectors
/allCollectors

### Generate a pack of 10 cards for the user
/:id/pack

### Buy a card from the pack
/:id/pack/:cardid/buy

### Sell a card that the user has purchased
/:id/pack/:cardid/sell

### Trade cards between 2 users
/:cardid1/:cardid2/trade


## How to get started
//npm init

//npm install:

//jest
//sqlite3
//sequelize
//express
//nodemon