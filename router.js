const express = require("express")
const Customer = require("./models/Customer") // new
const Session = require("./models/Session")
const moment = require("moment")
const router = express.Router()


router.get("/health", async (req, res) => {
	console.log('this is the release branch ddude')
	res.send('ok')
})
//creates new customer
router.post("/:session/customers", async (req, res) => {
    console.log(req.body.number)
	const customer = new Customer({
        session: req.params.session,
		information: req.body.information,
		number: req.body.number,
		time: moment().format()

	})
	await customer.save()
	res.send(customer)
})

router.delete("/customers/:id", async (req, res) => {
	try {
		await Customer.deleteOne({ _id: req.params.id })
		res.status(200).send()
	} catch {
		res.status(404)
		res.send({ error: "customer doesn't exist!" })
	}
})

//get all customer info based on session id
router.get("/:session/customers/", async (req, res) => {
	const post = await Customer.find({session: req.params.session})
	console.log('here')
	res.send(post)
})

//get specific customer info based on id
router.get("/:session/customers/:id", async (req, res) => {
	const post = await Customer.findOne({ _id: req.params.id, session: req.params.session})
	res.send(post)
})


//create new session
router.post("/session", async (req, res) => {
	var dateToday = moment().format("DD/MM/YYYY HH:mm")
	const session = new Session({
		time: dateToday,
		guid: req.body.guid
	})
	await session.save()
	res.send({_id: session._id,
	guid: session.guid})
	console.log(session._id)
	console.log(session.guid)
})



module.exports = router