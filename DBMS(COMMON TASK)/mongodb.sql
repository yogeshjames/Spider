mongosh

use inventoryDB

db.products


db.products.insertMany([{name:"Pen" , description: "use this for writing" , price: 34 , quantity: 20 , category:"stationary"},{name:"Pencil" , description: "use this for drawing" , price: 4 , quantity: 12 , category:"stationary"},{name:"eraser" , description: "use this for erasing" , price: 20 , quantity: 1 , category:"stationary"},{name:"dog" , description: "animal" , price: 34000 , quantity: 1 , category:"pet animal"},{name:"rubiks cube" , description: "used for playing" , price: 200 , quantity: 5 , category:"playitem"}])


 db.products.find()

 db.products.find({price: {$lt: 100}})

 db.products.find({quantity: {$gt: 15}})

  db.products.updateOne({name:"Pen"},{$set:{price:200}}) 
 
db.products.deleteOne({name:"Pen"})
