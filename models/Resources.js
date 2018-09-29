"use strict"
module.exports=function(sequelize,DataTypes){
    var Resources = sequelize.define("Resources",{
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        resourceName:{
            type:DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        resourceType:{
            type:DataTypes.STRING,
            allowNull: false
        },
        resourceImage: {
            type: DataTypes.STRING,
            // allowNull: false
        }
    },{
    freezeTableName: true
  });
    return Resources;
};