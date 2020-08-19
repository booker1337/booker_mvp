const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidatorPlugin = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

userSchema.plugin(uniqueValidatorPlugin);

userSchema.pre('save', function (next) {
	if(!this.isModified('password')) return next();

	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

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