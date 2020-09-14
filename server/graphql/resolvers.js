const Task = require('../models/task');
const {accountsServer} = require('.././accounts-js');
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const faker = require('faker');

const durationForClassification = (classification, filter) => {
    switch (classification) {
        case 'short':
            return (filter) ? {$gt: 0, $lt: 1801} : 1800;

        case 'medium':
            return (filter) ? {$gt: 1800, $lt: 3601} : 2700;

        case  'long'  :
            return (filter) ? {$gt: 3600, $lt: 7201} : 3600;

        default:
            return (filter) ? {$gt: 0, $lt: 7201} : 0;
    }
};

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return moment(value);
        },
        serialize(value) {
            return moment(value).format("DD/MM/YYYY");
            // return moment(value).format("dddd, MMMM Do YYYY");
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
    Query: {
        tasks: async (_, {userId, category, pending, limit, sort}) => {
            const query = {};
            query.isDelete = false;
            query.status = (pending) ? "pending" : "done";

            if (userId) {
                query.owner = new ObjectID(userId);
            }
            if (category !== 'none') {
                query.duration = durationForClassification(category, true);
            }

            const tasks = await Task.find(query)
                .limit(limit)
                .sort(sort || '')
                .exec();
            pending && tasks.shift();
            return tasks.map(e => ({...e._doc, owner: accountsServer.findUserById(e.owner)}));
        },
        task: async (_, {taskId, inProgress}) => {
            const task = (inProgress) ? (await Task.find({status: 'pending'}).sort('order').limit(1).exec())[0] : await Task.findById(new ObjectID(taskId));
            return (task) ? {...task._doc, owner: accountsServer.findUserById(task.owner)} : task;
        },
        user: async (_, {userId}) => {
            const user = accountsServer.findUserById(userId);
            user._id = user.id;

            return user
        },
        productivity: async (_, {start, end, owner}) => {
            let dateStart = moment(start);
            const dateEnd = moment(end);
            const dateArray = [];
            while (dateStart <= dateEnd) {
                dateArray.push(moment(dateStart).format('YYYY-MM-DD'));
                dateStart = moment(dateStart).add(1, 'days');
            }
            const productivity = dateArray.map(async day => {
                const doneTask = await Task.countDocuments(
                    {realizationDate: day, owner: new ObjectID(owner), status: 'done', isDelete: false}
                );
                return {doneTask, day};
            });
            return productivity;
        }
    },
    Mutation: {
        async createTask(_, {title, owner, description, classification, duration,}) {
            const creationDate = moment().format('YYYY-MM-DD');
            const isDelete = false;
            const task = new Task({
                title,
                owner,
                description,
                classification,
                duration: (duration) ? duration : durationForClassification(classification),
                creationDate,
                isDelete
            });

            task.save();
            return task;
        },
        async modifyTask(_, {title, taskId, description, status, classification, isDelete, duration, progress, realizationDate}) {
            const task = await Task.findOne({_id: new ObjectID(taskId)}).exec();
            if (title) {
                task.title = title;
            }
            if (description) {
                task.description = description;
            }
            if (realizationDate) {
                task.realizationDate = realizationDate;
            }
            if (status) {
                task.status = status;
            }
            if (classification) {
                task.classification = classification;
                if (classification !== 'customized') {
                    task.duration = durationForClassification(classification);
                }
            }
            if (isDelete) {
                task.isDelete = isDelete;
            }
            if (duration) {
                task.duration = duration;
            }
            if (progress) {
                task.progress = progress;
            }
            task.save();
            return task;
        },
        async randomDoneTask(_, {owner}) {
            let duration;
            let percent;
            let doneIn;
            let task;
            let date;
            const tasks = [];
            for (let i = 1; i <= 10; i++) {
                duration = faker.random.number(7200);
                percent = Math.floor(duration * 4 / 5);
                doneIn = faker.random.number(duration - percent);
                date = faker.date.between(moment().subtract(7, "days"), moment());
                task = new Task({
                    title: faker.random.word(),
                    owner: owner,
                    classification: 'customized',
                    description: faker.lorem.sentences(4),
                    status: 'pending',
                    creationDate: moment(faker.date.recent(14)).format('YYYY-MM-DD'),
                    // realizationDate: moment(date).format('YYYY-MM-DD'),
                    duration: duration,
                    // progress: percent + doneIn,
                });
                task.save();
                tasks.push(task);
            }
            return tasks;
        },
        async reorder(_,{taskId1, taskId2}){
            const task1 = await Task.findOne({_id: new ObjectID(taskId1)}).exec();
            const task2 = await Task.findOne({_id: new ObjectID(taskId2)}).exec();
            const order1 = task1.order;
            const order2 = task2.order;
            task1.order = order2;
            task2.order = order1;
            task1.save();
            task2.save();
            return [task1,task2];
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