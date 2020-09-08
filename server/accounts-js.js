const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { Mongo } = require('@accounts/mongo');
const mongoose = require("mongoose");

const accountsMongo = new Mongo(mongoose.connection);
const accountsPassword = new AccountsPassword({
    validateNewUser: async user => user
    ,
});

const accountsServer = new AccountsServer(
    {
        db: accountsMongo,
        tokenSecret: 'my-super-random-secret',
    },
    {
        password: accountsPassword,
    }
);
module.exports = {accountsServer};