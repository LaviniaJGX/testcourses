# Assignment 1 - API testing and Source Control.

Name: GUIXIN JIANG
Student ID: 20082268

Address of GitHub: https://github.com/LaviniaJGX/coursestest.git

## Overview.
...... A statement of the API's context and objectives (just a paragraph)........

This is a course arrangement system to find the accurate courses,teachers and students information.
There are three models: courses , teacher , student
"courses" has 6 attributes: courseTitle , classHours , studentNumbers , studentCategory , teacherName , teacherType
    In this route,we can get all courses/course by ID/all student numbers/all course hours/course by keyword
                         add a course
			 change hours/student numbers in a course
			 delete a course
"teacher" has 5 attributes: name , teacherType , teacherGender , department , departmentMajor
    In this route,we can get all teachers/teacher by ID/teacher by name/teacher by keyword
                         add a teacher
			 change department/major about a teacher
			 delete a teacher
"student" has 4 attributes: name , studentCategory , coursesNumbers , major
    In this route,we can get all students/studnt by ID/student by name/student by keyword
                         add a student
			 change category/major about a student
			 delete a student



## API endpoints.
 . . . . . List the API's endpoints and state the purpose of each . . . . 

 COURSES

 + GET /courses - Get all courses.
 + GET /courses/:id - Get the certain course by its ID.
 + GET /coursesNumbers/numbers - Get all the student numbers.
 + GET /coursesHours/hours - Get all the course hours.
 + GET /coursesElements/:courseTitle - Get all couses with the keyword in coursetitle.
 + POST /courses - Add a course - Add a new course with information.
 + PUT /coursesCertain/:id/:teacherName/CHour - Change a course hours.
 + PUT /coursesCerNum/:id/:teacherName/CNum - Change the student numbers in a course.
 + PUT /courses/:id/:teacherName/Teacher - Change the teacher name in a course.
 + DELETE /courses/:id - Delete a course with its information.



 TEACHER

 + GET /teacher - Get all teachers.
 + GET /teacher/:id - Get the certain teacher information by his ID.
 + GET /teacherName/:name - Get the certain teacher information by his name.
 + GET /teacherElements/:department - Get all teachers which contains the keyword in their name.
 + POST /teacher - Add a new teacher with information.
 + PUT /teacher/:id - Change the teacher department by his ID.
 + PUT /teacherMajor/:id - Change the teacher major in the department by his ID.
 + DELETE /teacher/:id - Delete a teacher with his information.



 STUDENT

 + GET /student - Get all students.
 + GET /student/:id - Get the certain student information by his ID.
 + GET /studentName/:name - Get the certain student information by his name.
 + GET /studentElements/:name - Get all students which contains the keyword in their name.
 + POST /student - Add a new student with information.
 + PUT /student/:id - Change the student category by his ID.
 + PUT /studentMajor/:id - Change the student major by his ID.
 + DELETE /student/:id - Delete a student with his information.



## Data storage.
. . . . This section is only relevant if your tests included the integration of MongoDB (or other database) with the API. It should specify the database schema, i.e. JSON document structure for each collection type in the MongoDB database.

I connect using a driver via the standard MongoDB URI
    mongodb://LaviniaJGX:dreammj01@ds151453.mlab.com:51453/testcourses
    The address is https://mlab.com/databases/testcourses , user: LaviniaJGX , password: dreammj01
    The database is testcourses , there are three collections: courses , teacher , student

Collection: courses
{
    "_id": {
        "$oid": "5bddb6a96dac4604e4af91a5"
    },
    "courseTitle": "Database System",
    "classHours": 42,
    "studentNumbers": 35,
    "studentCategory": "postgraduate",
    "teacherName": "Lily",
    "teacherType": "common",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6b56dac4604e4af91a6"
    },
    "courseTitle": "Software Architecture",
    "classHours": 40,
    "studentNumbers": 40,
    "studentCategory": "postgraduate",
    "teacherName": "David",
    "teacherType": "admin",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6c26dac4604e4af91a7"
    },
    "courseTitle": "Computer Networks",
    "classHours": 35,
    "studentNumbers": 45,
    "studentCategory": "postgraduate",
    "teacherName": "Amanda",
    "teacherType": "admin",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6cc6dac4604e4af91a8"
    },
    "courseTitle": "Client Programming",
    "classHours": 30,
    "studentNumbers": 50,
    "studentCategory": "undergraduate",
    "teacherName": "April",
    "teacherType": "common",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6d86dac4604e4af91a9"
    },
    "courseTitle": "Computer Basics",
    "classHours": 28,
    "studentNumbers": 55,
    "studentCategory": "undergraduate",
    "teacherName": "Sky",
    "teacherType": "admin",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6e26dac4604e4af91aa"
    },
    "courseTitle": "College English",
    "classHours": 25,
    "studentNumbers": 60,
    "studentCategory": "undergraduate",
    "teacherName": "Lucy",
    "teacherType": "common",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6ed6dac4604e4af91ab"
    },
    "courseTitle": "Math",
    "classHours": 33,
    "studentNumbers": 33,
    "studentCategory": "undergraduate",
    "teacherName": "Lavinia",
    "teacherType": "admin",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb6f66dac4604e4af91ac"
    },
    "courseTitle": "Art appreciation",
    "classHours": 20,
    "studentNumbers": 25,
    "studentCategory": "postgraduate",
    "teacherName": "Anease",
    "teacherType": "common",
    "__v": 0
}

Collection: student
{
    "_id": {
        "$oid": "5bddb8c26dac4604e4af91b6"
    },
    "name": "xiao ming",
    "studentCategory": "undergraduate",
    "coursesNumbers": 3,
    "major": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8cd6dac4604e4af91b7"
    },
    "name": "xiao wang",
    "studentCategory": "undergraduate",
    "coursesNumbers": 2,
    "major": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8d76dac4604e4af91b8"
    },
    "name": "xiao hong",
    "studentCategory": "postgraduate",
    "coursesNumbers": 4,
    "major": "Communication Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8e06dac4604e4af91b9"
    },
    "name": "xiao liu",
    "studentCategory": "undergraduate",
    "coursesNumbers": 5,
    "major": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8eb6dac4604e4af91ba"
    },
    "name": "xiao zhang",
    "studentCategory": "postgraduate",
    "coursesNumbers": 2,
    "major": "Communication Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8f56dac4604e4af91bb"
    },
    "name": "xiao yan",
    "studentCategory": "postgraduate",
    "coursesNumbers": 1,
    "major": "English Learning",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8fe6dac4604e4af91bc"
    },
    "name": "xiao mao",
    "studentCategory": "undergraduate",
    "coursesNumbers": 6,
    "major": "Mathmatical Formatting",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb9076dac4604e4af91bd"
    },
    "name": "xiao feng",
    "studentCategory": "postgraduate",
    "coursesNumbers": 5,
    "major": "Designing",
    "__v": 0
}

Collection: teacher
{
    "_id": {
        "$oid": "5bddb84c6dac4604e4af91ae"
    },
    "name": "Lily",
    "teacherType": "common",
    "teacherGender": "female",
    "department": "Science and Technology",
    "departmentMajor": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8586dac4604e4af91af"
    },
    "name": "David",
    "teacherType": "admin",
    "teacherGender": "male",
    "department": "Science and Technology",
    "departmentMajor": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb86c6dac4604e4af91b0"
    },
    "name": "Amanda",
    "teacherType": "admin",
    "teacherGender": "female",
    "department": "Science and Technology",
    "departmentMajor": "Communication Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8776dac4604e4af91b1"
    },
    "name": "April",
    "teacherType": "common",
    "teacherGender": "male",
    "department": "Science and Technology",
    "departmentMajor": "Software Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8886dac4604e4af91b2"
    },
    "name": "Sky",
    "teacherType": "admin",
    "teacherGender": "male",
    "department": "Science and Technology",
    "departmentMajor": "Communication Engineering",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8926dac4604e4af91b3"
    },
    "name": "Lucy",
    "teacherType": "common",
    "teacherGender": "female",
    "department": "Language and Culture",
    "departmentMajor": "English Learning",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8a26dac4604e4af91b4"
    },
    "name": "Lavinia",
    "teacherType": "admin",
    "teacherGender": "female",
    "department": "Mathmatice",
    "departmentMajor": "Mathmatical Formatting",
    "__v": 0
}
{
    "_id": {
        "$oid": "5bddb8af6dac4604e4af91b5"
    },
    "name": "Anease",
    "teacherType": "common",
    "teacherGender": "male",
    "department": "Art and Design",
    "departmentMajor": "Designing",
    "__v": 0
}



## Sample Test execution.
In this section include a listing of the output from running your tests


    $ F:\Agile Software Practice\coursestest>npm test

    > coursestest@0.0.0 test F:\Agile Software Practice\coursestest
    > set NODE_ENV=test && mocha test/routes/courses-test.js

    Courses
      GET /courses
      Successfully Connected to [ testcourses ]
      Successfully Connected to [ testcourses ]
      Successfully Connected to [ testcourses ]
         √ should return all the courses in an array (380ms)
      GET /courses/:id
         √ should return message authentication not enough
         √ should return the course with the certain ID
         √ should return a 404 and a message for invalid course id
      GET /coursesNumbers/numbers
         √ should return total student numbers
         √ should return a 404 for error message
      GET /coursesHours/hours
         √ should return total courses hours
         √ should return a 404 for error message
      GET /coursesElements/:courseTitle
         √ should return courses with the keyword in course title
         √ should return a 404 for error message
      POST /courses
         √ should return confirmation message and update course (49ms)
      PUT /coursesCertain/:id/:teacherName/CHour
       when id is valid
         √ should return a message and change class hours (56ms)
       when id is invalid
         √ should return a 404 and a message for invalid course id (39ms)
       when authentication not enough
         √ should return message authentication not enough
      PUT /coursesCerNum/:id/:teacherName/CNum
       when id is valid
         √ should return a message and change student numbers (61ms)
       when id is invalid
         √ should return a 404 and a message for invalid course id
       when authentication not enough
         √ should return message authentication not enough
      PUT /courses/:id/:teacherName/Teacher
       when id is valid
         √ should return a message and change teacher name (62ms)
       when id is invalid
         √ should return a 404 and a message for invalid course id
       when authentication not enough
         √ should return message authentication not enough
      DELETE/courses/:id
        when id is valid
         √ should return delete message  (78ms)
        when id is invalid
         √ should return a 404 and a message for invalid course id

    22 passing (2s)
    $



    $ F:\Agile Software Practice\coursestest>npm test

    > coursestest@0.0.0 test F:\Agile Software Practice\coursestest
    > set NODE_ENV=test && mocha test/routes/teacher-test.js

    Teacher
      GET /teacher
      Successfully Connected to [ testcourses ]
      Successfully Connected to [ testcourses ]
      Successfully Connected to [ testcourses ]
         √ should return all the teachers in an array (322ms)
      GET /teacher/:id
         √ should return the teacher with the certain ID (45ms)
      GET /teacherName/:name
         √ should return the teacher with the certain name
         √ should return null for invalid name
      GET /teacherElements/:department
         √ should return teacher with the keyword in department
         √ should return null for invalid keywords
      POST /teacher
         √ should return confirmation message (55ms)
      PUT /teacher/:id
       when id is valid
         √ should return a message and change department
       when id is invalid
         √ should return a 404 and a message for invalid teacher id
      PUT /teacherMajor/:id
       when id is valid
         √ should return a message and change major (122ms)
       when id is invalid
         √ should return a 404 and a message for invalid teacher id
      DELETE/teacher/:id
       when id is valid
         √ should return delete message  (76ms)
       when id is invalid
         √ should return a 404 and a message for invalid teacher id

    13 passing (1s)
    $



    $ F:\Agile Software Practice\coursestest>npm test

    > coursestest@0.0.0 test F:\Agile Software Practice\coursestest
    > set NODE_ENV=test && mocha test/routes/student-test.js

    Student
     GET /student
     Successfully Connected to [ testcourses ]
     Successfully Connected to [ testcourses ]
     Successfully Connected to [ testcourses ]
         √ should return all the students in an array (314ms)
     GET /student/:id
         √ should return the student with the certain ID
     GET /studentName/:name
         √ should return the student with the certain name
         √ should return null for invalid name
     GET /studentElements/:name
         √ should return student with the keyword in name
         √ should return null for invalid keywords
     POST /student
         √ should return confirmation message (58ms)
     PUT /student/:id
      when id is valid
         √ should return a message and change category (40ms)
      when id is invalid
         √ should return a 404 and a message for invalid student id
     PUT /studentMajor/:id
      when id is valid
         √ should return a message and change major (132ms)
      when id is invalid
         √ should return a 404 and a message for invalid student id
     DELETE/student/:id
      when id is valid
         √ should return delete message  (74ms)
      when id is invalid
         √ should return a 404 and a message for invalid student id

    13 passing (1s)
    $


[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
. . . . Briefly state any extra features of your testing that you feel should be high-lighted . . . . .

I have done these in my test shown as below:
1. Git -  log shows coherent, sustained progress ; Use gitignore policy.
2. Testing – 3 REST resources (3 test files); Clear test cases (it block specifications); Before/After hooks; Some exception testing.
3. Git – Branch-Edit-Merge workflow; 
4. Commit ‘work units’; 
   $F:\Agile Software Practice\coursestest>git rebase -i af9dfe77c98512fe37cdf931d91b0c96cbe98099
     [detached HEAD 7195e0e] courses-testing
     Date: Tue Nov 6 10:06:30 2018 +0800
     2 files changed, 51 insertions(+), 33 deletions(-)
     Successfully rebased and updated refs/heads/master.
   $
5. Rollback;
   When I tested teacher-test, I found somgthing wrong, then I use git-reset to return to the latest correct commit.
   Also , I commit "test rollback" ,then: 
     $ git revert d762695a187e2507517eea55ab560dfe6403b299 , we can get that: 
     $ d0db710 (HEAD -> master) HEAD@{0}: revert: Revert "test rollback"
   To revert all the local actions from 70a3692d38ebaa0f2 up to “HEAD,” use the following:
     $ git revert d762695a187e2507517eea55ab560dfe6403b299 HEAD
   After checking out the remote repository, we can first use git revert and then push as usual:
     $ git revert d762695a187e2507517eea55ab560dfe6403b299
       git push origin
6. Testing – Test code structure (nested describe blocks); 
7. Database integration;
   To connect the database to the Express application, simply load the appropriate Node. JS driver for the database in the application.
      var mongodbUri ='mongodb://test:dreammj01@ds151453.mlab.com:51453/testcourses';
      mongoose.connect(mongodbUri,{ useNewUrlParser: true });
8. Git –  Excellent practice;
   git init , git status , git add , git commit -m , git log , git push , git log -p , git diff , git diff HEAD , git branch , git checkout -b , git pull 
   git checkout , git checkout - , git checkout master , git marge , git log --graph , git reset , git reset --hrash , git reflog , git rebase -i
9. Exception and (meaningful) Boundary cases;
   For the model "courses",there are two arrtibutes 
       classHours at the interval of[20,42] ,  studentNumbers at the interval of[25,60]
   The boundary cases are:
       <33,25> , <33,26> , <33,24> , <33,59> , <33,60> , <33,61> , <19,18> , <20,18> , <21,18> , <41,18> , <42,18> , <43,18> 
10. Testing – Authentication;
   You can find these at : GET /courses/:id
                          PUT /coursesCertain/:id/:teacherName/CHour
			  PUT /coursesCerNum/:id/:teacherName/CNum
			  PUT /courses/:id/:teacherName/Teacher
