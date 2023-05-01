const mongoose = require('mongoose')

mongoose.connect(process.env.DB_LINK)
    .then (result => console.log('connect to DB'))
    .catch (err => console.log(err)) 