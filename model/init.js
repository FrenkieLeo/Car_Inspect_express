const { Sequelize, DataTypes } = require("sequelize");


// // 从环境变量中读取数据库配置
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const MYSQL_ADDRESS = 'sh-cynosdbmysql-grp-as2uyv3y.sql.tencentcdb.com:20531';
const MYSQL_USERNAME = 'root';
const MYSQL_PASSWORD ='FZbuk3nb';

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("carinspect", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});


module.exports = {
    sequelize,
}