async function createOperationCollection ( db){
    try {
    await     db.createCollection ("operation",(err , res)=>{
          
            console.log( 'Collection operation Created Successfully !' ,res );
        })
    } catch (error) {
        console.error('error' , error)
    }
   

}
async function addNewOperation (db , dto){
    let r = null
    try {
        const res = await db.collection('operation').insertOne({...dto})
   r=res;
    } catch (error) {
        r=error
        throw(error)
    }
    return r  ; 
}
module.exports={

    createOperationCollection,
    addNewOperation
}