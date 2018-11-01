module.exports = function (sequelize, DataTypes) {
  const Trips = sequelize.define("Trips", {
    tripName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tripStartDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    tripEndDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  });

  Trips.associate = function (models) {
    // We're saying that a DESTINATIONS should belong to a trip
    // A trip can't be created without a user due to the foreign key constraint

    Trips.hasMany(models.Destinations, {
      onDelete: "cascade"
    });

    Trips.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Trips;
};