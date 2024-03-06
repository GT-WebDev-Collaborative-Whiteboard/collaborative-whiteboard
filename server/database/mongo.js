const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/whiteboard")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
});

const schema = new mongoose.Schema({
    name:{
        "type": "string",
        required: true
    }
});

const collection = new mongoose.model("wb", schema);


