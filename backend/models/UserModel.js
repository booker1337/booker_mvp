const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidatorPlugin = require('mongoose-unique-validator');

const setEmail = email => {
	if (!email.match(/.+@.+/)) throw 'Invalid Email';
	return email;
};

const setUsername = username => {
	if (!username.match(/^\S{3,}$/)) throw 'Invalid Username';
	return username;
};


const setPassword = password => {
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
		unique: ['Email is already taken!'],
		required: ['Missing Email Field'],
	},
	username: {
		type: String,
		set: setUsername,
		unique: ['Username is already taken!'],
		required: ['Missing Username Field!'],
	},
	password: {
		type: String,
		set: setPassword,
		required: ['Missing Password Field!'],
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
	var obj = this.toObject();
	delete obj.password;
	return obj;
};

userSchema.methods.validatePassword = function (password, cb) {
	bcrypt.compare(password, this.password, (err, res) => {
		if(err) return cb(err);
		cb(null, res);
	});
};

module.exports = mongoose.model('User', userSchema);