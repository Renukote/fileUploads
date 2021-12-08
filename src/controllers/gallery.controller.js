const express = require('express');
const router = express.Router();
const galleryModel = require('../models/gallery.model');
const upload = require('../middlewares/uploads')
const fs = require('fs');

router.post("/", upload.array('pictures', 5), async (req, res) => {
    try{
        let user = await galleryModel.create({
            pictures: [req.files[0].path, req.files[1].path,req.files[2].path,req.files[3].path,req.files[4].path, ],
            user_id: req.body.user_id
        })

        console.log(user);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(500).send({ message: e.message, status: "failed" });
    }
})


router.get("/", async (req, res) => {
    try{
        let user = await galleryModel.find().lean().exec();

        console.log(user);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(500).send({ message: e.message, status: "failed" });
    }
})

router.delete("/:id", async (req, res) => {
    try{
        let user = await galleryModel.findById(req.params.id).lean().exec();
        let pictures = user.pictures;

        for(el of pictures){
            fs.unlinkSync(el)
        }

        console.log(user);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(500).send({ message: e.message, status: "failed" });
    }
})

module.exports = router;