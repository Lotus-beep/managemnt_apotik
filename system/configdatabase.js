import  { Sequelize }  from "sequelize";

const db = new Sequelize('data_apotek','root','',{
    host: 'localhost',
    dialect: 'mysql',
})

export default db;