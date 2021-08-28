Base URl : http://localhost:8000/api


Authentication :
	
	1. Student Registration : 	http://localhost:8000/api/auth/student
								METHOD : POST
								INPUT : {email,password}

	2. Tutor Registration 	: 	http://localhost:8000/api/auth/tutor
								METHOD : POST
								INPUT : {email,password}

	3. Common User Login 	:	http://localhost:8000/api/auth/login
								METHOD : POST
								INPUT : {email,password}

	4. Common user Logout	: 	http://localhost:8000/api/auth/logout
								METHOD : GET



Tutor :
	
	1. Create Assignment 	: 	http://localhost:8000/api/tutor/createassignment
								METHOD : POST
								INPUT : {description,publishedAt,deadline}

	2. Update Assignment 	: 	http://localhost:8000/api/tutor/updateassignment/:assignmentId
								METHOD : POST
								INPUT : {description,publishedAt,deadline}

	3. Delete Assignment 	: 	http://localhost:8000/api/tutor/deleteassignment/:assignmentid
								METHOD : POST

	4. Get Submissions 		: 	http://localhost:8000/api/tutor/getsubmissions
								METHOD : GET

	5. Assignment Feed		: 	http://localhost:8000/api/tutor/assignmentfeed
								METHOD : GET



Student :

	1. Add tutor(course enroll):http://localhost:8000/api/student/addtutor/:tutorId
								METHOD : POST

	2. Submit assignment 	: 	http://localhost:8000/api/student/submitassignment/:assignmentId
								METHOD : POST
								INPUT : { description }

	3. Get Submissions 		: 	http://localhost:8000/api/student/getsubmissions
								METHOD : GET

	4. Assignment Feed 		: 	http://localhost:8000/api/student/assignmentfeed
								METHOD : GET

