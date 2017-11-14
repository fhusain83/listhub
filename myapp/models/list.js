
module.exports = function(sequelize, Sequelize){

    var list = sequelize.define("lists", {
    item_name: {
        type: Sequelize.STRING
    },
    event_id: {
        type: Sequelize.INTEGER
    },
    claimed: {
        type: Sequelize.BOOLEAN
    }, 
    user_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
    return list;
}