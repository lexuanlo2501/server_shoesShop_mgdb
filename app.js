const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const http = require("http")
const axios = require("axios")

const test = require(__dirname+"/test.js")


const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    test.test2()

    // CALL API
    // https.get("https://pokeapi.co/api/v2/pokemon/ditto", (response) => {
    //     console.log(response)
    // })

    // http.get("http://localhost:4000/cardsData", (response) => {
    //     console.log(response)
    // })

  

    res.sendFile(__dirname+"/signup.html")
    
})


app.post("/", (req, res) => {
    const firstName = req.body.fName || "";
    const lastName = req.body.lName || "";
    const email = req.body.email || "";

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/f23deb7ec2"
    const options = {
        method: "POST",
        auth: "Thang:842a2077e83590ca9bbb385749b0a4d8-us21"
    }

    const request = https.request(url, options, (response) => {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

    console.log(firstName, lastName, email)

})


app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.post("/success", (req, res) => {
    res.redirect("/")
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})

// api key
// 842a2077e83590ca9bbb385749b0a4d8-us21

// list id 
// f23deb7ec2