var require = meteorInstall({"server":{"resource_calls":{"resource_calls.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/resource_calls/resource_calls.js                           //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.watch(require("meteor/meteor"), {                             // 1
  Meteor: function (v) {                                             // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
                                                                     //
if (Meteor.isServer) {                                               // 3
  Employees = new Mongo.Collection('employees');                     // 4
  Skills = new Mongo.Collection('skills'); // Publishes the existing skills collection to the client side subcscriotion.
                                                                     //
  Meteor.publish('employees.skills', function () {                   // 10
    return Skills.find();                                            // 11
  });                                                                // 12
  Meteor.publish('employees.bySkill', function (skill_list) {        // 14
    //console.log(skill_list.length);                                // 16
    if (skill_list.length == 0) {                                    // 17
      return [];                                                     // 18
    }                                                                // 19
                                                                     //
    return Employees.find({                                          // 20
      "skills": {                                                    // 20
        "$elemMatch": {                                              // 20
          "name": {                                                  // 20
            $in: skill_list                                          // 20
          }                                                          // 20
        }                                                            // 20
      }                                                              // 20
    });                                                              // 20
    ;                                                                // 20
  });                                                                // 21
}                                                                    // 22
///////////////////////////////////////////////////////////////////////

}},"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var Meteor = void 0;                                                 // 1
module.watch(require("meteor/meteor"), {                             // 1
  Meteor: function (v) {                                             // 1
    Meteor = v;                                                      // 1
  }                                                                  // 1
}, 0);                                                               // 1
Meteor.startup(function () {// code to run on server at startup      // 5
});                                                                  // 7
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./server/resource_calls/resource_calls.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
