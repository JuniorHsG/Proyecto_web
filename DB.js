const moongose = require('mongoose')

const MONGO_URI=process.env.DB;

moongose.connect(MONGO_URI)
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));