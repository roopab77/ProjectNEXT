module.exports = function (sequelize, DataTypes) {
  const States = sequelize.define("States", {
       name : {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false     
    }
  },
  {
    timestamps : false
  }); 
  return States;
};