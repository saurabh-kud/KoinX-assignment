<h2 align='center'>Crypto stats </h2>
<p align="center">
<a href="https://github.com/saurabh-kud"><img title="Author" src="https://img.shields.io/badge/Author-saurabh-kud--red.svg?style=for-the-badge&logo=github"></a>
</p>

<p align="center">
<a href="https://github.com/saurabh-kud"><img title="Followers" src="https://img.shields.io/github/followers/saurabh-kud?color=teal&style=flat-square"></a>
<a href="https://github.com/saurabh-kud/KoinX-assignment/network/members"><img title="Forks" src="https://img.shields.io/github/forks/saurabh-kud/KoinX-assignment?color=lightgrey&style=flat-square"></a>
<a href="https://github.com/saurabh-kud/KoinX-assignment/issues"><img title="issues" src="https://img.shields.io/github/issues/saurabh-kud/KoinX-assignment?style=flat-square">
</a>

</p>

<p align="center">
    Crypto stats and deviation 
</p>

## Api-Base-URL 🔗

[https://koinx-assignment-lgud.onrender.com/](https://koinx-assignment-lgud.onrender.com/)

> api might be show for first time because it is hosted on free service if we don't use that for sometime render shut-down service and it can take ~50sec to spin up

# task

Develop a server side application using Node.js and MongoDB and complete the following tasks.
Task 1
Implement a background job that will fetch the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database. This job should run once every 2 hours.
The above details about a cryptocurrency can be fetched using an API from CoinGecko. You also have to search for the relevant API from their documentation: https://docs.coingecko.com/v3.0.1/reference/introduction.
Hint: Coingecko IDs for the above listed coins are bitcoin, matic-network and ethereum.
Task 2
Implement an API /stats, that will return the latest data about the requested cryptocurrency.

````sh
Query params:
{
coin: `bitcoin` // Could be one of the above 3 coins
}
​
Sample Response:
{
price: 40000,
marketCap: 800000000,
"24hChange": 3.4
}
​```

Task 3
Implement an API, /deviation, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
For example, consider the database only has 3 records for bitcoin, each with a price of 40000, 45000, 50000 respectively. Then the result should return 4082.48.

```sh
Query params:

{
coin: `bitcoin` // Could be one of the above 3 coins
}
​
Sample Response:
{
deviation: 4082.48
}
````

# tech stack used

Backend

- nodejs, express,node-cron

Database

- mongodb

## Installation

```sh

# Clone the repo
$ git clone https://github.com/saurabh-kud/KoinX-assignment

# go to growthX-Assignment directory
$ cd KoinX-assignment

# Install
$ npm install

# Setting Up ENV
> create .env file for database

# or can use this for as .env change db url
mongoURI=db_url/assignment?retryWrites=true&w=majority
PORT=3000

# Start
$ npm start

# Access your app
$ http://localhost:${PORT}

```

# endpoint response

> [GET] Home Endpoint [/](https://koinx-assignment-lgud.onrender.com/)

<details open>
<summary> See response</summary>
<p>

```json
RESPONSE 200
{
    "msg": "server is working fine🚀🚀",

}
```

</p>
</details>

> [GET] Get Coin Stats Endpoint [/stats?coin=matic](http://localhost:3000/stats?coin=matic)

<details open>
<summary> See response</summary>
<p>

```json


RESPONSE 200
{
    "price": 0.362997,
    "marketCap": 973494983.8873583,
    "24hChange": -1.6196361604391059
}
```

</p>
</details>

> [GET] GET Deviation Endpoint [/deviation?coin=matic](http://localhost:3000/deviation?coin=matic)

<details open>
<summary> See response</summary>
<p>

```json
{
    "name":"admin2",
    "email": "admin2@gmail.com",
    "password":"admin@123",
    "role": "admin"
}

RESPONSE 200
{
"deviation": 0
}
```

</p>
</details>

## Author

👤 **Saurabh kumar**

- Github: [@saurabh-kud](https://github.com/saurabh-kud)
- LinkedIN: [@saurabh-kud](https://www.linkedin.com/in/saurabh-kud/)

---

## License

&copy; Saurabh Kumar | MIT
