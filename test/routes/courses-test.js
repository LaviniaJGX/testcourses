let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );
describe('Courses', function (){
    // TODO
	describe('GET /courses',  () => {
         it('should return all the courses in an array', function(done) {
              chai.request(server)
              .get('/courses')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(8);
                   let result = _.map(res.body, (course) => {
                        return { courseTitle: course.courseTitle, 
                             classHours: course.classHours,
				             studentNumbers: course.studentNumbers,
				             studentCategory: course.studentCategory,
				             teacherName: course.teacherName,
				             teacherType: course.teacherType,
			            };
                   });
                   expect(result).to.include( { courseTitle:"Database System",classHours:42,studentNumbers:35,studentCategory:"postgraduate",teacherName:"Lily",teacherType:"common"  } );
		           expect(result).to.include( { courseTitle:"Software Architecture",classHours:40,studentNumbers:40,studentCategory:"postgraduate",teacherName:"David",teacherType:"admin"});
				   expect(result).to.include( { courseTitle:"Computer Networks",classHours:35,studentNumbers:45,studentCategory:"postgraduate",teacherName:"Amanda",teacherType:"admin"  } );
		           expect(result).to.include( { courseTitle:"Client Programming",classHours:30,studentNumbers:50,studentCategory:"undergraduate",teacherName:"April",teacherType:"common"  } );
		           expect(result).to.include( { courseTitle:"Computer Basics",classHours:28,studentNumbers:55,studentCategory:"undergraduate",teacherName:"Sky",teacherType:"admin"  } );
		           expect(result).to.include( { courseTitle:"College English",classHours:25,studentNumbers:60,studentCategory:"undergraduate",teacherName:"Lucy",teacherType:"common" } );
		           expect(result).to.include( { courseTitle:"Math",classHours:33,studentNumbers:33,studentCategory:"undergraduate",teacherName:"Lavinia",teacherType:"admin"  } );
		           expect(result).to.include( { courseTitle:"Art appreciation",classHours:20,studentNumbers:25,studentCategory:"postgraduate",teacherName:"Anease",teacherType:"common"  } );
                   done();
              });
         });
    });

    describe('GET /courses/:id',  () => {
         it('should return message authentication not enough', function(done) {
              chai.request(server)
              .get('/courses/5bddb6a96dac4604e4af91a5')
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.equal('You are not the administrant ! You can not see all courses!' ) ;
                   done();
              });
         });
         it('should return the course with the certain ID', function(done) {
              chai.request(server)
              .get('/courses/5bddb6b56dac4604e4af91a6')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   let result = _.map(res.body, (course) => {
                        return { courseTitle: course.courseTitle, 
                             classHours: course.classHours,
				             studentNumbers: course.studentNumbers,
				             studentCategory: course.studentCategory,
				             teacherName: course.teacherName,
				             teacherType: course.teacherType,
			            };
                   });
		           expect(result).to.include( { courseTitle:"Software Architecture",classHours:40,studentNumbers:40,studentCategory:"postgraduate",teacherName:"David",teacherType:"admin"  } );
                   done();
              });
         });
		 it('should return a 404 and a message for invalid course id', function(done) {
              chai.request(server)
              .get('/courses/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(404);
				   expect(res.body).to.have.property('message','Invalid id or teacherName,Do not match!' ) ;
                   done();
              });
         });
    });
    
    describe('GET /coursesNumbers/numbers',  () => {
         it('should return total student numbers', function(done) {
              chai.request(server)
              .get('/coursesNumbers/numbers')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   expect(res.body).to.include( { totalNumbers: 253 } );
                   done();
              });
         });
		 it('should return a 404 for error message', function(done) {
              chai.request(server)
              .get('/coursesNumbers/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(404);
                   done();
              });
         });
    });
    
	describe('GET /coursesHours/hours',  () => {
         it('should return total courses hours', function(done) {
              chai.request(server)
              .get('/coursesHours/hours')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   expect(res.body).to.include( { totalHours: 253 } );
                   done();
              });
         });
		 it('should return a 404 for error message', function(done) {
              chai.request(server)
              .get('/coursesHours/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(404);
                   done();
              });
         });
    });

    describe('GET /coursesElements/:courseTitle',  () => {
         it('should return courses with the keyword in course title', function(done) {
              chai.request(server)
              .get('/coursesElements/m')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(5);
                  let result = _.map(res.body, (course) => {
                        return { courseTitle: course.courseTitle, 
                             classHours: course.classHours,
				             studentNumbers: course.studentNumbers,
				             studentCategory: course.studentCategory,
				             teacherName: course.teacherName,
				             teacherType: course.teacherType,
			            };
                   });
                   expect(result).to.include( { courseTitle:"Database System",classHours:42,studentNumbers:35,studentCategory:"postgraduate",teacherName:"Lily",teacherType:"common"  } );
				   expect(result).to.include( { courseTitle:"Computer Networks",classHours:35,studentNumbers:45,studentCategory:"postgraduate",teacherName:"Amanda",teacherType:"admin"  } );
		           expect(result).to.include( { courseTitle:"Client Programming",classHours:30,studentNumbers:50,studentCategory:"undergraduate",teacherName:"April",teacherType:"common"  } );
		           expect(result).to.include( { courseTitle:"Computer Basics",classHours:28,studentNumbers:55,studentCategory:"undergraduate",teacherName:"Sky",teacherType:"admin"  } );
				   expect(result).to.include( { courseTitle:"Math",classHours:33,studentNumbers:33,studentCategory:"undergraduate",teacherName:"Lavinia",teacherType:"admin"  } );
                   done();
              });
         });
		 it('should return a 404 for error message', function(done) {
              chai.request(server)
              .get('/coursesElements/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(404);
                   expect(res.body).to.have.property('message','Course Not Found!!' ) ;
                   done();
              });
         });
    });

	describe('POST /courses', function () {
         it('should return confirmation message and update course', function(done) {
              let course = { 
                   courseTitle: 'Art' , 
                   classHours: 10, 
                   studentNumbers: 10,
			       studentCategory:'undergraduate',
			       teacherName:'Jay',
			       teacherType:'admin'
              };
              chai.request(server)
              .post('/courses')
              .send(course)
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('message').equal('Course Added Successfully!' ); 
                   done();
              });
         });
	     after(function  (done) {
              chai.request(server)
              .get('/courses')
              .end(function(err, res) {
                   let result = _.map(res.body, (course) => {
                        return { 
							 courseTitle: course.courseTitle, 
                             classHours: course.classHours,
							 studentNumbers: course.studentNumbers,
							 studentCategory: course.studentCategory,
							 teacherName: course.teacherName,
							 teacherType: course.teacherType,
					    };
                   });
                   expect(result).to.include( { courseTitle: 'Art',classHours: 10,studentNumbers: 10,studentCategory:'undergraduate',teacherName:'Jay',teacherType:'admin'  } );
                   done();
              });
          });  // end-after
    }); // end-describe

    describe('PUT /coursesCertain/:id/:teacherName/CHour',  () => {
		describe('when id is valid',function(){
              it('should return a message and change class hours', function(done) {
			       let course = { 
                        classHours: 20, 
                   };
                   chai.request(server)
                   .put('/coursesCertain/5bddb6b56dac4604e4af91a6/David/CHour')
				   .send(course)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let course = res.body.data ;
				        expect(res.body).to.have.equal('ClassHours changed successfully!' );
                        done();
                   });
              });
			   after(function  (done) {
                   chai.request(server)
                   .get('/courses')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {courseTitle: course.courseTitle, 
                                  classHours: course.classHours,
							      studentNumbers: course.studentNumbers,
							      studentCategory: course.studentCategory,
							      teacherName: course.teacherName,
							      teacherType: course.teacherType,
					         };
                         });
                   });
                   let course = { 
                        classHours: 40,  
                   };
				   chai.request(server)
                   .put('/coursesCertain/5bddb6b56dac4604e4af91a6/David/CHour')
				   .send(course)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after

	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid course id', function(done) {
                   chai.request(server)
                   .put('/coursesCertain/1100001/Jay/CHour')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Course NOT Found! ' ) ;
                        done();
                   });
              });
	     });
         describe('when authentication not enough',function(){
		      it('should return message authentication not enough', function(done) {
                   chai.request(server)
                   .put('/coursesCertain/5bddb6f66dac4604e4af91ac/Anease/CHour')
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                   });
              });
         });
	});
  
    describe('PUT /coursesCerNum/:id/:teacherName/CNum',  () => {
		describe('when id is valid',function(){
              it('should return a message and change student numbers', function(done) {
			       let course = { 
			            studentNumbers:20,
                   };
                   chai.request(server)
                   .put('/coursesCerNum/5bddb6b56dac4604e4af91a6/David/CNum')
			       .send(course)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
                        let course = res.body.data ;
				        expect(res.body).to.have.equal('StudentNumbers changed successfully!' );
                        done();
                   });
              });
			  after(function  (done) {
                   chai.request(server)
                   .get('/courses')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {courseTitle: course.courseTitle, 
                                  classHours: course.classHours,
							      studentNumbers: course.studentNumbers,
							      studentCategory: course.studentCategory,
							      teacherName: course.teacherName,
							      teacherType: course.teacherType,
					         };
                         });
                   });
                   let course = { 
                        studentNumbers:40,  
                   };
				   chai.request(server)
                   .put('/coursesCerNum/5bddb6b56dac4604e4af91a6/David/CNum')
				   .send(course)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after

	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid course id', function(done) {
                   chai.request(server)
                   .put('/coursesCerNum/1100001/Jay/CNum')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        done();
                   });
              });
		 });
		 describe('when authentication not enough',function(){
		      it('should return message authentication not enough', function(done) {
                   chai.request(server)
                   .put('/coursesCerNum/5bddb6f66dac4604e4af91ac/Anease/CNum')
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                   });
			  });
         });
    });

	describe('PUT /courses/:id/:teacherName/Teacher',  () => {
		describe('when id is valid',function(){
              it('should return a message and change teacher name', function(done) {
			       let course = { 
				        teacherName:"Willian",
                   };
                   chai.request(server)
                   .put('/courses/5bddb6b56dac4604e4af91a6/David/Teacher')
			       .send(course)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let course = res.body.data ;
				        expect(res.body).to.have.equal('Teachers changed successfully!' );
                        done();
                   });
              });
		      after(function  (done) {
                   chai.request(server)
                   .get('/courses')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {courseTitle: course.courseTitle, 
                                  classHours: course.classHours,
							      studentNumbers: course.studentNumbers,
							      studentCategory: course.studentCategory,
							      teacherName: course.teacherName,
							      teacherType: course.teacherType,
					         };
                         });
                   });
                   let course = { 
                        teacherName:"David", 
                   };
				   chai.request(server)
                   .put('/courses/5bddb6b56dac4604e4af91a6/Willian/Teacher')
				   .send(course)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after

	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid course id', function(done) {
                   chai.request(server)
                   .put('/courses/1100001/Jay/Teacher')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        done();
                   });
              });
		 });
		 describe('when authentication not enough',function(){
		      it('should return message authentication not enough', function(done) {
                   chai.request(server)
                   .put('/courses/5bddb6f66dac4604e4af91ac/Anease/Teacher')
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
                        done();
                   });
			  });
         });
    });

    describe('DELETE/courses/:id',  () => {
	     describe('when id is valid',function(){
		      it('should return delete message ', function(done) {
				   chai.request(server)
				   .get('/courses')
				   .end(function(err, res) {
					    const addID = res.body[8]._id;
                        chai.request(server)
                        .delete('/courses/' + addID)
						.end(function(err, res) {
                             expect(res).to.have.status(200);
                             expect(res.body).to.have.property('message').equal('Course Successfully Deleted!' );  
                             done();
                        });
				   });  
              });
		      after(function  (done) {
                   chai.request(server)
                   .get('/courses')
                   .end(function(err, res) {
                        let result = _.map(res.body, (course) => {
                             return { 
								  courseTitle: course.courseTitle, 
                                  classHours: course.classHours,
							      studentNumbers: course.studentNumbers,
							      studentCategory: course.studentCategory,
							      teacherName: course.teacherName,
							      teacherType: course.teacherType,
					         };
                        });
                        expect(result).to.include( { courseTitle:"Database System",classHours:42,studentNumbers:35,studentCategory:"postgraduate",teacherName:"Lily",teacherType:"common"  } );
                        expect(result).to.include( { courseTitle:"Software Architecture",classHours:40,studentNumbers:40,studentCategory:"postgraduate",teacherName:"David",teacherType:"admin"  } );
					    expect(result).to.include( { courseTitle:"Computer Networks",classHours:35,studentNumbers:45,studentCategory:"postgraduate",teacherName:"Amanda",teacherType:"admin"  } );
					    expect(result).to.include( { courseTitle:"Client Programming",classHours:30,studentNumbers:50,studentCategory:"undergraduate",teacherName:"April",teacherType:"common"  } );
					    expect(result).to.include( { courseTitle:"Computer Basics",classHours:28,studentNumbers:55,studentCategory:"undergraduate",teacherName:"Sky",teacherType:"admin"  } );
					    expect(result).to.include( { courseTitle:"College English",classHours:25,studentNumbers:60,studentCategory:"undergraduate",teacherName:"Lucy",teacherType:"common" } );
					    expect(result).to.include( { courseTitle:"Math",classHours:33,studentNumbers:33,studentCategory:"undergraduate",teacherName:"Lavinia",teacherType:"admin"  } );
                        expect(result).to.include( { courseTitle:"Art appreciation",classHours:20,studentNumbers:25,studentCategory:"postgraduate",teacherName:"Anease",teacherType:"common"  } );
						done();
                   });
              });  // end-after
         });
         describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid course id', function(done) {
                  chai.request(server)
                  .delete('/courses/1100001')
                  .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Course NOT Deleted!' ) ;
                        done();
                   });
              });
	     });
    });
});
