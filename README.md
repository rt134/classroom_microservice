Base URl Local : http://localhost:8000/
Base URL Heroku : https://nameless-sands-60087.herokuapp.com/


Authentication :
	
	1. Student Registration : 	baseUrl/api/auth/student
								METHOD : POST
								INPUT : {email,password}

	2. Tutor Registration 	: 	baseUrl/api/auth/tutor
								METHOD : POST
								INPUT : {email,password}

	3. Common User Login 	:	baseUrl/api/auth/login
								METHOD : POST
								INPUT : {email,password}

	4. Common user Logout	: 	http://localhost:8000/api/auth/logout
								METHOD : GET



Tutor :
	
	1. Create Assignment 	: 	baseUrl/api/tutor/createassignment
								METHOD : POST
								INPUT : {description,publishedAt,deadline}

	2. Update Assignment 	: 	baseUrl/api/tutor/updateassignment/:assignmentId
								METHOD : POST
								INPUT : {description,publishedAt,deadline}

	3. Delete Assignment 	: 	baseUrl/api/tutor/deleteassignment/:assignmentid
								METHOD : POST

	4. Get Submissions 		: 	baseUrl/api/tutor/getsubmissions
								METHOD : GET

	5. Assignment Feed		: 	http://localhost:8000/api/tutor/assignmentfeed
								METHOD : GET



Student :

	1. Add tutor(course enroll):baseUrl/api/student/addtutor/:tutorId
								METHOD : POST

	2. Submit assignment 	: 	baseUrl/api/student/submitassignment/:assignmentId
								METHOD : POST
								INPUT : { description }

	3. Get Submissions 		: 	baseUrl/api/student/getsubmissions
								METHOD : GET

	4. Assignment Feed 		: 	baseUrl/api/student/assignmentfeed
								METHOD : GET
