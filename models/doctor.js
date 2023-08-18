async function createDoctorCollection ( db){
    try {
    await     db.createCollection ("doctor",(err , res)=>{
          
            console.log( 'Collection doctor Created Successfully !' ,res );
        })
    } catch (error) {
        console.error('error' , error)
    }
}


async function addNewDoctor (db , dto){
    let r = null
    try {
        const res = await db.collection('doctor').insertOne({...dto})
   r=res;
    } catch (error) {
        r=err
        throw(error)
    }
    return r  ; 
}
 function getAllDoctors (db){
    let rr = null ;
    try {
        const res =  db.collection('doctor').find({}).toArray(function(err, result) {
           
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
    createDoctorCollection,
    addNewDoctor,
    getAllDoctors
}