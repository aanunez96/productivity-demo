const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    tittle: {type: Schema.Types.String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    classification: {type: String, enum: ['short', 'medium', 'long', 'customized'], default:'customized', required: true},
    description: {type: String},
    delete: {type: Schema.Types.Boolean, default: false, required: true},
    date:  {type: Schema.Types.String, required: true},
    duration: {type: Schema.Number, },
},);

module.exports = mongoose.model('Task', TaskSchema, 'task');