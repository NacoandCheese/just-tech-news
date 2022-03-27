const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create our User model
class User extends Model {}

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
        //TABLE CONFIGURE OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //pass in our imported sequalize connection (the direct connection to our database)
        sequelize,
        //dont automatically create createdAt/updateAt timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //make it so our model name stays lowercase in the database
        mondelName: 'user'
    }
);

module.export = User;