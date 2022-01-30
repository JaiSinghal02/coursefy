<h1>COURSEFY</h1>

This is an API for booking study courses.

<h3>Features:</h3>
<ul>
<li>You can create new users. No user authentication but identification through unique emails.</li>
<li>You can create new courses.</li>
<li>User can enroll in a mutlitple courses.</li>
<li>All the courses have a capacity of 5 users which can be enrolled.</li>
<li>Any new user enrolling for a course already at full capcaity is put in waiting list for that course.</li>
<li>User can un-enroll from a course only within 30 minutes of enrolling in course. This applies to users in the waiting list as well.</li>
<li>If a user in enrolled list un-enrolls within 30 minutes, then the first user in waiting list (if any) is put in the enroll list of that course.</li>
</ul>

<br/>
<br/>

<h3>Run Locally:</h3>
<label>Enter commands in a terminal</label>
<ul>
<li>git clone https://github.com/JaiSinghal02/coursefy.git</li>
<li>Inside the root folder run the following commands:</li>
<ul>
<li>npm install</li>
<li>npm start</li>

</ul>
<li>Check in console whether the server is running and on which port.</li>
<li>Open <a href="https://www.postman.com/downloads/">Postman</a> and hit the available requests on http://localhost:PORT where PORT is the port number on which server is running.</li>
<li>For ex. If server is running on PORT = 4000 then URL will be http://localhost:4000 </li>
</ul>

<br/>
<br/>


<h3>Available API:</h3>
<p>Base URL is <strong>http://localhost:PORT</strong> where PORT is the port number on which server is running.</p>
<label>User API</label>
<ul>
<li>(POST) <b>/user/signup</b>: To create new user. Request body must have following key value pairs:</li>
<ul>
<li>name: User name</li>
<li>email: User email</li>
</ul>
<li>(GET) <b>/user</b>: To get all user in database</li>
</ul>

<label>Course API</label>
<ul>
<li>(GET) <b>/course/available</b>: To get the data of all courses in database</li>
<li>(GET) <b>/course/information</b>: To get the data for a particular course. Request body must have following key value pair:</li>
<ul>
<li>courseName: Course Name</li>
</ul>
<li>(POST) <b>/course/new</b>: To create new course. Request body must have following key value pair:</li>
<ul>
<li>courseName: Course Name</li>
</ul>
<li>(POST) <b>/course/enroll</b>: To enroll in a available course. Request body must have following key value pair:</li>
<ul>
<li>email: Registered user email</li>
<li>courseName: Course Name</li>
</ul>
<li>(POST) <b>/course/cancel</b>: To un-enroll from a course. Request body must have following key value pair:</li>
<ul>
<li>email: Registered user email</li>
<li>courseName: Course Name</li>
</ul>
</ul>

<p> <i>Note: The request body must be a JSON object with key names as specified above and proper values.</i></p>
