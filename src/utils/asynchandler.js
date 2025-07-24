// this async handler create a method and export this 


// const asynchandler = (fn) => {

//     return async ( req, res, next) => {
//         try {
//             await fn(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500)
//                 .json({ success: false, message: error.message })
//         }
//     }




// }

// this above entire code can we written as promises

const asynchandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => { next(err) })

    }
}

// explanation : fn here is the function that we pass to async handler function that  returns a function so which is when called it takes the parameter req,res,next and in this we can handel either promise  or Async await 























export { asynchandler }