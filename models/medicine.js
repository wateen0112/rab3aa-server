async function createMedicineCollection ( db){
    try {
    await     db.createCollection ("medicine",(err , res)=>{
          
            console.log( 'Collection medicine Created Successfully !' ,res );
        })
    } catch (error) {
        console.error('error' , error)
    }
}
async function addNewMedicine(db , dto){
    let r = null; 
    try {
        const res = await db.collection('medicine').insertOne({...dto})
   r=res
    } catch (error) {
        r=error ; 
      throw(error)  
    }
    return r
}
module.exports={
    createMedicineCollection,addNewMedicine
}