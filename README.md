people-ui
===============================
An AngularJS UI front for [people-restful] (https://github.com/coder-weiru/people-restful) service

###1. Technologies used
* AngularJS 1.3.0
* Bootstrap 3.2.0
* NodeJS http-server
* Node, Grunt, Bower, Karma

###2. Development IDE
* Brackets

###3. How to run the UI
* Using remote people-restful service at ```http://54.85.4.139:8181/people-restful-1.0.0-SNAPSHOT```
 
 (A docker tomcat instance hosting the people-restful REST service has been deployed to AWS EC2 server. )
 
 1. Git clone https://github.com/coder-weiru/people-restful
 2. Modify URL value in /app/scripts/services/peopleService.js to point to ```http://54.85.4.139:8181/people-restful-1.0.0-SNAPSHOT```
 3. If your browser does not complain about cross-origin violation, you can directly open /app/index.html
 4. If your browser complains about cross-origin violation, a local http-server is needed to serve the UI content. (eg. NodeJS http-server)
 5. In case of using Node http-server, run ```npm start``` to start the http server
 6. People-restful service data should be served via this AngularJS app.
  
* Using local people-restful service at ```http://localhost:8080/people-restful```

 (Please refer to [people-restful] (https://github.com/coder-weiru/people-restful) document to start the service at localhost:8080)

 1. git clone https://github.com/coder-weiru/people-restful
 2. Modify URL value in /app/scripts/services/peopleService.js to point to ```http://localhost:8080/people-restful```
 3. If using Mozilla Firefox browser, you can directly open /app/index.html
 4. If your browser complains about cross-origin violation, a local http-server is needed to serve the UI content. (eg. NodeJS http-server)
 5. In case of using Node http-server, run ```npm start``` to start the http server
 6. People-restful service data should be served via this AngularJS app.