const m = require('mongoose');
const Schema = m.Schema
const usersSchema = new Schema({
    array: Array,
    array2: Array
});
const User = m.model("User", usersSchema);

module.exports = User;