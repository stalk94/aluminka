const fs = require("fs");
const db = require("quick.db");



module.exports = {
    index: require("./server/engine/view/index"),
    'detail-plintus': require("./server/engine/view/detail-plintus"),
    'shadow-profile': require("./server/engine/view/shadow-profile"),
    'furnityra': require("./server/engine/view/furnityra"),
    'plintus': require("./server/engine/view/plintus"),
    'door-profile': require("./server/engine/view/door-profile")
};