const express = require('express')
const mongoose = require("mongoose") 
const routes = require("./router")
const cors = require('cors')
const app = express()

app.use(cors({
			origin: "*",
		}))
mongoose
	.connect("mongodb://127.0.0.1:27017/floorManager", { useNewUrlParser: true })
	.then(() => {
        app.use(express.json())
        app.use('/', routes)
		
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})