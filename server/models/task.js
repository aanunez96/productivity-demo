const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {type: Schema.Types.String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    classification: {type: String, enum: ['short', 'medium', 'long', 'customized'], default:'customized', required: true},
    description: {type: String},
    status: {type: Schema.Types.String, enum: ['pending', 'done'], default:'pending', required: true},
    isDelete: {type: Schema.Types.Boolean, default: false, required: true},
    creationDate: {type: Schema.Types.Date, required: true},
    realizationDate: {type: Schema.Types.Date},
    duration: {type: Schema.Types.Number ,required: true},
    progress: {type: Schema.Types.Number, default: 0},
},);

module.exports = mongoose.model('Task', TaskSchema, 'task');