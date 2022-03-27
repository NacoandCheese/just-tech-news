const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        //define an id column
        id: {
            //use the special sequalize datatypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQLs NOT NULL option
            allowNull: false,
            //insturct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validator before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be atleast four characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate life cycle "hook" functionality 
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality 
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }


        },
        //TABLE CONFIGURE OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequalize connection (the direct connection to our database)
        sequelize,
        //dont automatically create createdAt/updateAt timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;