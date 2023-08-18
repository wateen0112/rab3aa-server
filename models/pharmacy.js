async function createPharmacyCollection ( db){
    try {
    await     db.createCollection ("pharmacy",(err , res)=>{
          
            console.log( 'Collection Pharmacy Created Successfully !' ,res );
        })
    } catch (error) {
        console.error('error' , error)
    }
}


async function addNewPharmacy (db , dto){
    let r = null
    try {
        const res = await db.collection('pharmacy').insertOne({...dto})
   r=res;
    } catch (error) {
        r=err
        throw(error)
    }
    return r  ; 
}
 function getAllPharmacies (db){
    let rr = null ;
    try {
        const res =  db.collection('pharmacy').find({}).toArray(function(err, result) {
           
            if (err) throw err;
            console.log(result);
           return (result);
     
          });;
        rr= res ;
        console.log(res);
    } catch (error) {
        rr= error ; 
        console.log(error);
        throw(error)
    }
    return rr ; 
}
module.exports=  {
    createPharmacyCollection,
    addNewPharmacy,
    getAllPharmacies
}