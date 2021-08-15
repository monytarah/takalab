# Takalab

I created two tables; products and cart. Product table has name, quantity, and price column. 
Cart table has ProductId, quantity, and paid column.

## Available endpoints
- `POST /login`
- `POST /product`
- `POST /cart`
- `POST /checkout`
- `POST /payment`

### POST /login

> Login (to get access_token)

_Request Header_
```
not needed
```

_Request Body_ 
```
{
  "name": "user",
  "pass": "user123"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```
### POST /product

> Add product

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  name: "<name to get insert into>",
  quantity: "<quantity to get insert into>",
  price: "<price to get insert into>"
}
```

_Response (201 - OK)_
```
{
    "id": 1,
    "name": "Kasur",
    "quantity": 12,
    "price": 30000,
    "updatedAt": "2021-08-13T14:15:24.133Z",
    "createdAt": "2021-08-13T14:15:24.133Z"
}
```
### POST /cart

> Add product to cart (add cart in redis)

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  ProductId: "<ProductId to get insert into>",
  quantity: "<quantity to get insert into>"
}
```

_Response (201 - OK)_
```
{
  message: "Added to cart"
}
```
### POST /checkout

> Checkout (flush cart data in redis and save data in database)

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
{
    message: "Checkout success"
}
```
### POST /payment

> Payment (change stock in database)

_Request Header_
```
{
  access_token: "<access_token>"
}
```

_Request Body_
```
{
  not needed
}
```

_Response (200 - OK)_
```
{
    message: "Checkout success"
}
```

