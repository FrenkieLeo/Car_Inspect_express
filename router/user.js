const express = require('express')
const router = express.Router()
const UsersModel = require('../model/users')
const jwt = require('jsonwebtoken')
const {verify} = require('../utils/auth')



router.post("/login",(req,res,next)=>{
    const username = req.body.username
    const password = req.body.password
    UsersModel.findOne({
        where:{
            user_name:username
        }
    }).then(function(user){
        if(!user){
            return res.json({
                code:40000,
                message:'账号不存在',
                data:{}
            })
        }
        if(!user.status){
            return res.json({
                code:4000,
                message:'账号已停用',
                data:{}
            })
        }
        if(user.password == password){
            // 设置token
            const token =jwt.sign(
                {
                    _id:user.user_id,
                    username:user.user_name
                },
                'frenkieLeo',
                {
                    expiresIn: 3600*2
                }
            )

            // const logData = {
            //     user_id: user.user_id,
            //     ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,//用来表示 HTTP 请求端真实 IP
            //     ua: req.headers['user-agent']
            //     // User-Agent是Http协议中的一部分，属于头域的组成部分，User Agent也简称UA。
            //     // 用较为普通的一点来说，是一种向访问网站提供你所使用的浏览器类型、操作系统及版本、CPU 类型、浏览器渲染引擎、浏览器语言、浏览器插件等信息的标识。UA字符串在每次浏览器 HTTP 请求时发送到服务器！
            // }
            return res.json({
                code: 20000,
                message: '登录成功',
                data: {
                    token:token
                }
              })
        }else{
            return res.json({
                code: 40000,
                message: '密码错误',
                data:{}
              })
        }
    })
})

router.get("/info",(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token.split(' ')[1],'frenkieLeo',function(err,data){
        if(err && err.message === 'invalid token'){
            return res.json({
                code:50008,
                message:'无效token'
            })
        }
        if(err && err.message === 'jwt expired'){
            return res.json({
                code:50014,
                message:'Token expired'
            })
        }
        return res.json({
            code:20000,
            message:'获取用户信息',
            data:data
        })
    })    
  })


router.post('/logout',(req,res)=>{
    return res.json({
        code:20000,
        message:'注销成功',
        data:null
    })
})

module.exports = router