const express = require('express')
const app = express()
const mongoose = require('mongoose')
const md5 = require("md5")
const db = require('./config/db')
const Card = require('./app/models/Card')
const Post = require('./app/models/Post')
const Person = require('./app/models/Person')
const Account = require('./app/models/Account')

const cors = require('cors')

app.use(cors())


// const test = require(__dirname+"/test.js")

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

db.connect()

// mongoose.connect('mongodb+srv://lelolo:0777216047@cluster0.0gmneaz.mongodb.net/')
// mongoose.connection
//     .once('open', function (){
//         console.log('mongoDB running')
//     })
//     .on('error', function (err){
//         console.log(err)
//     })



app.get("/", (req, res, next) => {

    Card.find({})
    .then(cards => res.json(cards))
    .catch(next)


    // res.send("<h1>Hello Nu</h1>")
})

app.get("/posts", (req, res, next) => {
    Post.find({})
    .then(Posts => res.json(Posts))
    .catch(next)

    // add data

    // const post = new Post({
    //     title: "EXPRESS nodeJS",
    //     type: "BE"
    // })
    // post.save()
    console.log(req.body)
})

app.post("/posts", (req, res, next) => {
    const data = req.body
    const newPost = new Post({
        title: data.title,
        type: data.type
    })
    newPost.save()
    res.redirect("/posts")
})

app.delete("/posts/:id", (req, res) => {
    const {id} = req.params
    Post.deleteOne({_id: id})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
    res.redirect("/posts")

})

app.patch("/posts/:id", (req, res) => {
    const {id} = req.params
    const data = req.body

    Post.updateOne({_id: id}, {
        ...data
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
    res.redirect("/posts")

})





// Post.updateOne({_id: "645a88066a2e69f8fc174aee"}, {type: "FE"})
// .then(res => {
//     console.log(res)
// })
// .catch(err => {
//     console.log(err)
// })


// Post.deleteOne({_id:"64688fd2bf5fd787b948df86"})
// .then(res => {
//     console.log(res)
// })
// .catch(err => {
//     console.log(err)
// })


app.get("/people", (req, res, next) => {
    Person.find({})
    .then(people => res.json(people))
    .catch(next)
})

// const newPost = new Post({
//     title: "tailwind css",
//     type: "FE"
// })
// newPost.save()

// const newPerson = new Person({
//     name: "Nu",
//     age: 9,
//     favoritePost: '645a88856a2e69f8fc174aef'
// })
// newPerson.save()

// 
// Person.deleteOne({_id: "646a4499dd462b7764924769"})
// .then(res => {console.log("success:", res)})
// .catch(err => {console.log(err)})



app.get("/contact", (req, res) => {
    res.send("contact me at: .....")
})

app.get("/about", async (_, res) => {
    res.send("my name is Nu")
})

app.get("/hobbies", (_, res) => {
    res.send("<h1>code</h1>")
})

app.get("/calculate", () => {
    
})


// ACCOUNT 
app.get("/accounts", (req, res, next) => {
    Account.find({})
    .then(Accounts => res.json(Accounts))
    .catch(next)

    console.log(req.body)
})

app.post("/accounts", (req, res, next) => {
    // res.setHeader('Content-Type', 'text/plain');

    const data = req.body

    Account.find({accName: data.accName})
    .then(acc => {
        if(acc[0]) {
            res.json({message: "Đã tồn tại tên đăng nhập này", status:false})
            console.log("Đã tồn tại tên đăng nhập này")
        }
        else {
            const newAcc = new Account({
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                accName: data.accName,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender,
                role: data.role,
                lock: false,

            })
            res.json({message: "ok", status:true})

            newAcc.save()
        }
    })
    
    
    // res.redirect("/accounts")
})

app.get("/accounts/:id", (req, res, next) => {
    const {id} = req.params

    Account.find({_id:id})
    .then(Posts => res.json(Posts))
    .catch(next)

    
    console.log(req.body)
})

app.patch("/accounts/:id", (req, res) => {
    const {id} = req.params
    const data = req.body
    console.log(id)
    console.log(data)

    Account.updateOne({_id: id}, {
        ...data
    })
    .then(resp => {
        console.log(resp)
        res.json({message: "success"})

    })
    .catch(err => {
        console.log(err)
        res.json({message: "failed"})

    })
    // res.redirect("/accounts")

})

app.post("/signin", (req, res, next) => {
    const data = req.body
    
    res.setHeader('Content-Type', 'text/plain');
    const test = {
        accName: data.accName, 
        password: md5(data.password),
        status: true,
        role: 'client',
        message: 'success'
    }
    console.log(test)

    Account.find({accName: test.accName, password: test.password})
    .then(Accounts => {
        console.log(Accounts[0])
        if(Accounts[0]) {
            const {password, ...rest} = Accounts[0]
            delete rest["_doc"].password 
            
            res.json({
                status: true,
                message: 'success',
                ...rest["_doc"]
            })
            console.log(...rest["_doc"])
            console.log(true)
        }
        else {
            res.json({message: "su", status: false})
            console.log(false)
        }
    })
    .catch(next)

    // res.json()
    // res.redirect("/test")
})




// // 
// const List = mongoose.model('list', {listName:{type:String, default:""}});
// app.get("/list", (req, res, next) => {
//     List.find({})
//     .then(lists => res.json(lists))
//     .catch(next)

//     console.log(req.body)
// })

// app.get("/:customListName", (req, res) => {
//     const customListName = req.params.customListName

//     List.findOne({listName:customListName})
//     .then(respon => {
//         console.log("respon")
//         console.log(respon)
//         if(!respon) {
//             const list = new List({
//                 listName:customListName
//             })
//             list.save()
//             list.redirect('/'+customListName)
//         }
//         else {
//             res.render("list", {name: respon.name})
//         }
//     })
//     .catch(err => {
       
//         console.log("err find")
//         console.log(err)

//     })

    
//     console.log(customListName)
// })





app.listen(8000, () => {
    console.log('server started on port 8000')
})