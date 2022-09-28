const User = require("../models/user.model");

async function getAllUsers(req, res) {
    // isi fungsi untuk mendapatkan semua user
    try {
        const user = await User.find();
        if (user.length <= 0) {
            return res.status(404).json({
                message: "tidak ada user",
            });
        }
        res.status(200).json({
            message: "menampilkan semua user",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error,
        });
    }

    // jangan mengubah kode di luar blok
}

async function getOneUser(req, res) {
    // isi fungsi untuk mendapatkan satu user
    const id = req.params.id;
    let user = null;
    try {
        user = await User.findOne({ userId: id });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    if (user == null) {
        return res.status(404).json({
            message: "user tidak ditemukan",
        });
    }

    res.status(200).json();

    // jangan mengubah kode di luar blok
}

async function createUser(req, res) {
    // isi fungsi untuk membuat user baru
    const password = req.body.password;

    if (password.length < 8) {
        return res.status(400).json({
            message: "password terlalu pendek",
        });
    }
    const newUser = new User({
        userId: req.body.user_id || req.body.userId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const saveUser = await newUser.save();

        res.status(200).json({
            message: "membuat user baru",
            user: saveUser,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    // jangan mengubah kode di luar blok
}

async function deleteAllUser(req, res) {
    try {
        const result = await User.deleteMany({});

        return res.status(200).json({
            message: "menghapus semua user",
            result,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    deleteAllUser,
};
