# eSamudaay-Backend-Assignment
API to calculate the order total amount.

# To run the project in development server

1. Go to project root folder and run below commands

```
> npm install
> npm start
```

# Pre-requites

1. Node JS v12.16.1 or above installed
2. Visual Studio Code installed
3. Postman installed

# Assignment Discription
Build an application server with a single API.

The API will take as input items ordered, delivery distance, and offer applied. The response is the total order value.

API Input
{
  "order_items": [
    {
      "name": "bread",
      "quantity": 2,
      "price": 2200
    },
    {
      "name": "butter",
      "quantity": 1,
      "price": 5900
    }
  ],
  "distance": 1200,
  "offer": {
    "offer_type": "FLAT",
    "offer_val": 1000
  }
}

 
**order_items is a list of items ordered by Pinkman. Each item will have a name(string), quantity(int), price(int) in paisa.

**Assume a reasonable maximum length for name, maximum permissible value for quantity and price.

**distance is delivery distance in meters. Allowed values for distance are integers between 0 and 500000 (both inclusive).

**offer provides information about the offer applied to the order. This is optional and will not be in input, if no offer is applied.

**offer_type can have 2 possible values - 

   1. FLAT - This denotes flat discount. In this case offer_val is a non-negative integer denoting flat discount to be applied in paisa.
   
   2. DELIVERY - This denotes delivery fee (if any) is free.

API Response

The API responds with total order cost in paisa (int). Appropriate HTTP response status code is returned in case of error.

The total order cost is calculated as following - 

Get the item total by adding cost for each item. This is the sum of the cost of each individual item. Each item’s cost is quantity * price.

Add the delivery cost. Delivery cost is applied on the distance as per delivery_cost slab. The slab is configurable. An example configuration for slab can be - 

INR 50 for  0 - 10 Km

INR 100 for 10 - 20 Km

INR 500 for 20 - 50 Km

INR 1000 for 50+ Km


Feel free to use appropriate data structure(s) to represent this slab.

Apply a discount if available. The discount is to be applied on the sum of item total and delivery cost.

In case of FLAT discount, the discount is simply the offer_val.

In case of DELIVERY discount, the discount will be equal to the delivery fee.

The maximum possible discount cannot be more than order value without discount.


The total order cost for the API input in the example will be calculated as following  -

Item_total = 2200*2 + 5900*1 = 10300.

Delivery fee = 5000 Paisa (as Distance is 1.2 Km)

Order total without offer = 15300 Paisa

Discount = minimum of (1000,15300) = 1000

Total order cost = 15300 - 1000 = 14300

API will respond with following JSON
{'order_total':14300}

# To check whether the project is running or not pass the json to running api. See below the pics of postman and you can also check the api by doing same

![Postman_1](https://user-images.githubusercontent.com/63144578/128712032-595d54f7-f9d1-4ccf-9909-5defc314c9b9.PNG)

Output:

![Postman_2](https://user-images.githubusercontent.com/63144578/128712145-551ae025-3a82-465a-ad93-f3ff8921072d.PNG)

PASS different-different parameters in json and check api accordingly.

# Thank You for viewing this document. Hope it worked! Have Fun With Code!
