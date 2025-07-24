const express = require('express')
const app = express()
const port = 3000


app.use(express.static("public"))// so this is used to serve static files which are always placed inside public


app.get('/home', (req, res) => {
    res.type("html")
    res.send(`hello this is home`)
})
app.get('/home/:slug', (req, res) => {
    res.type("html")
    console.log(req.params);// by this we can get the parameters and query 
    console.log(req.query);// by this we can get the parameters and query

    res.send(`hello this is ${req.params.slug}`)
})

app.get('/home/:slug/:id', (req, res) => {
    res.type("html")
    res.send(`<h1>Hello home </h1> this is ${req.params.slug} and id is ${req.params.id}`)
})

// query object






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
