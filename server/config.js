module.exports = {
    db: process.env.MONDODB || "mongodb://mongo/productivity",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "oneelephant",
};