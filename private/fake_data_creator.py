import json
import random
import sys
import datetime
from bson import json_util
from pymongo import MongoClient

# Retrieves the list of randomly generated names
names = []
file = open('names.txt', 'r')
for line in file:
	names.append(line.replace('\t', ' ')[:-1])

# Retrieves the list of sample skills
skills = []
file = open('skills.txt', 'r')
for line in file:
	skills.append(line[:-1])

# A list of possible teams
teams = ['DataLabs', 'IoTLabs', 'DevLabs', 'VizLabs']

# A list of possible roles
roles = ['Developer', 'Data Analyst', 'Tester']

# A list of offices and their locations
offices = [['Raritan', '1003 US 202, Raritan NJ, 08869'], ['Ethicon', '555 US 22, Bridgewater NJ, 08807'],
['Providence', '1 Ship St, Providence, RI 02903'], ['Tampa', '8800 Grand Oak Cir, Tampa, FL 33637']]

# A List of project names
project_names = ['CICD', 'RARA', 'ResourceManagement', 'KOL', 'Baby and Mom', 'Chatbot', 'Trackit', 'Website', 'Computer Vision']

# Retrieve the list of project descriptions
project_descripions = []
file = open('project_descriptions.txt', 'r')
for line in file:
	project_descripions.append(line[:-1])


#Genrates an allocation JSON object with the given details
def allocation(date, project_id, oe, re, a):
	obj = {'date': date, 'project_id': project_id, 'oe': oe, 're': re, 'a': a}
	return(obj)

# Creates a JSON object representing an employee with the given info
def create_employee(wwid, name, email, team, role, direct, location, date_of_hire, skills, allocations):
	obj = {'wwid': wwid, 'name': name, 'email': email, 'team': team, 'role': role, 'direct': direct,
		'location': location, 'date_of_hire': date_of_hire, 'skills': skills, 'allocations': allocations}
	jsonObj = json.dumps(obj, default=json_util.default)
	return(jsonObj)

def create_project(pid, name, desc, head, sow, active):
	return({'project_id': pid, 'name': name, 'description': desc, 'head': head, 'sow': sow, 'active': active})


# Randomly Generate a List of JSON objects representing employees
def generate_employees(num_employees):
	employees = []

	# For every employee
	for i in range(0, num_employees):
		# Randonly Generate a wwid
		wwid = str(int(random.uniform(100000,1000000)))

		# Randomly select their name, team and role from the corresponding lists
		name = names[int(random.uniform(0, len(names)))]
		email = name.lower()[0] + name.lower().split(" ")[1] + "@its.jnj.com"
		team = teams[int(random.uniform(0, len(teams)))]
		role = roles[int(random.uniform(0, len(roles)))]

		# Determine if the employee is direct or indirect
		if(int(random.uniform(1,10)) < 8):
			direct = True
		else:
			direct = False

		#Randomly choose an employees office and its corresponding location
		officeloc = offices[int(random.uniform(0, len(offices)))]
		office = officeloc[0]
		address = officeloc[1]
		location = {'office': office, 'address': address}

		# Randomly generate the date of hire
		year = int(random.uniform(2005, 2018))
		month = int(random.uniform(1, 13))
		if month in [4, 6, 9, 11]:
			day = int(random.uniform(1, 31))
		elif month == 2:
			day = int(random.uniform(1, 29))
		else:
			day = int(random.uniform(1, 32))

		# date_of_hire = datetime.date(year, month, day)

		#Format the date of hire
		date_of_hire = str(year) + '-' + format(month, '02d') + '-' + format(day, '02d')

		# Randomly decide how many skills this employee has
		num_skills = int(random.uniform(2, 6))

		# Randomly choose a unique index for each skill
		skill_indexes = random.sample(range(0, len(skills) - 1), num_skills)

		# For every skill, add it to the list
		selected_skills = []
		for index in skill_indexes:
			selected_skills.append(skills[index])

		# Create a dictionary mapping skills to their skill level
		skill_list = []
		for skill in selected_skills:
			skill_list.append({'name': skill, 'level': int(random.uniform(1,6))})

		allocations = []

		# For every project an employee is on (2)
		project_ids = random.sample(range(1, 10), 2)
		for pid in project_ids:

			# Randomly generate their allocation on this project
			oe = int(random.uniform(3,6))

			# For every day "this" week
			for d in range(21, 26):
				# Format the date
				date = datetime.datetime(2017, 8, d, 0, 0)
				# date = '2017-8-' + str(d)
				# print(date)

				#Generate expected and actual allocation
				re = int(random.uniform(2,7))
				a = int(random.uniform(2,7))

				# Add this allocation to the list
				allocations.append(allocation(date, pid, oe, re, a))

		# Add this employee to the list
		employees.append(create_employee(wwid, name, email, team, role, direct, location, date_of_hire, skill_list, allocations))

	#Return the list of employees
	return(employees)

# Generate a list of projects
def generate_projects():
	projects = []

	# Create 9 projects
	for pid in range(1,10):
		# Get the name and decscription
		name = project_names[pid-1]
		desc = project_descripions[pid-1]

		# Generate the project's head
		head = str(int(random.uniform(100000,1000000)))

		# Randomly determine if this project is an sow
		if(int(random.uniform(1,10)) < 7):
			sow = True
		else:
			sow = False

		# If this project is an sow, determine if it is active, otherwise, it is inactive
		if sow:
			if(int(random.uniform(1,10)) > 7):
				active = True
			else:
				active = False
		else:
			active = False

		# Create the project and add it to the list
		projects.append(create_project(pid, name, desc, head, sow, active))

	# Return the list of projects
	return(projects)


# Populate the database with a list of employees
def populate_database(num_employees):
	# Connect to the resource management database
	client = MongoClient('localhost', 27017)
	db = client.rm

	# Connect to the employees collection in the rm database
	emp = db.employees

	# Generate a list of random employees
	employees = generate_employees(num_employees)

	# Add all the employees to the database
	for e in employees:
		e2 = json.loads(e)
		alocs = e2.get('allocations')
		for a in alocs:
			a['date'] = (a['date']['$date'] + 14400000)
		emp.insert(e2)

	# Connect to the project collection
	proj = db.projects

	# If projects are not yet generated
	if proj.count() <= 0:
		# Generate a list of projects
		projects = generate_projects()

		# Add all projects to the database
		for p in projects:
			proj.insert(p)

	# Connect to the skills collection
	sk = db.skills

	# If Skills are not yet generated
	if sk.count() <= 0:
		# Get the list of skills
		skills = []
		file = open('skills.txt', 'r')
		for line in file:
			skills.append(line[:-1])

		# Add all skills to the collection
		for s in skills:
			sk.insert({'skill': s})

if __name__ == "__main__":
	populate_database(int(sys.argv[1]))

