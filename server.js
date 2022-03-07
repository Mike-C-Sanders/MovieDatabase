const { application } = require('express');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'))

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Mrs.robinson1',
        database: 'movies_db'
    },

    console.log('Connected to the movies_db database')
);

//route for getting the movies
app.get('/api/movies', (req, res) => {

    const sqlString = `SELECT id, movie_name as movie FROM movies`;
    db.query(sqlString, (err, results) =>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.json(results);
        }
    })
})

//route for adding a movie
app.post('/api/add-movie', (req, res) =>{
    const sqlString = `INSERT INTO movies (movie_name) VALUES (?)`;
    const movieAdded = (req.body.movie_name);

    db.query(sqlString, movieAdded, (err, results) =>{
        if(err){
            console.log(err);
            return;
        }else{
            console.log(`You've successfully added ${movieAdded} to your database`)
        }
    })

});

//get reviews from database
app.get('/api/reviews', (req, res) =>{
    const sqlString = `SELECT id, movie_review FROM reviews`;
    db.query(sqlString, (err, results) =>{
        if(err){
            console.log(err);
        }else{
            res.json(results);
        }
    })
})

//route to update a review
app.put('/api/update-review', (req, res) =>{
    const sqlString = `UPDATE reviews SET review = ? WHERE id = ?`;
    const updatedReview = req.body.review;
    const fromID = req.body.id;

    db.query(sqlString, [updatedReview, fromID], (err, results) =>{
        if(err){
            console.log(err);
        }else {
            console.log(results);
        }
    })
})

//route to delete a review
app.delete('/api/movie/:id', (req, res) =>{
    const sqlString = `DELETE FROM movies WHERE id =?`;
    const deletedMovie = req.params.id;

    db.query(sqlString, deletedMovie, (err, results) =>{
        if(err){
            console.log(err);
        }else{
            console.log(results.affectedRows);
        }
    })

})

//404 routing error
app.use((res, req) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server is successfully connected to http://localhost: ${PORT}`);
})