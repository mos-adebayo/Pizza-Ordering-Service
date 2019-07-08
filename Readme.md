# Pizza Ordering Service

This is a pizza ordering services with the following functionality -
- Order a pizza
- Update an order
- Remove an order
- Retrieve order
- List orders

**NOTE:** You need to have postgres installed for the database

## Usage
To start the backend project; follow these steps:

Run `cd backend`

Run `npm i`  or `yarn` to install all the dependencies

Run `createdb pizza-order` to create database

Run `node_modules/.bin/sequelize db:migrate` to run db migration

Run `node_modules/.bin/sequelize db:seed:all` to run seed

Run `yarn start` or `npm start` to start the backend service

The backend is accessible via `http://localhost:8000` by default

Additionally, you can run `yarn test` to run the tests included in the project.

## API Routes
This are the available endpoints at the backend:
### Create order
- `POST http://localhost:8000/order` 

    Example Request body:
    ```javascript
        {
        	"customerName": "moses adebayo", 
        	"address": "Ilupeju lagos",
        	"pizzaTypeId": 2,
        	"pizzaSizeId": 3
        }
    ```
    Example Response body:
    ```javascript
        {
            "data": {
                "quantity": 1,
                "id": 57,
                "customerName": "moses adebayo",
                "address": "Ilupeju lagos",
                "pizzaTypeId": 2,
                "pizzaSizeId": 3,
                "statusId": 1,
                "updatedAt": "2019-07-08T22:31:50.046Z",
                "createdAt": "2019-07-08T22:31:50.046Z",
                "deletedAt": null
            }
        }
    ```
    
### Get Order By Id
- `GET http://localhost:8000/orders/:id`

    Example Response body:
    ```javascript
        {
            "data": {
                "id": 1,
                "customerName": "moses adebayo",
                "quantity": 1,
                "pizzaTypeId": 2,
                "pizzaSizeId": 3,
                "statusId": 2,
                "address": "Ilupeju lagos",
                "deletedAt": null,
                "createdAt": "2019-07-07T09:55:08.261Z",
                "updatedAt": "2019-07-07T15:10:38.517Z",
                "status": {
                    "id": 2,
                    "name": "Delivered",
                    "createdAt": "2019-07-07T09:51:00.425Z",
                    "updatedAt": "2019-07-07T09:51:00.425Z"
                }
            }
        }
    ```
    
### Update Order By
- `PUT http://localhost:8000/orders/:id`

    Example Request body:
    ```javascript
        {
        	"customerName": "New Customer",
        	"pizzaTypeId": 2,
        	"pizzaSizeId": 3,
        	"statusId": 1,
      	    "quantity": 5,    
    	    "address": "Ilupeju lagos"
        }
    ```
    Example Response body:
    ```javascript
        {
            "data": {
                "id": 2,
                "customerName": "New Customer",
                "quantity": 1,
                "pizzaTypeId": 2,
                "pizzaSizeId": 3,
                "statusId": 1,
                "address": "Ilupeju lagos",
                "deletedAt": null,
                "createdAt": "2019-07-07T10:39:00.978Z",
                "updatedAt": "2019-07-07T10:39:00.978Z",
                "status": {
                    "id": 1,
                    "name": "Pending",
                    "createdAt": "2019-07-07T09:51:00.425Z",
                    "updatedAt": "2019-07-07T09:51:00.425Z"
                }
            }
        }
    ```

### Remove order 
- `DELETE http://localhost:8000/orders/:id` 

    Example Response body:
    ```javascript
        {
            "data": "Order removed"
        }
   ```
   
### List Orders
- `POST http://localhost:8000/orders/search` 

    Example Request body:
    ```javascript
        {
        	"pizzaTypeId": 2,
        	"pizzaSizeId": 3,
        	"statusId": 1,
        	"startDate": "2019-01-01",
        	"endDate": "2019-12-12"
        }
    ```
    Example Response body:
    ```javascript
        {
            "data": {
                "totalRecords": 1,
                "page": "1 of 1",
                "size": 1,
                "rows": [
                    {
                        "id": 57,
                        "customerName": "moses adebayo",
                        "quantity": 1,
                        "pizzaTypeId": 2,
                        "pizzaSizeId": 3,
                        "statusId": 1,
                        "address": "Ilupeju lagos",
                        "deletedAt": null,
                        "createdAt": "2019-07-08T22:31:50.046Z",
                        "updatedAt": "2019-07-08T22:31:50.046Z",
                        "pizzaType": {
                            "id": 2,
                            "name": "Marinara",
                            "createdAt": "2019-07-07T09:51:00.438Z",
                            "updatedAt": "2019-07-07T09:51:00.438Z"
                        },
                        "pizzaSize": {
                            "id": 3,
                            "name": "Large",
                            "createdAt": "2019-07-07T09:51:00.435Z",
                            "updatedAt": "2019-07-07T09:51:00.435Z"
                        },
                        "status": {
                            "id": 1,
                            "name": "Pending",
                            "createdAt": "2019-07-07T09:51:00.425Z",
                            "updatedAt": "2019-07-07T09:51:00.425Z"
                        }
                    }
                ]
            }
        }
    ```

### Get Status
- `GET http://localhost:8000/status` 

    Example Response body:
    ```javascript
       {
           "data": [
               {
                   "id": 1,
                   "name": "Pending",
                   "createdAt": "2019-07-07T09:51:00.425Z",
                   "updatedAt": "2019-07-07T09:51:00.425Z"
               },
               {
                   "id": 2,
                   "name": "Delivered",
                   "createdAt": "2019-07-07T09:51:00.425Z",
                   "updatedAt": "2019-07-07T09:51:00.425Z"
               },
               {
                   "id": 3,
                   "name": "Canceled",
                   "createdAt": "2019-07-07T09:51:00.425Z",
                   "updatedAt": "2019-07-07T09:51:00.425Z"
               }
           ]
       }
    ```
        
  
### Get Pizza Types
- `POST http://localhost:8000/pizza-types` 

    Example Request body:
    ```javascript
       {
           "data": [
               {
                   "id": 1,
                   "name": "Margarita",
                   "createdAt": "2019-07-07T09:51:00.438Z",
                   "updatedAt": "2019-07-07T09:51:00.438Z"
               },
               {
                   "id": 2,
                   "name": "Marinara",
                   "createdAt": "2019-07-07T09:51:00.438Z",
                   "updatedAt": "2019-07-07T09:51:00.438Z"
               },
               {
                   "id": 3,
                   "name": "Salami",
                   "createdAt": "2019-07-07T09:51:00.438Z",
                   "updatedAt": "2019-07-07T09:51:00.438Z"
               }
           ]
       }
    ```  
    
### Get Pizza Sizes
- `POST http://localhost:8000/pizza-sizes` 

    Example Request body:
    ```javascript
      {
          "data": [
              {
                  "id": 1,
                  "name": "Small",
                  "createdAt": "2019-07-07T09:51:00.435Z",
                  "updatedAt": "2019-07-07T09:51:00.435Z"
              },
              {
                  "id": 2,
                  "name": "Medium",
                  "createdAt": "2019-07-07T09:51:00.435Z",
                  "updatedAt": "2019-07-07T09:51:00.435Z"
              },
              {
                  "id": 3,
                  "name": "Large",
                  "createdAt": "2019-07-07T09:51:00.435Z",
                  "updatedAt": "2019-07-07T09:51:00.435Z"
              },
              {
                  "id": 4,
                  "name": "X-Large",
                  "createdAt": "2019-07-07T09:51:00.435Z",
                  "updatedAt": "2019-07-07T09:51:00.435Z"
              }
          ]
      }
    ```
        
        
# FRONTEND DOCUMENTATION

## Usage
To run this project follow these steps:

Run `cd frontend`

Run `npm i`  or `yarn` to install all the dependencies

Then run `npm start` or `yarn start`  to start the project

The frontend is accessible via `http://localhost:3000` by default


# Docker
- sudo docker-compose build
- sudo docker-compose up
