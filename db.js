
const { MongoClient, ServerApiVersion } = require('mongodb');
const {createUserCollection,addNewUser}  = require('./models/user')
const uri = "mongodb+srv://wateen:NDYUeZUpoXojhpFe@cluster0.cvsgln9.mongodb.net/?retryWrites=true&w=majority";
let db = null
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
     db =  client.db('midexa');

    // addNewUser(db,{
    //     id:'13246546498094894895    ',
    //     first_name:"موظف ",
    //     last_name: "2افتراضي",
    //     email : 'test2@test.com',
    //     passowrd:'123456',
    //     num_of_children:'5',
    //     salary:'155000',
    //     birth_date:'1-1-2001',
    //     is_married:true , 
    //     city:'Aleppo',
    //     gander:'male',
    //     address:'addresssss'
    // })
    // createUserCollection(db)

  } catch(error){
    throw(error)
  }
}


module.exports = {
    connectToMongo ,db
}