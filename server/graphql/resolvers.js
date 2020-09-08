const Task = require('../models/task');
const {accountsServer} = require('.././accounts-js');
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;

const durationForClassification = (classification) => {
    switch (classification) {
        case 'short':
            return 1800;

        case 'medium':
            return 2700;

        case  'long'  :
            return 3600;

        default:
            return 0;
    }
};

const resolvers = {
    Query: {
        tasks: async (_, {userId, classification, isDelete}) => {
            const query = {};
            if (userId) {
                query.owner = new ObjectID(userId);
            }
            if (classification) {
                query.classification = classification;
            }
            if (isDelete) {
                query.isDelete = isDelete;
            }
            const tasks = await Ad.find(query).exec();
            return tasks.map(e => ({...e._doc, owner: accountsServer.findUserById(e.owner)}));
        },
        task: async (_, {adId}) => {
            const task = await Ad.findById(new ObjectID(adId));
            return {...task._doc, owner: accountsServer.findUserById(task.owner)};
        },
        user: async (_, {userId}) => {
            const user = accountsServer.findUserById(userId);
            user._id = user.id;

            return user
        }
    },
    Mutation: {
        async createTask(_, {tittle, owner, description, classification, duration,}) {
            const date = new Date();
            const isDelete = false;
            const task = new Task({
                tittle,
                owner,
                description,
                classification,
                duration: (duration) ? duration : durationForClassification(classification),
                date,
                isDelete
            });

            task.save();
            return task;
        },
        async modifyTask(_, {tittle, taskId, description, classification, isDelete, date, duration}) {
            const task = await Task.findOne({_id: new ObjectID(taskId)}).exec();
            if (tittle) {
                task.tittle = tittle;
            }
            if (description) {
                task.description = description;
            }
            if (classification) {
                task.classification = classification;
                if(classification !== 'customized'){
                    task.duration = durationForClassification(classification);
                }
            }
            if (isDelete) {
                task.isDelete = isDelete;
            }
            if (date) {
                task.title = date;
            }
            if(duration){
                task.duration = duration;
            }
            task.save();
            return task;
        },
        async modifyUser(_, {userId, lastName, name}) {
            const user = await accountsServer.findUserById(userId);
            if (lastName) {
                user.profile.lastName = lastName
            }
            if (name) {
                user.profile.name = name
            }
            mongoose.connection.db.collection('users', async function (_, collec) {
                collec.replaceOne({_id: new ObjectID(userId)}, user);
            });
            return user
        },
    }
};
module.exports = resolvers;