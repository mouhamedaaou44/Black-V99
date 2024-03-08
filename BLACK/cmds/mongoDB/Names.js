const m = require('mongoose');
const Schema = m.Schema
const usersSchema = new Schema({
    array: Array,
    array2: Array
});
const UserName = m.model("Username", usersSchema);

module.exports = UserName;
