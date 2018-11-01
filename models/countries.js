module.exports = function (sequelize, DataTypes) {
  const countries = sequelize.define("countries", {
    sortname: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    name : {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phonecode: {
      type: DataTypes.INTEGER,
      allowNull: false     
    }
  },
  {
    timestamps : false
  }); 
  return countries;
};

