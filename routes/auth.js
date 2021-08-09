//Routes File containing request type and logic to perform specific task

const router = require("express").Router();

router.post("/orderTotal", function (req, res,next) {
  //Variable declarations and initiallizaton (Fetching JSON object values and storeing in a variable)
  var distance=req.body.distance; // distance fetched is in meters
  var offer_type=req.body.offer.offer_type;
  var offer_val=req.body.offer.offer_val;
  var total = 0, delivery_fee=0;
  var orderItems = req.body.order_items; //variable to store the Order Items Array

  // Condition for the distance to be in specified range else error will be generated
  if (distance >= 0 && distance <= 500000)
  { 
    distance /=1000; //Converting Distance from Meters to KiloMeters
  }else{
    res.status(400).json({ error: "distance range out of bound"  });
  }

  // logic to calculate basic order total  
  for (let i = 0; i < orderItems.length; i++) {
    total += orderItems[i].quantity * orderItems[i].price;
  }

  //Conditions to decide delivery fee
  /*INR 50 or 5000 paisa for  0 - 10 Km
    INR 100 10000 paisa for 10 - 20 Km
    INR 500 50000 paisa for 20 - 50 Km
    INR 1000 100000 paisa for 50+ Km*/
  if(distance >= 0 && distance < 10 ){
    delivery_fee=50*100; 
  }else if(distance >= 10 && distance < 20){
    delivery_fee=100*100;
  }else if(distance >= 20 && distance < 50){
    delivery_fee=500*100;
  }else if(distance >= 50){
    delivery_fee=1000*100;
  }
  // Adding delivery fee to order total
  total += delivery_fee;
  
  //Condition for offer applied 
  if (offer_type == 'FLAT' || offer_type == 'flat' ){
    if (offer_val <= total){
     total -= offer_val;  // Subtracting offer value from order total
    }
  }else if (offer_type == 'DELIVERY' || offer_type == 'delivery'){
    if (delivery_fee <= total){
     total -= delivery_fee;  // Subtracting delivery fee from order total
    }
  }
  
  //sending a JSON response containing final order total
  try {
    res.json({ order_total : total });
  } catch (error) {
    res.status(400).json({ error });
  }
  return ;

});


module.exports = router;