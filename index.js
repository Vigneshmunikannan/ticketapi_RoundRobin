const express = require('express')
const app = express()
const people = require('./data')
const uuid = require('uuid')
let indexToassign = 0;

app.use(express.json())
app.post("/ticket", (req, res) => {
    const { user_id, issue } = req.body;
    if (!user_id || !issue) {
        console.log("Provide all data")
        return res.status(400).json({
            success: false,
            message: "Provide all data",
        })
    }

    let currentTicketId = uuid.v4();
    people[indexToassign].tickets.push({
        ticket_Id: currentTicketId,
        user_id:user_id,
        issue: issue
    })
    indexToassign =(indexToassign +1)%people.length;
    res.json({
        "message": "ticket assigned successfully",
        "success": true,
        "data": {
            "ticket_id": currentTicketId,
            "assigned_to": people[indexToassign].id
        }
    })
})


app.get('/people',(req,res)=>{
    res.status(200).json({people})
})
app.listen(5000, () => {
    console.log("listening on port")
})