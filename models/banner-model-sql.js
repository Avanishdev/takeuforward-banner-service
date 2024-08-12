const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Banner = sequelize.define('Banner', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'banners',
    timestamps: true,
});

module.exports = Banner;
