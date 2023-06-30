
//  Databese Connection Set ------- 
module.exports = {
    host: "localhost",
    user: "root",
    password: "",
    db: 'video_project',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}