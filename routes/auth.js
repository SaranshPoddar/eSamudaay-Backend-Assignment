//Routes File containing request type and logic to perform specific task

const router = require("express").Router();

router.post("/orderTotal", function (req, res,next) {
  //Variable declarations and initiallizaton (Fetching JSON object values and storeing in a variable)
  var distance=req.body.distance;
  var offer=req.body.offer;
  var total = 0, delivery_fee=0;
  var orderItems = req.body.order_items;

// Condition for the distance to be in specified range else error will be generated
  if (distance >= 0 && distance <= 500000)
  { 
    distance /=1000; //Converting Distance from Meters to KiloMeters
  }else{
    res.status(400).json({ error: "distance range out of bound"  });
  }
  console.log(distance);
  
  console.log(offer);
  if(offer ==null){ offer = []; }
  
 
  for (let i = 0; i < orderItems.length; i++) {
    total += orderItems[i].quantity * orderItems[i].price;
  }
  //INR 50 for  0 - 10 Km
  //INR 100 for 10 - 20 Km
  //INR 500 for 20 - 50 Km
  //INR 1000 for 50+ Km
  if(distance >= 0 && distance < 10 ){
    delivery_fee=50*100;
  }else if(distance >= 10 && distance < 20){
    delivery_fee=100*100;
  }else if(distance >= 20 && distance < 50){
    delivery_fee=500*100;
  }else if(distance >= 50){
    delivery_fee=1000*100;
  }
  console.log(delivery_fee);
  console.log(offer);
  total += delivery_fee;
  console.log(total);
  for (let j = 0; j < offer.length; j++) {
    if (offer[j].offer_type == 'FLAT' || offer[j].offer_type == 'flat' ){
      if (offer[j].offer_val <= total){
       total -= offer[j].offer_val;
      }
    }else if (offer[j].offer_type == 'DELIVERY' || offer[j].offer_type == 'delivery'){
      if (delivery_fee <= total){
       total -= delivery_fee;
      }
    }
    console.log(offer[j].offer_val );
  }
  console.log(total);
  try {
    res.json({ order_total : total });
  } catch (error) {
    res.status(400).json({ error });
  }
  return ;

});


module.exports = router;