const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express()
app.use(cors())
// app.use(express.json())
app.use(bodyParser.json());

// used for images
const moment = require("moment")
const multer = require('multer');
const path = require('path');


// Configure multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// used for login and signup
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Use a secure, environment-stored key




//create db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "animals"

})

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// ***************************************************************************************************************



// Fetch user profile data by ID

app.get('/getUsersId', (req, res) => {
    const query = 'SELECT MAX(id) AS max_id FROM users_profile';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      const maxId = results[0].max_id;
      res.json({ max_id: maxId });
    });
  });

  // Endpoint to check if username exists
app.post('/check-username', (req, res) => {
    const { usernameStore	 } = req.body;
    const sql = 'SELECT * FROM users_profile WHERE usernameStore = ? ';
    db.query(sql, [usernameStore], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send({ message: 'Login successful' });
    });
    
  });

app.post('/add-user', upload.single('image'), (req, res) => {
    const { Fname, Lname, Address, Contact, AnimalsLover, Gender, Birthday, Biodata, usernameStore } = req.body;
    const image = req.file ? req.file.buffer : null; // Get the image buffer

    const sql = "INSERT INTO users_profile (Fname, Lname, Address, Contact, AnimalsLover, Gender, Birthday, Biodata,usernameStore, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [ Fname, Lname, Address, Contact, AnimalsLover, Gender, Birthday, Biodata,usernameStore, image], (err, result) => {
        if (err) throw err;
        res.send({ message: 'User added', id: result.insertId });
    });
});


// Update user profile data by ID
app.put("/update-user/:id", (req, res) => {
    const userId = req.params.id;
    const { Fname, Lname, Address, Contact, AnimalsLover, Gender, Birthday, Biodata, image } = req.body;
    const sql = "UPDATE users_profile SET Fname = ?, Lname = ?, Address = ?, Contact = ?, AnimalsLover = ?, Gender = ?, Birthday = ?, Biodata = ?, image = ? WHERE Id = ?";
    db.query(sql, [Fname, Lname, Address, Contact, AnimalsLover, Gender, Birthday, Biodata, image, userId], (err, result) => {
        if (err) return res.status(500).send("Error updating user");
        res.send("User updated successfully");
    });
});











// ********** used for animals ######################
// Animals id generated
app.get('/getAnimalsId', (req, res) => {
    const query = 'SELECT MAX(id) AS max_id FROM animals_information';
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      const maxId = results[0].max_id;
      res.json({ max_id: maxId });
    });
  });


// Route to insert data
app.post('/api/animals_insert', upload.single('image'), (req, res) => {
    const { Name, Scientific_Name, Classification, Size, Weight, Skin_Color, Price, Others_Info } = req.body;
    const image = req.file ? req.file.buffer : null; // Get the image buffer

    const sql = 'INSERT INTO animals_information (Name, Scientific_Name, Classification, Size, Weight, Skin_Color, Price, Others_Info, image) VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)';
    db.query(sql, [Name, Scientific_Name, Classification, Size, Weight, Skin_Color, Price, Others_Info, image], (err, result) => {
        if (err) throw err;
        res.send({ message: 'User added', id: result.insertId });
    });
});

// Route to get user by Animal ID and Animal Name
app.get('/animals_search', (req, res) => {
    const { id, Name } = req.query;
  
    let query = 'SELECT * FROM animals_information';
    let queryParams = [];
  
    if (id) {
      query += ' WHERE id = ?';
      queryParams.push(id);
    } else if (Name) {
      query += ' WHERE Name = ?';
      queryParams.push(Name);
    }
  
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
           // Convert image to Base64 for each result
    const modifiedResults = results.map(result => ({
        ...result,
        image: result.image ? result.image.toString('base64') : null,
      }));
  
      res.json(modifiedResults);
    });
});



// Route to update user by ID
app.put('/animals_update/:id', multer().single('image'), (req, res) => {


const { id } = req.params;
  const data = req.body;

  let query = 'UPDATE animals_information SET ';
  const fields = [];
  const values = [];

  Object.keys(data).forEach((key) => {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  });

  query += fields.join(', ') + ' WHERE id = ?';
  values.push(id);

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Data updated successfully' });
  });
});

// Endpoint to delete an animal by ID
app.delete('/animalsDelete/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM animals_information WHERE id = ?';
  
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Animal not found' });
      }
  
      res.json({ message: 'Animal deleted successfully' });
    });
  });





// ---------------------------------  ADmin
// Route to get total user count
app.get('/api/user-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM users_profile'; // Replace 'users' with your table name
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
    } else {
      const userCount = results[0].count;
      res.json({ count: userCount });
    }
  });
});

app.get('/api/animal-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM animals_information'; // Replace 'users' with your table name
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
    } else {
      const userCount = results[0].count;
      res.json({ count: userCount });
    }
  });
});

// Route to fetch products display
app.get('/productsDis', (req, res) => {
  db.query('SELECT * FROM animals_information ORDER BY id DESC', (err, results) => {
      if (err) throw err;
      res.json(results.map(row => ({
          id: row.id,
          Name: row.Name,
          Scientific_Name: row.Scientific_Name,
          Classification: row.Classification,
          Size: row.Size,
          Weight: row.Weight,
          Skin_Color: row.Skin_Color,
          Price: row.Price,
          Others_Info: row.Others_Info,
          image: Buffer.from(row.image).toString('base64'),
          // mimeType: row.mimeType
      })));
  });
});







































// Register User
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ message: 'Username already exists' });
            }
            return res.status(500).send('User registration failed');
        }
        res.status(201).send({ message: 'User registered successfully' });
    });
});

// // Login User
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send({ message: 'Login successful' });
    });
});

// Fetch User Data
app.get('/userdata/:username', (req, res) => {
    const { username } = req.params;
    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results[0] || null); // If no data, return null
    });
})











// ***************************************************************************************************************
app.get('/', (req, res) => {
    return res.json("From Backend Jobayed hossain")
})

app.listen(8082, () => {
    console.log("listening")
})



