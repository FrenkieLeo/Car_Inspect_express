const { Sequelize, DataTypes } = require("sequelize");


// // 从环境变量中读取数据库配置
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const MYSQL_ADDRESS = 'sh-cynosdbmysql-grp-nhbmhflq.sql.tencentcdb.com:20563';
const MYSQL_USERNAME = 'car_admin';
const MYSQL_PASSWORD ='Admin@!@#';

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("carinspect", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});


module.exports = {
    sequelize,
}
