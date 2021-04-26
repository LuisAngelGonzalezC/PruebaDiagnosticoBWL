module.exports = (sequelize, Sequelize) => {
    
    const User = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false,
    });
    return User;
}