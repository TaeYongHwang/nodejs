module.exports = function(sequelize, DataTypes){
    let user = sequelize.define("UTXOs", {
        address: {
            filed: "address",
            type: DataTypes.STRING(50),
            allowNull: false
        },
        txId:{
            field:'txId',
            type: DataTypes.STRING(100),
            allowNull: false
        },
        outputIndex: {
            field: 'outputIndex',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        satoshis:{
            field: 'satoshis',
            type: DataTypes.BIGINT(10),
            allowNull:false
        },
        isSpent:{
            field: 'isSpent',
            type : DataTypes.BOOLEAN,
            allowNull:false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "UTXOs"
    });
    return user;
}