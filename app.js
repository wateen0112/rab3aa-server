    const express = require('express');
    const cors = require('cors');
    const axios = require('axios');
    const { sendEmail } = require('./mailer');
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const {login,createUser,sendOtp } = require('./models/user')
    const qr = require('qrcode');
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true })); // Add this line to parse form data
    const port = 8000;
    const uri = "mongodb+srv://wateen:NDYUeZUpoXojhpFe@cluster0.cvsgln9.mongodb.net/?retryWrites=true&w=majority";
let db  = null;

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
  

 }
 )
 db = connectToMongo()
    app.post ('/login' ,async(req , res)=>{

        const user = await login(db , req.body.email ,req.body.password )
        
        if(!user){
            res.status(400).send('معلومات خاطثة')
        }
        else {
            res.send({user})
        }
    })
    app.post ('/register',async(req,res)=>{
    const data = createUser(db,{...req.body});
  res.send(data)
    })
    app.post('/sendEmail', async (req, res) => {
    try {
        const { email} = req.body;
       const code  =  sendOtp(db,email)
        // console.log(`data : to : ${req.body.to}  , sub : ${req.body.subject} , text : ${req.body.text}`);
        if (!email && !code) {
        return res.status(400).json({ error: 'Missing required fields.' });
        }
    const text =  `
    <!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                        
                                <img width="150" src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/1f/cc/c4/1fccc47a-8b12-3f2b-52ba-491aa61b6307/AppIcon-1x_U007emarketing-0-7-85-220.png/1200x630wa.png" title="logo" alt="logo">
                        
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                        طلب اعادة تعيين كلمة مرور</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            مرحبا بك في ميدكسا
                                            رمز اعادة تعيين كلمة المرور الخاص بك هو
                                            </p>
                                            <a href="javascript:void(0);"
                                                style="background:#2459A0;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${code}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                        
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>

    </html>`;
    const subject  ='Password recovery'
        // Assuming you have an external API to fetch the email content
        // You can customize this according to your specific use case
        // const externalApiUrl = 'https://api.example.com/get-email-content';
        // const response = await axios.get(externalApiUrl);

        // Send the email
        sendEmail(email, subject,text);

        return res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ error: 'An error occurred while sending the email.' });
    }
    });
    app.post('/generateqr',(req ,res)=>{

        const urlParam = 'https://www.facebook.com'

            generateQrCodeSVG(urlParam, (svg) => {
            // res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            // res.end(svg);
            console.log(svg);
            res.send({svg:svg})
            });
        
        
    })
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

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
      return db
        } catch(error){
          throw(error)
        }
      }
      
    function generateQrCodeSVG(url, callback) {
        qr.toString(url, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        }, (err, svg) => {
        if (err) {
            console.error('Error generating QR code:', err);
            callback('<svg></svg>'); // Return an empty SVG in case of error
        } else {
            callback(svg);
        }
        });
    }