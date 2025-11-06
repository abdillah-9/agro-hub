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

//Middleware to allow file access from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

    const insert_query = `INSERT INTO users(public_id,user_fname,user_lname,phone_number,user_role,
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

      res.json({status:200, message:'New account was successfully  created'});
      console.log('new user added');
    }

    mysqlConn.end();
  }
  catch(e){
    console.log('catched err is: '+e);
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
      const user_fname = fetchedRows[0].fname;
      const user_lname = fetchedRows[0].lname;
      const user_photo = fetchedRows[0].user_photo;
      //create token for this sign-in since user is available in DB
      const my_secret_key = "Sabdillah@1999";
      const payload = {user_id, user_role, user_fname, user_lname, user_photo};
      const token = jwt.sign(payload,my_secret_key,{expiresIn:'7d'});

      //generate cookie and save it in backend
      res.cookie('agrohub',token,{
        maxAge: 1000*60*60*24*7,
        secure: false,
        sameSite: 'lax',
        httpOnly: true,
      });
      
      //send 200 status
      res.json({status:200, message: "account exists, login was successful"});  
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

app.post('/get_user_from_cookie', upload_image.single('user_photo'), async (req, res)=>{
  
  try{
    //fetch cookie's token
    const cookie_token = req.cookies.agrohub;
    console.log('fetched cookie token'+cookie_token);

    if(cookie_token){
      const cookie_payload = jwt.verify(cookie_token,'Sabdillah@1999');
      console.log('cookie_payload is '+JSON.stringify(cookie_payload.user_id));
      //generate userData
      const query = "SELECT * FROM users where id=?";
      const DB_conn = await mysql.createConnection(dbConfig);
      const [userData] = await DB_conn.execute(query, [cookie_payload.user_id]);
      DB_conn.end();
      console.log("userData "+JSON.stringify(userData));
      return res.json({
        ...userData[0],
        fname: userData[0].user_fname, 
        lname: userData[0].user_lname,
        user_id: userData[0].id
      });
    }
    else{
      const userData = {user_id:null, user_role: null};
      return res.json(userData);
    }
  }
  catch(e){
    console.log("catched err: "+e);
  }

});

app.post('/update_user_profile', upload_image.single('user_photo'), async(req, res)=>{
  try{
    const {
      user_id,
      user_fname, 
      user_lname, 
      user_location, 
      username_or_email,
      phone_number,
      file_name,
    } = req.body;

    console.log("File name "+file_name)

    //validate photo if it was uplpaded
    if(req?.file && req?.file?.size > 1024*1024){
      return res.json({status:500, message:"file should be not more than 1MB"});
    }
    const allowed_mime_types = ['image/png', 'image/jpg', 'image/jpeg'];

    if(req?.file && !allowed_mime_types.includes(req?.file?.mimetype)){
        return res.json({status:500, message:'image should be png, jpg or jpeg'});
    }

    const query=`UPDATE users 
                  SET user_fname=?, user_lname=?, user_location=?,username_or_email=?,
                  phone_number=?, user_photo=?  
                  WHERE id=?`;

    const DB_conn = await mysql.createConnection(dbConfig);
    const [row] = await DB_conn.execute(query, [
      user_fname, 
      user_lname,
      user_location,
      username_or_email,
      phone_number,
      req?.file?.filename || file_name,
      user_id
    ]);

    return res.json({status:200, message:'User profile is successful updated'});   
  }
  catch(err){
    console.log("Cathed err is "+err);
  }
});

app.post('/update_user_password', upload_image.single('user_photo'), async(req, res)=>{
  try{
        const {
      user_id,
      new_password,
      old_password,
      user_password,
      cf_password,
    } = req.body;
                                            
    
    if(new_password.length > 16 || new_password.length < 8){
      return res.json({status: 403, message: "new password should be 8 to 16 characters"})
    }
    if(/^[<>/\\*&]+$/.test(new_password)){
      return res.json({status: 403, message: `You cannot use tags (< or >), 
      slashes( / or \), star(*) and & special characters`}); 
    }

    //validate passwords
    if(user_password != old_password){
      return res.json({status: 403, message:'old password you entered is not correct'});
    }

    if(new_password != cf_password){
      return res.json({
        status:500, 
        message:'new password and confirm password fields should match'
      });
    }

    const query=`UPDATE users 
                  SET user_password=?  
                  WHERE id=?`;

    const DB_conn = await mysql.createConnection(dbConfig);
    const [row] = await DB_conn.execute(query, [
      new_password,
      user_id
    ]);

    return res.json({status:200, message:'User password is successful updated'});
  }catch(err){
    console.log("catched error is "+err);
  }
});

app.post('/update_profile_photo',upload_image.single('user_photo'), async (req, res)=>{
  try{
    const user_photo = req?.file;
    const {user_id} = req?.body;

    console.log("user id is "+user_id+" and user_photo is "+user_photo);
    if(!user_photo){
      return res.json({status:403, message:'Please upload a file'});
    }

    const updateQuery = " UPDATE users SET user_photo=? WHERE id=? ";
    const dbConn = mysql.createConnection(dbConfig);
    dbConn.execute(updateQuery, [req?.file?.filename, user_id]);
    return res.json({status: 200, message: 'photo uploaded successful'});
  }
  catch(err){
    console.log("Catched err is "+err);
  }
});

app.post('/logout', async (req, res)=>{
  //remove cookie from browser
  try{
    res.clearCookie('agrohub',{
      httpOnly:true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000*60*60*24*7,   
    });
    return res.json({status: 200, message:"User was successfully logged out"});
  }
  catch(e){
    console.log('catched err: '+e);
  }
});

// Single POST endpoint to upload crop data + photo
app.post('/upload_crop_for_sale', upload_image.single('crop_photo'), async (req, res) => {
  try {
    // Access form fields (text)
    const {
      seller_id,
      crop_name,
      unit,
      total_quantity,
      minimum_sellable_quantity,
      price_per_minimum_sellable_quantity,
      description,
      edit_mode,
      row_id
    } = req.body;

    console.log("Req body is "+JSON.stringify(req.body));
    console.log("edit_mode "+edit_mode);

    //validate Inputs
    if(!/^[\d]+$/.test(seller_id) ){
      return res.json({status: 403, message: 'Seller Id  is not valid'});
    }
    if(!/^[\w\s]+$/.test(crop_name)){
      return res.json({status: 403, message: `Crop name must include only 
      letters, underscore and white-spaces`});
    }
    if(!/^[\d]+$/.test(Number(total_quantity))){
      return res.json({status: 403, message: `Total quantity can be either
      integer or float -backend `+total_quantity});
    }
    if(!/^[\d]+$/.test(Number(price_per_minimum_sellable_quantity))){
      return res.json({status: 403, message: `Price should be either float 
      or integer`});
    }
    if(/^[<>/\\*&]+$/.test(description)){
     return res.json({status: 403, message: `You cannot use tags (< or >), 
      slashes( / or \), start (*) and & special characters`}) 
    }

    // Access filename
    const photo_name = req.file?.filename || null;

    // Process to save to MySQL DB
    const connection = await mysql.createConnection(dbConfig);

    const insertQuery = `
      INSERT INTO crops 
      (seller_id, crop_name, unit, minimum_sellable_quantity, total_quantity, 
      price_per_minimum_sellable_quantity, description, crop_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const updateQuery = `UPDATE crops SET seller_id=?, crop_name=?, unit=?, minimum_sellable_quantity=?,
      total_quantity=?, price_per_minimum_sellable_quantity=?, description=?, crop_photo=? WHERE id=?`;

    if(edit_mode == 'true'){
      console.log("data updated successfully");
      await connection.execute(updateQuery, [
        seller_id, 
        crop_name, 
        unit, 
        minimum_sellable_quantity, 
        total_quantity, 
        price_per_minimum_sellable_quantity,
        description, 
        photo_name, 
        row_id
      ]);
      res.json({ status:200, message: 'Crop updated successfully!' });
    }
    else{
      console.log("data inserted successfully");
      await connection.execute(insertQuery, [
        seller_id,
        crop_name,
        unit,
        minimum_sellable_quantity,
        total_quantity,
        price_per_minimum_sellable_quantity,
        description,
        photo_name
      ]);
      res.json({ status:200, message: 'Crop inserted successfully!' });
    }

    await connection.end();

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/get_crops_sales',upload_image.single('user_photo'), async (req , res)=>{
  try{
    //destructure req
    const {user_id, status} = await req.body;
    console.log('user_id '+user_id+' status '+status)
    //fetch query
    const DBConn = await mysql.createConnection(dbConfig);
    const purchased_query = `SELECT crops_orders.*, 
                                crops.crop_name, crops.crop_photo, crops.unit,crops.seller_id,
                                users.user_fname, users.user_lname, users.user_location 
                                FROM crops_orders 
                                JOIN crops ON 
                                crops_orders.ordered_crop_id = crops.id
                                JOIN users ON
                                crops.seller_id = users.id 
                                WHERE crops.seller_id =? AND crops_orders.deleted_at IS NULL AND 
                                crops_orders.status =?`;

    const pending_query = `SELECT crops_orders.*, 
                                crops.crop_name, crops.crop_photo, crops.unit,crops.seller_id,
                                users.user_fname, users.user_lname, users.user_location 
                                FROM crops_orders 
                                JOIN crops ON 
                                crops_orders.ordered_crop_id = crops.id
                                JOIN users ON
                                crops_orders.buyer_id = users.id 
                                WHERE crops.seller_id =? AND crops_orders.deleted_at IS NULL AND 
                                crops_orders.status =?`;

    const onsale_query= `SELECT crops.*,
                                users.user_fname, users.user_lname, users.user_location
                                FROM crops
                                JOIN users ON crops.seller_id = users.id
                                WHERE crops.deleted_at IS NULL AND seller_id = ?`;
                                
    //execute onsale query
    const [onsale_rows] = await DBConn.execute(onsale_query, [user_id]);
    //execute purchased query
    const [purchase_rows] = await DBConn.execute(purchased_query, [user_id, 'purchased']);
    //execute pending query
    const [pending_rows] = await DBConn.execute(pending_query, [user_id, 'pending']);
    DBConn.end();

    //create lengths object
    const sales_length={
      onsale_length: onsale_rows.length,
      purchase_length: purchase_rows.length,
      pending_length: pending_rows.length
    };

    console.log("take lehgth "+sales_length.onsale_length);

    if(status =="onsale"){
      if(onsale_rows.length > 0){
        return res.json({status: 200, message: 'Data was successfully fetched', 
        onsale_crops: onsale_rows, sales_length});
      }
      else{
        return res.json({status: 400, message: 'Data not found', 
        onsale_crops: onsale_rows, sales_length});
      }
    }
    if(status == "pending"){
      if(pending_rows.length > 0){
        return res.json({status: 200, message:"Data was successfully fetched",
        pending_crops:pending_rows, sales_length});
      }
      else{
        return res.json({status: 400, message:"Data inot found",
        pending_crops:pending_rows, sales_length});
      }
    }
    else{
      if(purchase_rows.length > 0){
        return res.json({status: 200, message:"Data was successfully fetched", 
        purchased_crops:purchase_rows, sales_length});
      }
      else{
        return res.json({status: 400, message:"Data not found", 
        purchased_crops:purchase_rows, sales_length});
      }
    }
  }
  catch(e){
    console.log("err during fetching crops "+e);
  }

});

app.post('/get_crops_purchases',upload_image.single('user_photo'), async (req , res)=>{
  try{
    //destructure req
    const {user_id, status} = await req.body;
    console.log('user_id '+user_id+' status '+status)
    //fetch query
    const DBConn = await mysql.createConnection(dbConfig);
    const purchased_query = `SELECT crops_orders.*, 
                                crops.crop_name, crops.unit,crop_photo, 
                                users.user_fname, users.user_lname, users.user_location 
                                FROM crops_orders 
                                JOIN crops ON 
                                crops_orders.ordered_crop_id = crops.id
                                JOIN users ON
                                crops.seller_id = users.id 
                                WHERE crops_orders.buyer_id =? AND crops_orders.deleted_at IS NULL AND 
                                crops_orders.status =?`;

    const pending_query = `SELECT crops_orders.*, 
                                crops.crop_name, crops.unit,crop_photo,
                                users.user_fname, users.user_lname, users.user_location 
                                FROM crops_orders 
                                JOIN crops ON 
                                crops_orders.ordered_crop_id = crops.id
                                JOIN users ON
                                crops.seller_id = users.id 
                                WHERE crops_orders.buyer_id =? AND crops_orders.deleted_at IS NULL AND 
                                crops_orders.status =?`;

    const onsale_query= `SELECT crops.*,
                                users.user_fname, users.user_lname, users.user_location
                                FROM crops
                                JOIN users ON crops.seller_id = users.id
                                WHERE crops.deleted_at IS NULL AND seller_id != ?`;
    //execute onsale query
    const [onsale_rows] = await DBConn.execute(onsale_query, [user_id]);
    //execute purchased query
    const [purchase_rows] = await DBConn.execute(purchased_query, [user_id, 'purchased']);
    //execute pending query
    const [pending_rows] = await DBConn.execute(pending_query, [user_id, 'pending']);
    DBConn.end();

    //create lengths object
    const sales_length={
      onsale_length: onsale_rows.length,
      purchase_length: purchase_rows.length,
      pending_length: pending_rows.length
    };

    if(status =="onsale"){
      if(onsale_rows.length > 0){
        console.log("sales_length when onsale "+sales_length.purchase_length+sales_length.pending_length);
        return res.json({status: 200, message: 'Data was successfully fetched', 
        onsale_crops: onsale_rows, sales_length});
      }
      else{
        return res.json({status: 400, message: 'Data not found', 
        onsale_crops: onsale_rows, sales_length});
      }
    }
    if(status == "pending"){
      if(pending_rows.length > 0){
        console.log("sales_length when onsale "+sales_length.purchase_length+sales_length.pending_length);
        return res.json({status: 200, message:"Data was successfully fetched",
        pending_crops:pending_rows, sales_length});
      }
      else{
        return res.json({status: 400, message:"Data not found",
        pending_crops:pending_rows, sales_length});
      }
    }
    else{
      if(purchase_rows.length > 0){
        return res.json({status: 200, message:"Data was successfully fetched", 
        purchased_crops:purchase_rows, sales_length});
      }
      else{
        return res.json({status: 400, message:"Data not found", 
        purchased_crops:purchase_rows, sales_length});
      }
    }
  }
  catch(e){
    console.log("err during fetching crops "+e);
  }

});

app.post('/make_crops_order', upload_image.single('user_photo'), async (req, res)=>{
  try{      
    //destructure inputs
    const { paid_amount, public_id, buyer_id, price_per_minimum_sellable_quantity,
      status, purchase_receipt, ordered_crop_id, ordered_crop_quantity, total_quantity} = req.body;

    console.log("body :"+ JSON.stringify(req.body));
    const query= `INSERT INTO crops_orders(public_id, status, buyer_id, ordered_crop_id, 
                  ordered_crop_quantity, paid_amount, purchase_receipt) VALUES(?,?,?,?,?,?,?)`;
    const updateQuery =  `UPDATE crops SET total_quantity=? WHERE id=?`;  
    const DBConn = await mysql.createConnection(dbConfig);

    //insert into database
    if(paid_amount % price_per_minimum_sellable_quantity != 0){
      return res.json({status: 500, message: 'Requested crop quantity is not valid'});
    }

    //update total_quantity in crops table
    /* 
      const new_total_quantity = Number(total_quantity) - Number(ordered_crop_quantity);
      console.log("new quantity :"+new_total_quantity+" crops_row_id :"+ordered_crop_id);
      await DBConn.execute(updateQuery, [new_total_quantity, ordered_crop_id]); 
    */
    
    //send data in DB
    const rows = await DBConn.execute(query, 
      [public_id, status, buyer_id, ordered_crop_id, ordered_crop_quantity, 
        paid_amount, purchase_receipt]
    );
    DBConn.end();

    if(rows){
      return res.json({status: 200, message: 'Crop order has successfully created'});
    }
    else{
      return res.json({status: 500, message: 'Crop order is not created'});
    }
  }
  catch(e){
   console.log("catched err is "+e) 
  }
});

app.post('/remove_crop_selected_row', upload_image.single('user_photo'), async (req, res)=>{
  try{
    const {shownData} = req.body.shownData;
    const row_id = req?.body?.row_id;
    const mySQLConn = await mysql.createConnection(dbConfig);
    const query= `DELETE FROM crops WHERE id=?`;
    const query2 = 'DELETE FROM crops_orders WHERE id=?';
    await mySQLConn.execute(shownData =='onsale' ? query : query2, [row_id]);
    return res.json({status:200, message:"Row was successfully deleted"});
  }
  catch(err){
    return res.json({status:500, message:"Catched error is "+err});
  }
});

/*
  ***************************** RESOURCES ROUTES *********************************  
*/
app.post('/get_resources_sales', upload_image.single('resource_photo'), async(req, res)=>{

  try{
    const {status, user_id} = req.body;
    const onsale_query = ` SELECT resources.*,
                            users.user_fname, users.user_lname, users.user_location
                            FROM resources
                            JOIN users ON resources.seller_id = users.id
                            WHERE resources.deleted_at IS NULL AND 
                            resources.seller_id =?`;

    const purchased_query = ` SELECT resources_orders.*,
      resources.resource_name, resources.resource_photo, resources.unit,resources.seller_id,
      users.user_fname, users.user_lname, users.user_location 
      FROM resources_orders 
      JOIN resources ON 
      resources_orders.ordered_resource_id = resources.id
      JOIN users ON
      resources.seller_id = users.id 
      WHERE resources.seller_id =? AND resources_orders.deleted_at IS NULL AND 
      resources_orders.status =?`;

    const pending_query = ` SELECT resources_orders.*,
      resources.resource_name, resources.resource_photo, resources.unit,resources.seller_id,
      users.user_fname, users.user_lname, users.user_location 
      FROM resources_orders 
      JOIN resources ON 
      resources_orders.ordered_resource_id = resources.id
      JOIN users ON
      resources.seller_id = users.id 
      WHERE resources.seller_id =? AND resources_orders.deleted_at IS NULL AND 
      resources_orders.status =?`;

    const mysqlConn = await mysql.createConnection(dbConfig);

    const [onsale_row] = await mysqlConn.execute(onsale_query,[user_id]);
    const [pending_row] = await mysqlConn.execute(pending_query,[user_id, 'pending']);
    const [purchased_row] = await mysqlConn.execute(purchased_query,[user_id, 'purchased']);
    mysqlConn.end();
    const resources = status == 'onsale' ? onsale_row : 
    status == 'pending' ? pending_row : purchased_row

    return res.json({
      status:200, 
      message:"resources data was successfully fetched",
      resources_length:{
        onsale_length: onsale_row.length, 
        pending_length: pending_row.length, 
        purchased_length: purchased_row.length
      },
      resources
    });
  }
  catch(error){
    console.log("catched error is "+error);
  }
});

app.post('/upload_resources_for_sale', upload_image.single('resource_photo'), async(req, res)=>{

  try{
    const {
      seller_id,
      resource_name,
      unit,
      total_quantity,
      minimum_sellable_quantity,
      price_per_minimum_sellable_quantity,
      description,
      edit_mode,
      row_id
    } = req.body;

    console.log("Req body is "+JSON.stringify(req.body));
    console.log("edit_mode "+edit_mode);

    //validate Inputs
    if(!/^[\d]+$/.test(seller_id) ){
      return res.json({status: 403, message: 'Seller Id  is not valid'});
    }
    if(!/^[\w\s]+$/.test(resource_name)){
      return res.json({status: 403, message: `resource name must include only 
      letters, underscore and white-spaces`});
    }
    if(!/^[\d]+$/.test(Number(total_quantity))){
      return res.json({status: 403, message: `Total quantity can be either
      integer or float -backend `+total_quantity});
    }
    if(!/^[\d]+$/.test(Number(price_per_minimum_sellable_quantity))){
      return res.json({status: 403, message: `Price should be either float 
      or integer`});
    }
    if(/^[<>/\\*&]+$/.test(description)){
     return res.json({status: 403, message: `You cannot use tags (< or >), 
      slashes( / or \), start (*) and & special characters`}) 
    }

    // Access filename
    const photo_name = req.file?.filename || null;

    // Process to save to MySQL DB
    const connection = await mysql.createConnection(dbConfig);

    const insertQuery = `
      INSERT INTO resources 
      (seller_id, resource_name, unit, minimum_sellable_quantity, total_quantity, 
      price_per_minimum_sellable_quantity, description, resource_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const updateQuery = `UPDATE resources SET seller_id=?, resource_name=?, unit=?, 
    minimum_sellable_quantity=?, total_quantity=?, 
    price_per_minimum_sellable_quantity=?, description=?, resource_photo=? WHERE id=?`;

    if(edit_mode == 'true'){
      console.log("data updated successfully");
      await connection.execute(updateQuery, [
        seller_id, 
        resource_name, 
        unit, 
        minimum_sellable_quantity, 
        total_quantity, 
        price_per_minimum_sellable_quantity,
        description, 
        photo_name, 
        row_id
      ]);
      res.json({ status:200, message: 'resource updated successfully!' });
    }
    else{
      console.log("data inserted successfully");
      await connection.execute(insertQuery, [
        seller_id,
        resource_name,
        unit,
        minimum_sellable_quantity,
        total_quantity,
        price_per_minimum_sellable_quantity,
        description,
        photo_name
      ]);
      res.json({ status:200, message: 'resource inserted successfully!' });
    }

    await connection.end();

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }

});

app.post('/get_resources_purchases', upload_image.single('resource_page'), async (req, res)=>{
  try{
    //destructure req
    const {user_id, status} = await req.body;
    console.log('user_id '+user_id+' status '+status)
    //fetch query
    const DBConn = await mysql.createConnection(dbConfig);
    const purchased_query = `SELECT resources_orders.*, 
                                resources.resource_name, resources.unit,resource_photo, 
                                users.user_fname, users.user_lname, users.user_location 
                                FROM resources_orders 
                                JOIN resources ON 
                                resources_orders.ordered_resource_id = resources.id
                                JOIN users ON
                                resources.seller_id = users.id 
                                WHERE resources_orders.buyer_id =? AND 
                                resources_orders.deleted_at IS NULL AND 
                                resources_orders.status =?`;

    const pending_query = `SELECT resources_orders.*, 
                                resources.resource_name, resources.unit,resource_photo,
                                users.user_fname, users.user_lname, users.user_location 
                                FROM resources_orders 
                                JOIN resources ON 
                                resources_orders.ordered_resource_id = resources.id
                                JOIN users ON
                                resources.seller_id = users.id 
                                WHERE resources_orders.buyer_id =? AND 
                                resources_orders.deleted_at IS NULL AND 
                                resources_orders.status =?`;

    const onsale_query= `SELECT resources.*,
                                users.user_fname, users.user_lname, users.user_location
                                FROM resources
                                JOIN users ON resources.seller_id = users.id
                                WHERE resources.deleted_at IS NULL AND seller_id != ?`;
    //execute onsale query
    const [onsale_rows] = await DBConn.execute(onsale_query, [user_id]);
    //execute purchased query
    const [purchase_rows] = await DBConn.execute(purchased_query, [user_id, 'purchased']);
    //execute pending query
    const [pending_rows] = await DBConn.execute(pending_query, [user_id, 'pending']);
    DBConn.end();

    //send response
    res.json({
      status: 200, 
      message: "Data successfully fetched", 
      resources_length:{
        onsale_length: onsale_rows.length, 
        purchase_length: purchase_rows.length,
        pending_length: pending_rows.length,
      },
      resources : status == "onsale" ? onsale_rows :
                  status == 'pending' ? pending_rows : purchase_rows
    });
  }
  catch(err){
    res.json("catched error is "+err);
  }
});

app.post('/make_resources_order', upload_image.single('user_photo'), async (req, res)=>{
  try{      
    //destructure inputs
    const { paid_amount, public_id, buyer_id, price_per_minimum_sellable_quantity,
      status, purchase_receipt, ordered_resource_id, ordered_resource_quantity, total_quantity} = req.body;

    console.log("body :"+ JSON.stringify(req.body));
    const query= `INSERT INTO resources_orders(public_id, status, buyer_id, ordered_resource_id, 
                  ordered_resource_quantity, paid_amount, purchase_receipt) VALUES(?,?,?,?,?,?,?)`;
    const updateQuery =  `UPDATE resources SET total_quantity=? WHERE id=?`;  
    const DBConn = await mysql.createConnection(dbConfig);

    //insert into database
    if(paid_amount % price_per_minimum_sellable_quantity != 0){
      return res.json({status: 500, message: 'Requested resource quantity is not valid'});
    }

    //update total_quantity in resources table
    /* 
      const new_total_quantity = Number(total_quantity) - Number(ordered_resource_quantity);
      console.log("new quantity :"+new_total_quantity+" resources_row_id :"+ordered_resource_id);
      await DBConn.execute(updateQuery, [new_total_quantity, ordered_resource_id]); 
    */
    
    //send data in DB
    const rows = await DBConn.execute(query, 
      [public_id, status, buyer_id, ordered_resource_id, ordered_resource_quantity, 
        paid_amount, purchase_receipt]
    );
    DBConn.end();

    if(rows){
      return res.json({status: 200, message: 'resource order has successfully created'});
    }
    else{
      return res.json({status: 500, message: 'resource order is not created'});
    }
  }
  catch(e){
   console.log("catched err is "+e) 
  }
});

app.post('/remove_resource_selected_row', upload_image.single('user_photo'), async (req, res)=>{
  try{
    const {shownData} = req?.body;
    const {row_id} = req?.body;
    console.log("shownData is "+shownData+"row_id is "+ row_id);
    const mySQLConn = await mysql.createConnection(dbConfig);
    const query= `DELETE FROM resources WHERE id=?`;
    const query2 = 'DELETE FROM resources_orders WHERE id=?';
    await mySQLConn.execute(shownData =='onsale' ? query : query2, [row_id]);
    return res.json({status:200, message:"Row was successfully deleted"});
  }
  catch(err){
    return res.json({status:500, message:"Catched error is "+err});
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});