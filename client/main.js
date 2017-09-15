import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Mongo } from 'meteor/mongo';

import './main.html';
employee_filtered_list = new ReactiveVar([]);
employee_selected = new ReactiveVar([]);
skills_used = new ReactiveVar([]);
employeeColorMapping = new ReactiveDict();
teamList = new ReactiveVar([]);
const colorList = ["#00A0B0","#EDC951","#CC333F","#07DE50","#6730AD","#FF7808","#2D6AA5","#977568"];
chartColorsUsed = [];
chartEmployees = [[{value:1}]];

colorList.forEach(function(color){
  employeeColorMapping.set(color, null);
});



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
          if (skills_used.get().includes(skill.value) == false){
            var tempUsedSkills;
            tempUsedSkills = skills_used.get();
            tempUsedSkills.push(skill.value);
            skills_used.set(tempUsedSkills);
          }
        }
      });
      employee_filtered_list.set(filterList);

      }
    });

    Template.resource_display.helpers({
      display_employee_details: function(){
        //console.log(employee_selected.get());
        if(employee_filtered_list.get() == []){
          return [];
        }
        return employee_selected.get();
        }
      });
    Template.resource_display.events({
      'click button': function(event){
        var tempTeamList = teamList.get();
        if (!tempTeamList.includes(employee_selected.get()))
        {
          tempTeamList.push(employee_selected.get());
          teamList.set(tempTeamList);
          console.log(teamList.get());
        }
        
      }
    });

    Template.resource_visualization.helpers({
      get_team_list: function(){
        return teamList.get();
      }
    });

    Template.team_row.helpers({
      get_employee_color: function(id){
        var tempEmployee;
        colorList.forEach(function(color){
          tempEmployee = employeeColorMapping.get(color);
          if(tempEmployee != null && tempEmployee._id == id){
            console.log(color);
            return color;
          }
          return null;
        });
      }
    });

    Template.skillsUsed.helpers({
      getUsedSkills:function () {
        console.log(skills_used.get());
        return skills_used.get();
      }
    });

    Template.team_row.events({
      'click .team_row': function(event){
        
        if(!$(event.currentTarget).hasClass('employee_selected') && employee_found_in_map(this.wwid) == false){
          if(is_map_full() == false){
            $(event.currentTarget).addClass('employee_selected');
            //add selected employee into the color mapping object
            add_employee_to_map(this);
            event.currentTarget.cells[1].style.backgroundColor = get_employee_color(this.wwid);
            populate_chart_vars();

            var color = d3.scale.ordinal()
            .range(chartColorsUsed);
       

            var radarChartOptions = {
              w: width,
              h: height,
              margin: margin,
              maxValue: 5,
              levels: 5,
              roundStrokes: true,
              color: color
            };
            //Call function to draw the Radar chart

            RadarChart(".radarChart", chartEmployees, radarChartOptions);
            //console.log(employeeColorMapping.get("#00A0B0"));
          }
        }

      }
    });
}

  populate_chart_vars = function(){
    chartColorsUsed = [];
    chartEmployees = [];
    var tempEmployee;
    for(var color in colorList){
      tempEmployee = employeeColorMapping.get(colorList[color]);
      if( tempEmployee != null && tempEmployee != undefined){
        chartColorsUsed.push(colorList[color]);
        chartEmployees.push(populate_chart_data(tempEmployee));
        console.log(chartEmployees);
        console.log(chartColorsUsed);
      }
    }
  };

  populate_chart_data = function(employee){
    var tempChartData = [];
    var tempUsedSkills = [];
    var foundMatch = 0;
    var skill_name;
    var skill_level;
    tempUsedSkills = skills_used.get();
    for (var skill in tempUsedSkills){
      foundMatch = 0;
      for(var employee_skill in employee.skills){
        if(tempUsedSkills[skill] == employee.skills[employee_skill].name){
          foundMatch = 1;
          skill_name = employee.skills[employee_skill].name;
          skill_level = employee.skills[employee_skill].level;
        }
    }

      if(foundMatch == 1)
        {
          tempChartData.push({
                  axis: skill_name,
                  value: skill_level
                })
        }
        else
        {
          tempChartData.push({
                  axis: tempUsedSkills[skill],
                  value: 0
          });
        }

  }
    console.log(tempChartData);
    return tempChartData;
  };
  employee_found_in_map = function(wwid){
    var tempEmployee;
    colorList.forEach(function(color){
      tempEmployee = employeeColorMapping.get(color);
      if(tempEmployee != null && tempEmployee.wwid == wwid){
        return true;
      }
    });
    return false;
  };
  add_employee_to_map = function(employee){
    var tempEmployee;
    for(var color in colorList){
      tempEmployee = employeeColorMapping.get(colorList[color]);
      //console.log(colorList[color]);
      if(tempEmployee == null || tempEmployee == undefined){
        employeeColorMapping.set(colorList[color], employee);
        break;
      }
    }
  };
  is_map_full = function(){
    var tempEmployee;
    var nulls = 0;
    colorList.forEach(function(color){
      tempEmployee = employeeColorMapping.get(color);
      if(tempEmployee == null){
        nulls++;

      }
    });
    if(nulls > 0){
      return false;
    }
    else{
      return true;
    }
  };
  get_employee_color = function(wwid){
        var tempEmployee;
        for(var color in colorList){
          tempEmployee = employeeColorMapping.get(colorList[color]);
          //console.log(tempEmployee);
          //console.log(colorList[color]);
          if(tempEmployee != null && tempEmployee != undefined){
            //console.log(colorList[color]);
            //console.log(tempEmployee.wwid);
            //console.log(wwid);
            if(tempEmployee.wwid == wwid){
              //console.log(colorList[color]);
              return colorList[color];
              break;
            }
          }
        }
      };

