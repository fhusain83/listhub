
module.exports = function(sequelize, Sequelize){

    var Events = sequelize.define("events", {
    event_name: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
    return Events;
}