var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/rm';

var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function get_all_info(start_date, end_date, skills, levels, callback) {
	MongoClient.connect(url, function(err, db) {
		var steps = [];

		// Step 1: Skill Matching
		for(var i = 0; i < skills.length; i = i + 1) {
			steps.push({"$match" : {"skills" : {"$elemMatch" : {"name" : skills[i], "level" : {"$gt" : levels[i]}}}}})
		}

		// Step 2: Unwind by Allocations
		steps.push({"$unwind" : "$allocations"})

		// Step 3: Filter by date range
		var sd = start_date.getTime() - 86400000;
		var ed = end_date.getTime();
		steps.push({
			"$match" : {"$and" : [{"allocations.date" : {"$gte" : sd}},
								  {"allocations.date" : {"$lte" : ed}}]}
		})

		// Step 4: Group by summing allocations
		steps.push({
            "$group": {
                "_id": {wwid: "$wwid", name: "$name", email: "$email",
                    date_of_hire: "$date_of_hire", team: "$team", role: "$role",
                    office: "$office", location: "$location", skills: "$skills",
                    date: "$allocations.date"},
                "allocations": {$sum : "$allocations.oe"}
            }
        })

		// Step 5: Group by averaging allocations
		steps.push({
            "$group": {
                "_id": {wwid: "$_id.wwid", name: "$_id.name", email: "$_id.email",
                    date_of_hire: "$_id.date_of_hire", team: "$_id.team",
                    role: "$_id.role", office: "$_id.office",
                    location: "$_id.location", skills: "$_id.skills"},
                "allocations": {$avg : "$allocations"}
            }
        })

        // Step 6: Sort by allocations
        steps.push({$sort : {"allocations" : 1}})

		db.collection('employees').aggregate(steps, function(err, cursor) {
			var docs = [];
			cursor.forEach(function(doc) {
				if(doc) {
					docs.push(doc);
				}
			})

			db.close();
			callback(null, docs);
		})

	})
}

function get_all_skills(callback) {
	MongoClient.connect(url, function(err, db) {
		db.collection('skills').find({}, function(err, cursor) {
			var skills = [];
			cursor.each(function(err, doc) {
				if(err != null) {
					callback(err, null)
				}
				else if(doc != null) {
					skills.push(doc.skill)
				} else {
					db.close()
					callback(null, skills)
				}
			})
		})
	})
}

function lookup_employee(wwid, callback) {
	MongoClient.connect(url, function(err, db) {
		db.collection('employees').find({"wwid" : wwid}, function(err, cursor) {
			if(cursor.count() == 0) {
				callback("No Employee Found", null)
			} else if(cursor.count()> 1) {
				callback("ERROR: Duplicate WWID", null)
			} else {
				cursor.nextObject(function(err, doc) {
					callback(null, doc);
				})
			}
		})
	})
}

function all_locations(callback) {
	MongoClient.connect(url, function(err, db) {
		db.collection('employees').distinct("location", function(err, locs) {
			callback(null, locs);
			db.close();
		})
	})
}

function all_teams(callback) {
	MongoClient.connect(url, function(err, db) {
		db.collection('employees').distinct("team", function(err, locs) {
			callback(null, locs);
			db.close();
		})
	})
}

// all_teams(function(err, locs) {
// 	console.log(locs);
// })

get_all_info(new Date(2017,07,21,0,0), new Date(2017,07,25,0,0), ["Java", "Back End Web"], [2,2], function(err, docs) {
	if(err != null) {
		console.log(err);
	} else {
		console.log(docs)
	}
})












