function createUserCollection (mongoInstacne){

try {
    mongoInstacne.createCollection('user');
    console.log(' user collection created ');
} catch (error) {
    throw(error)
}

}  
 function addNewUser (mongoInstacne,user){
    mongoInstacne.collection('user').insertOne({...user})
 }
 async function login ( mongoInstacne,email , password ){
    const query = {email:email , password :password}
const user = await    mongoInstacne.collection('user').find(query);
return user ;
 
 }

module.exports ={
    createUserCollection ,addNewUser,login
}