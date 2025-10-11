import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

//validation middlewares
import validate_sign_up from './middlewares/validate_sign_up.js';

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage for multer (files saved to 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // Save the file with its original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload_image = multer({
  storage,
  limits: {
      fileSize: 1024 * 1024
    },
  fileFilter: (req, file, cb)=>{
    const allowed_mime_types = ['image/jpeg', 'image/jpg', 'image/png'];
    allowed_mime_types.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  }
});

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true,
}));

app.use(cookieParser());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "agrohub"
};

//Route for /sign_up
app.post('/sign_up',upload_image.single('user_photo'),validate_sign_up ,async (req, res)=>{
  try{
    //Get inputs by destructuring
    const { fname,lname,phone_number,user_role,username_or_email,user_password, is_user_photo } = req.body;
    const public_id = Math.random()+"_"+user_password+"_"+user_role;
    const user_photo = req?.file?.filename || '';
    const allowed_mime_types = ['image/png', 'image/jpg', 'image/jpeg'];

    if(is_user_photo.length > 0 && !allowed_mime_types.includes(req?.file?.mimetype)){
      return res.json({status: 500, message: 'makesure file format is either jpeg, jpg or png'});
    }
    if(is_user_photo.length > 0 && req?.file?.size > 1024*1024){
      return res.json({status: 500, message: `You can't upload a file with more than 1MB`});
    }

    const insert_query = `INSERT INTO users(public_id,fname,lname,phone_number,user_role,
                          username_or_email,user_password,user_photo)
                          VALUES(?,?,?,?,?,?,?,?)`;
    const select_query = `SELECT * FROM users WHERE user_password=? AND username_or_email=?`;

    const mysqlConn = await mysql.createConnection(dbConfig);

    const [select_row] = await mysqlConn.execute(select_query,
      [user_password, username_or_email]
    );

    if(select_row.length > 0){
      //Account exists
      res.json({status:500, message:'Account exists'});
      console.log('this user credentials exists in DB');
    }
    else{
      const [insert_row] = await mysqlConn.execute(insert_query, [
        public_id,fname,lname,phone_number,user_role,username_or_email,user_password,user_photo
      ]);

      res.json({status:200, message:'New account is successfully  created'});
      console.log('new user added');
    }

    mysqlConn.end();
  }
  catch(e){
    console.log('catched err: '+e);
  }

});

//Route for /getLoggedInUser
app.post('/sign_in',upload_image.single('user_photo'), async (req, res)=>{
  try{
    //destructure form input-values
    const {user_password, username_or_email} = req.body;
    
    //fetch userData
    const query = `SELECT * FROM users WHERE user_password=? and username_or_email=?`;
    const DBConn = await mysql.createConnection(dbConfig);
    const [fetchedRows] = await DBConn.execute(query, [user_password, username_or_email]);
    DBConn.end();

    //If user is available in DB
    if(fetchedRows.length > 0){
      const user_id = fetchedRows[0].id;
      const user_role = fetchedRows[0].user_role;
      //create token for this sign-in since user is available in DB
      const my_secret_key = "Sabdillah@1999";
      const payload = {user_id, user_role};
      const token = jwt.sign(payload,my_secret_key,{expiresIn:'7d'});

      //generate cookie and save it in backend
      res.cookie('agrohub',token,{
        maxAge: 1000*60*60*24*7,
        secure: false,
        sameSite: 'lax',
        httpOnly: true,
      });
      
      //send 200 status
      res.json({status:200, message: "account exists, login is successful"});  
    }
    else{
      //send 400 status
      res.json({status:403, message: "account doesnt exist, please create new account"});    
    }
  }
  catch(e){
    //send 500 status
    res.json({status:500, message: "failed to fetch user from database : "+ e}); 
  };
});

// Single POST endpoint to upload crop data + photo
app.post('/upload_crop', upload_image.single('crop_photo'), async (req, res) => {
  try {
    // Access form fields (text)
    const {
      sellerID,
      cropName,
      unit,
      quantity,
      minimumSellableQuantity,
      price,
      description
    } = req.body;

    // Access filename
    const photo_name = req.file?.filename || null;

    // Save to MySQL
    const connection = await mysql.createConnection(dbConfig);

    const query = `
      INSERT INTO crops 
      (seller_id, crop_name, unit, minimum_sellable_quantity, total_quantity, 
      price_per_minimum_sellable_quantity, description, crop_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Inserting crop:', {
      sellerID,
      cropName,
      unit,
      minimumSellableQuantity,
      quantity,
      price,
      description,
      photo_name
    });

    await connection.execute(query, [
      sellerID,
      cropName,
      unit,
      minimumSellableQuantity,
      quantity,
      price,
      description,
      photo_name
    ]);

    await connection.end();

    res.json({ status:'200', message: 'Crop uploaded successfully!' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/get_user_from_cookie', upload_image.single('user_photo'), async (req, res)=>{
  
  try{
    //fetch cookie's token
    const cookie_token = req.cookies.agrohub;
    console.log('fetched cookie token'+cookie_token);

    if(cookie_token){
      const userData = jwt.verify(cookie_token,'Sabdillah@1999');
      console.log('userData is '+JSON.stringify(userData));
      res.json(userData);
    }
    else{
      res.json({user_id:null, user_role: null});
    }
  }
  catch(e){
    console.log("catched err: "+e);
  }

});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});