const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    isGoogleuser: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false
    },
    role: { type: String, default: 'admin' },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    credits: {
        type: Number,
        default: 0
    }
=======
    isGoogleuser:{
        type:String,
        required: false,
    },
    googleId:{
        type: String,
        required: false
    },
>>>>>>> 98aa6cad518c9e1a5152469123095d5b77b87b67
});
module.exports = mongoose.model('Users', UsersSchema);