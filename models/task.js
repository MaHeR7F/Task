const mongoose = require("mongoose");

const taskSchema = mongoose.Schema ({
    label: { type: String, required:true},
    description: { type: String, required: true},
    date: {type: String, required: true},
    status:{ type: String, required: false}
});

//exporter le model
module.exports = mongoose.model('Task', taskSchema);