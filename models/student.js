module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define('student', {
        student_first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        student_last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        unique_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATEONLY
        }
    });


        Student.belongsToMany(models.Class, {
            through:Roster,
        });
        Student.hasMany(models.Message);
    

    return Student;
};
