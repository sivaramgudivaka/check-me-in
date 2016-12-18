/**
 * Created by Sivaram on 12/12/16.
 */
module.exports = function(app) {
    var model = require("./model/models.server.js")();
    require("./services/user.service.server.js")(app, model);
    require("./services/branch.service.server.js")(app, model);
    require("./services/checkin.service.server.js")(app, model);
};