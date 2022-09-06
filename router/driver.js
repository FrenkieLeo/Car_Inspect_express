const express = require('express')
const router = express.Router()
const DriversModel= require('../model/drivers')

router.get("/",async(req,res)=>{
    const result = await DriversModel.findAll();
    res.json({
      code:20000,
      data:result
    })
  })

router.post("/update",async(req,res)=>{
  const data = req.body
  const updateData = data.updateData
  const insertData = data.insertData
  const allData = updateData.concat(insertData)
  const dbData = []
  //必须满足更新数据和插入数据
  for(let i in allData) {
    const newData = {
        name:allData[i].name,
        department:allData[i].department,
        phone:allData[i].phone,
        license_number:allData[i].license_number,
        license_expire:allData[i].license_expire,
        license_type:allData[i].license_type,
        test_situation:allData[i].test_situation
    }
    dbData.push(newData)
  }
  try{
    const result = await DriversModel.bulkCreate(dbData,{updateOnDuplicate:['name']})
    if(result){
      return res.json({
        code:20000,
        message:'更新成功',
        data:{
          result
        }
      })
    }
  }catch(err){
    console.log(err)
  }
  
// 

})

module.exports = router