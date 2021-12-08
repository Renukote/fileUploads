const express = require("express");
const userModel = require('../models/users.model');
const upload = require('../middlewares/uploads')
const router = express.Router();
const fs = require('fs');

router.get("/", async (req, res) => {
    try {
        let users = await userModel.find().lean().exec()
        console.log(users);

        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});


router.post("/", upload.single("profile_pic"), async (req, res) => {
    try {
        let users = await userModel.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        })
        console.log(users);

        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});


router.patch("/:id", upload.single("profile_pic"), async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).lean().exec();
        old_image_path = user.profile_pic;

        let update = await userModel.findByIdAndUpdate(req.params.id, { profile_pic: req.file.path }, { new: true }).lean().exec();
        fs.unlinkSync(old_image_path);

        return res.status(200).send(update);
    } catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).lean().exec();
        image_path = user.profile_pic;

        fs.unlinkSync(image_path);

        let removedUser = await userModel.findByIdAndDelete(req.params.id).lean().exec()

        console.log(image_path);
        console.log(removedUser);
        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});



module.exports = router;