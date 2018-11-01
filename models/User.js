module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Users;
};