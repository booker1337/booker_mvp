const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidatorPlugin = require('mongoose-unique-validator');

const setEmail = email => {
	if (!email) throw 'Missing Email Field';
	if (!email.match(/.+@.+/)) throw 'Invalid Email';
	return email.toLowerCase();
};

const setUsername = username => {
	if (!username) throw 'Missing Username Field';
	if (!username.match(/^\S{3,}$/)) throw 'Invalid Username';
	return username[0].toUpperCase() + username.slice(1).toLowerCase();
};

const setPassword = password => {
	if (!password) throw 'Missing Password Field';
	// Check if the password is any non-whitespace character over 3 letters
	if (!password.match(/^\S{3,}$/)) throw 'Invalid Password';
	return bcrypt.hashSync(password, 10, (err, hashedPassword) => {
		if (err) throw 'Hashing Error';
		return hashedPassword;
	});
};

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		set: setEmail,
		unique: ['Email is already registered!'],
		required: true,
	},
	username: {
		type: String,
		set: setUsername,
		unique: ['Username is already registered!'],
		required: true,
	},
	password: {
		type: String,
		set: setPassword,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
		required: ['Missing Verification!'],
	},
});

// Ensure the 'unique' fields are actually unique instead of just unique index
userSchema.plugin(uniqueValidatorPlugin);

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	obj.id = obj._id.toJSON();
	delete obj.password;
	delete obj._id;
	delete obj.__v;
	return obj;
};

module.exports = mongoose.model('User', userSchema);