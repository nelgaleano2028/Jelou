GET http://localhost:3000/api/customers


GET http://localhost:3000/api/customers/5
RESPONSE
{
  "customer_id": 5,
  "name": "Benji Price",
  "email": "bPrice@gmail.com",
  "phone": 301445896,
  "created": "2025-08-01"
}


POST http://localhost:3000/api/customers
REQUEST
{
  "customer_id": 123, 
  "name" : "Homero",
  "email": "homero@gmail.com",
  "phone": 301778010,
  "created":"2025-10-16"
}


PATCH http://localhost:3000/api/customers/123
REQUEST
{
  "name" : "Homero",
  "email": "simpson@gmail.com",
  "phone": 301578010,
  "created":"2025-10-16"
}


Delete http://localhost:3000/api/customers/123

*************************************************************************************

Get http://localhost:3000/api/products


Get http://localhost:3000/api/products/3
RESPONSE
{
  "id_product": 3,
  "name": "Nevera",
  "price_cents": 190,
  "stock": 80,
  "created": "2025-10-16"
}


Post http://localhost:3000/api/products
REQUEST
{
  "id_product": 6,
  "name": "Play Station 5",
  "price_cents": 160,
  "stock": 85,
  "created": "2025-10-16"
}


PATCH http://localhost:3000/api/products/123
REQUEST
{
  "id_product": 123,
  "name": "Celular",
  "price_cents": 116,
  "stock": 175,
  "created": "2025-08-05"
}


DELETE http://localhost:3000/api/products/123

*************************************************************************************



GET http://localhost:3000/api/orderCreate
REQUEST
{
  "customer_id": 3,
  "id_product": 4,
  "cantidad": 3
}

REPONSE
{
  "id": 10,
  "customer_id": 3,
  "resultConsumer": [
    {
      "customer_id": 3,
      "name": "Jill Valantine",
      "email": "jvalentine.gmail.com",
      "phone": 316789451,
      "created": "2025-09-20"
    }
  ],
  "estado": "CREATED",
  "precioTotal": 555,
  "newOrder": 26,
  "resultProduct": [
    {
      "id_product": 4,
      "name": "Lavadora",
      "price_cents": 185,
      "stock": 105,
      "created": "2025-10-16"
    }
  ],
  "id_product": 4,
  "cantidad": 3,
  "precioUnidad": 185
}



GET http://localhost:3000/api/orderConfirmed
REQUEST
{
  "id_orders": 10
}
RESPONSE
{
  "resultEstadoOrder": [
    {
      "id_orders": 28,
      "customer_id": 1,
      "status_order": "CONFIRMED",
      "total_cents": 460
    }
  ],
  "resultConsumer": [
    {
      "customer_id": 1,
      "name": "Jon Doe",
      "email": "jdoe.gmail.com",
      "phone": 315612312,
      "created": "2025-09-20"
    }
  ],
  "resultProduct": [
    {
      "id_product": 1,
      "name": "Computador",
      "price_cents": 230,
      "stock": 136,
      "created": "2025-10-16"
    }
  ]
}


GET http://localhost:3000/api/orderCanceled
REQUEST
{
  "id_orders": 21
}
RESPONSE
{
  "resultEstadoOrder": [
    {
      "id_orders": 29,
      "customer_id": 5,
      "status_order": "CANCELED",
      "total_cents": 380
    }
  ],
  "resultConsumer": [
    {
      "customer_id": 5,
      "name": "Benji Price",
      "email": "bPrice@gmail.com",
      "phone": 301445896,
      "created": "2025-08-01"
    }
  ],
  "resultProduct": [
    {
      "id_product": 3,
      "name": "Nevera",
      "price_cents": 190,
      "stock": 78,
      "created": "2025-10-16"
    }
  ]
}
