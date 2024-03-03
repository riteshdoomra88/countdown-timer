'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Timer = new Schema({
    timerTime: { 
        type: Number,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    stopTime: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })
module.exports = Timer;