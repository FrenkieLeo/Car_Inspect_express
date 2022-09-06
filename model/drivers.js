const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const DriversModel = sequelize.define("Drivers",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_driver:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1,
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"广州交投实业有限公司"
    },
    license_number:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    license_expire:{
        type:DataTypes.DATEONLY,
        allowNull:true,
        defaultValue:'2022-09-01'
    },
    license_type:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'C1'
    },
    test_situation:{
        type:DataTypes.STRING,
        allowNull:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"员工"
    },
    show:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1,
    }
},{
    indexes: [
        {
          unique: true,
          fields: ['name']
        },
    ]
})

// (async () => {
//     await sequelize.sync({ force: true });
// })();

DriversModel.sync({alter:true})


module.exports = DriversModel