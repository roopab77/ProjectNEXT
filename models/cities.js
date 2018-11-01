module.exports = function (sequelize, DataTypes) {
  const Cities = sequelize.define("Cities", {
       name : {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false     
    }
  },
  {
    timestamps : false
  }); 
  return Cities;
};