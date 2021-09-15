const { Schema, model } = require("mongoose");

const schema = new Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = model("Figures", schema);