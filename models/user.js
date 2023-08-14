// models/user.js

async function login(db, email, password) {
    try {
        const query = { email: email, password: password };
        const user = await db.collection('user').findOne(query);
        if (!user) {
            console.log('User not found');
            return null
        }
       else {
        return user;
       }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}
async function createUser (db,user){
    const u = await db.collection('user').insertOne({...user});
return u ;
}
async function  sendOtp (db , email ){
    const query = { email: email }; // Example query to identify the item to be updated
const update = { name: 'Updated Name', quantity: 10 }; // Example update
const code = generateRandom6DigitNumber()
    const res = await db.collection('user').updateOne(query , {$set :{code:code}})
if(res){
    return code
}
}
function generateRandom6DigitNumber() {
    const min = 100000; // Minimum 6-digit number (100000)
    const max = 999999; // Maximum 6-digit number (999999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {

    createUser,
    login,
    sendOtp
};
