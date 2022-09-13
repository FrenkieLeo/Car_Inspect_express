const path = require("path");
const express = require("express");
const morgan = require("morgan");
const {expressjwt:jwt} = require('express-jwt')
const bodyParser = require('body-parser')
const sequelize = require("sequelize");
const logger = morgan("tiny");
const history = require('connect-history-api-fallback')

// 导入路由
const driversRouter = require('./router/driver');
const sysRouter = require('./router/sys');
const userRouter = require('./router/user')


const app = express();
// app.use 库
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger);
// app.use(express.static(path.join(__dirname, 'dist')))
// app.use(history())
app.use(jwt({
  secret: 'frenkieLeo', // 签名的密钥 或 PublicKey
  algorithms: ["HS256"]
}).unless({
  path: ['/','/user/login'] // 指定路径不经过 Token 解析
}))


// 解决跨域问题

app.all('*', function (req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,Access-Token,token,X-token');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// // 首页
// app.get("/", async (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// 路由判断
app.use('/drivers',driversRouter)
app.use('/sys',sysRouter)
app.use('/user/',userRouter)

// 0913推送到github



// const port = process.env.PORT || 80;
app.listen(27081, () => {
    console.log("启动成功", 27081);
});

