const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // isi skema di bawah ini
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // jangan mengubah kode di luar blok
});

module.exports = mongoose.model("users", userSchema);
