const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
        },
        userName: {
            type: String,
        },
        postId: {
            type: String,
        } ,
        parentId: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
