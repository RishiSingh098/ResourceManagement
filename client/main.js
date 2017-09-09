import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';
employee_filtered_list = new ReactiveVar([]);
employee_selected = new ReactiveVar([]);

if(Meteor.isClient) {
  Employees = new Mongo.Collection('employees');
  Skills = new Mongo.Collection('skills');

  Template.resource_list.onCreated( function() {
      Meteor.subscribe('employees.skills');
  });

  Template.resource_list.helpers({
    getEmployees: function(){
      Meteor.subscribe('employees.bySkill', employee_filtered_list.get());
      return Employees.find();
    }
  });

  Template.resource_list.events({
    'click .employee_row': function(event){
      //console.log(this);
      $('.employee_row').removeClass('employee_selected');
      $(event.currentTarget).addClass('employee_selected');
      employee_selected.set(this)
      }
    });

  Template.resource_filter.helpers({
    getSkills: function(){
      return Skills.find();
    }
  });

  //Event for when the employee_filter form is submitted.
  Template.resource_filter.events({
    'submit .employee_filter': function(event){
      event.preventDefault();
      var filterList = [];
      event.target.skill_box.forEach(function(skill) {
        if(skill.checked == true){
          filterList.push(skill.value);
        }
      });
      employee_filtered_list.set(filterList);

      }
    });

    Template.resource_display.helpers({
      display_employee_details: function(){
        console.log(employee_selected.get());
        if(employee_filtered_list.get() == []){
          return [];
        }
        return employee_selected.get();
        }
      });
}
