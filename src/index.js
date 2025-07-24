
import dotenv from "dotenv"
import ConnectDb from './db/db.js'
import { app } from "./app.js"


dotenv.config({
    path: './.env'
})





const port = process.env.PORT || 5000


// in the then part our application listen on port with the use db connection 

ConnectDb().then(() => { //db connection ke through app listen karana start karegi 
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);

    })
}).catch((err) => {
    console.log(`Mongo Db connection error: ${err}`);

})














































































// app.use(express.json())


// //here it accepts the request type
// app.post("/name/:name", (req, res) => {
//     res.type("text")
//     res.send(`the value get from params is ${req.params.name} `)
//     console.log(req.query)

// })



// const user = []
// let userId = 1

// // crud operations

// //create operation
// app.post("/user", (req, res) => {
//     const { name, city, email } = req.body // extracting the data from the req body

//     const newuser = { id: userId++, name, city, email }
//     user.push(newuser)
//     res.status(200).send(user)


// })

// //read operation based on id
// app.get('/user/:id', (req, res) => {
//     const filtereduser = user.find((userinfo) => userinfo.id === parseInt(req.params.id))
//     res.status(200).send(filtereduser)

// })


// //update operation

// app.get('/user/update/:id', (req, res) => {
//     const findeduser = user.find((userdata) => userdata.id === parseInt(req.params.id))

//     if (!findeduser) {
//         res.status(404).send(`index to be updated is not found`)
//     }

//     const { name, email, address } = req.params
//     findeduser.name = name
//     findeduser.email = email
//     findeduser.address = address

//     res.status(200).send(findeduser)




// })


// //delete operation

// app.delete("/user/delete/:id", (req, res) => {
//     const filtereduser = user.filter((userinfo) => {
//         return userinfo.id === parseInt(req.params.id)
//     })
//     if (filtereduser.length === 0) {
//         res.status(404).send(`item not found to be deleted`)
//     }
//     res.status(200).send(filtereduser)


// })














// here the app listen to a port and along with the callback provided