const Task = require('../models/task');
const {accountsServer} = require('.././accounts-js');
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const faker = require('faker');

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
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return moment(value);
        },
        serialize(value) {
            return moment(value).format("dddd, MMMM Do YYYY");
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
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
            const tasks = await Task.find(query).exec();
            return tasks.map(e => ({...e._doc, owner: accountsServer.findUserById(e.owner)}));
        },
        task: async (_, {taskId}) => {
            const task = await Task.findById(new ObjectID(taskId));
            return (task) ? {...task._doc, owner: accountsServer.findUserById(task.owner)} : task;
        },
        user: async (_, {userId}) => {
            const user = accountsServer.findUserById(userId);
            user._id = user.id;

            return user
        },
        productivity: async () => {
            let dateStart = moment();
            const dateEnd = moment(dateStart).add(2, 'days');
            const dateArray = [];
            while (dateStart <= dateEnd) {
                dateArray.push(moment(dateStart).format('YYYY-MM-DD'));
                dateStart = moment(dateStart).add(1, 'days');
            }
            const productivity = dateArray.map(async day => {
                const doneTask = await Task.countDocuments({realizationDate: day});
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
        async modifyTask(_, {title, taskId, description, classification, isDelete, date, duration}) {
            const task = await Task.findOne({_id: new ObjectID(taskId)}).exec();
            if (title) {
                task.title = title;
            }
            if (description) {
                task.description = description;
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
            if (date) {
                task.title = date;
            }
            if (duration) {
                task.duration = duration;
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
            for (let i = 1; i <= 3; i++) {
                duration = faker.random.number(7200);
                percent = Math.floor(duration * 4 / 5);
                doneIn = faker.random.number(duration - percent);
                date = faker.date.between(moment().subtract(7, "days"), moment());
                task =new Task({
                    title: faker.name.jobTitle(),
                    owner: owner,
                    classification: 'customized',
                    description: faker.lorem.sentences(),
                    status: 'done',
                    creationDate: moment(faker.date.recent(14)).format('YYYY-MM-DD'),
                    realizationDate: moment(date).format('YYYY-MM-DD'),
                    duration: duration,
                    doneIn: percent + doneIn,
                });
                task.save();
                tasks.push(task);
            }
            return tasks;
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