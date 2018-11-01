module.exports = function (sequelize, DataTypes) {
  const Destinations = sequelize.define("Destinations", {
    destinationCountry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinationState: {
      type: DataTypes.STRING,
      allowNull: true
     
    },
    destinationCity: {
      type: DataTypes.STRING,
      allowNull: true
      
    },
    dateFrom: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // allowNull: false
    },
    dateTO: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      // allowNull: false
    }
  });

  Destinations.associate = function (models) {

    Destinations.hasMany(models.Reviews, {
      onDelete: "cascade"
    });

    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Destinations.belongsTo(models.Trips, {
      foreignKey: {
        allowNull: false
      }
    });

  };

  return Destinations;
};