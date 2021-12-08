const { Schema, model } = require('mongoose');

const galleryModel = new Schema({
    pictures : [{ type: String, required: true }],
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true }
},
{
    versionKey : false,
    timestamps: true
})

module.exports = model("gallery", galleryModel);