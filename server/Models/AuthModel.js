const mongoose = require('mongoose');

const AuthModel = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: String, default: Date.now(), required: true },
    isDeleted: { type: Boolean, default: false, required: true },
});
module.exports = mongoose.model('user', AuthModel, 'Users');