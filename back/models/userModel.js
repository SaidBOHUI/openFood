const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    firstName: { 
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Entrez une adresse email valide s'il vous plait",
        },
    },
    password: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(value) {
                const hasNumber = /\d/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasUppercase = /[A-Z]/.test(value);
                return hasNumber && hasLowercase && hasUppercase;
            },
            message: "Le mot de passe doit contenir au moins un nombre, une lettre minuscule et une lettre majuscule",
        },
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    // Add a field to store saved substitutes
    savedSubstitutes: [{
        originalProduct: String,
        alternatives: [{
            type: String,
            ref: 'Product'
        }]
    }],
}, {
    timestamps: true
});

const Users = model('User', userSchema);
module.exports = Users;
