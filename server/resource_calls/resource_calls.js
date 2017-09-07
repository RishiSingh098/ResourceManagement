import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
  Employees = new Mongo.Collection('employees');
  Skills = new Mongo.Collection('skills');

  

  // Publishes the existing skills collection to the client side subcscriotion.
  Meteor.publish('employees.skills', function(){
    return Skills.find();
  });

  Meteor.publish('employees.bySkill', function(skill_list){

    //console.log(skill_list.length);
    if(skill_list.length == 0){
      return [];
    }
    return Employees.find({"skills" : {"$elemMatch" : { "name": {$in: skill_list}}}});;
  });
}
