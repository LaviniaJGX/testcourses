let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash' );

describe('Student', function (){
    // TODO
	describe('GET /student',  () => {
         it('should return all the students in an array', function(done) {
              chai.request(server)
              .get('/student')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(8);
                   let result = _.map(res.body, (student) => {
                        return { name:student.name,
                             studentCategory:student.studentCategory,
                             coursesNumbers:student.coursesNumbers,
                             major:student.major
			            };
                   });
                   expect(result).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Software Engineering"  } );
		           expect(result).to.include( { name:"xiao wang",studentCategory:"undergraduate",coursesNumbers:2,major:"Software Engineering"});
				   expect(result).to.include( { name:"xiao hong",studentCategory:"postgraduate",coursesNumbers:4,major:"Communication Engineering"   } );
		           expect(result).to.include( { name:"xiao liu",studentCategory:"undergraduate",coursesNumbers:5,major:"Software Engineering"  } );
		           expect(result).to.include( { name:"xiao zhang",studentCategory:"postgraduate",coursesNumbers:2,major:"Communication Engineering"  } );
		           expect(result).to.include( { name:"xiao yan",studentCategory:"postgraduate",coursesNumbers:1,major:"English Learning" } );
		           expect(result).to.include( { name:"xiao mao",studentCategory:"undergraduate" ,coursesNumbers:6,major:"Mathmatical Formatting" } );
		           expect(result).to.include( { name:"xiao feng",studentCategory:"postgraduate",coursesNumbers:5,major:"Designing"  } );
                   done();
              });
         });
    });

    describe('GET /student/:id',  () => {
         it('should return the student with the certain ID', function(done) {
              chai.request(server)
              .get('/student/5bddb8c26dac4604e4af91b6')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   let result = _.map(res.body, (student) => {
                        return {name:student.name,
                             studentCategory:student.studentCategory,
                             coursesNumbers:student.coursesNumbers,
                             major:student.major
			            };
                   });
		           expect(result).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Software Engineering"});
                   done();
              });
         });
    });

    describe('GET /studentName/:name',  () => {
         it('should return the student with the certain name', function(done) {
              chai.request(server)
              .get('/studentName/xiao ming')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   let result = _.map(res.body, (student) => {
                        return { name:student.name,
                             studentCategory:student.studentCategory,
                             coursesNumbers:student.coursesNumbers,
                             major:student.major
			            };
                   });
		           expect(result).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Software Engineering"});
                   done();
              });
         });
		 it('should return null for invalid name', function(done) {
              chai.request(server)
              .get('/studentName/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   done();
              });
         });
    });


    describe('GET /studentElements/:name',  () => {
         it('should return student with the keyword in name', function(done) {
              chai.request(server)
              .get('/studentElements/m')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(2);
                   let result = _.map(res.body, (student) => {
                        return { name:student.name,
                             studentCategory:student.studentCategory,
                             coursesNumbers:student.coursesNumbers,
                             major:student.major
			            };
                   });
				   expect(result).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Software Engineering"  } );
                   expect(result).to.include( { name:"xiao mao",studentCategory:"undergraduate" ,coursesNumbers:6,major:"Mathmatical Formatting" } );
		           done();
              });
         });
		 it('should return null for invalid keywords', function(done) {
              chai.request(server)
              .get('/studentElements/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   done();
              });
         });
    });

	describe('POST /student', function () {
         it('should return confirmation message', function(done) {
              let student = { 
                   name:"xiao xiao",
                   studentCategory:"undergraduate",
                   coursesNumbers:4,
                   major:"Designing"
              };
              chai.request(server)
              .post('/student')
              .send(student)
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('message').equal('Student Added Successfully!' ); 
                   done();
              });
         });
	     after(function  (done) {
              chai.request(server)
              .get('/student')
              .end(function(err, res) {
                   let result = _.map(res.body, (student) => {
                        return {name:student.name,
                             studentCategory:student.studentCategory,
                             coursesNumbers:student.coursesNumbers,
                             major:student.major
					    };
                   });
                   expect(result).to.include( { name:"xiao xiao",studentCategory:"undergraduate",coursesNumbers:4,major:"Designing"});
				   done();
              });
          });  // end-after
    }); // end-describe

    describe('PUT /student/:id',  () => {
		describe('when id is valid',function(){
              it('should return a message and change category', function(done) {
			       let student = { 
                        studentCategory:"postgraduate", 
                   };
                   chai.request(server)
                   .put('/student/5bddb8c26dac4604e4af91b6')
				   .send(student)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let student = res.body.data ;
				        expect(res.body).to.have.equal('Category changed successfully!' );
						//expect(student).to.include( { name:"xiao ming",studentCategory:"postgraduate",coursesNumbers:3,major:"Software Engineering"});
                        done();
                   });
              });
			  after(function  (done) {
                   chai.request(server)
                   .get('/student')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {name:student.name,
                                  studentCategory:student.studentCategory,
                                  coursesNumbers:student.coursesNumbers,
                                  major:student.major
					         };
                         });
                   });
                   let student = { 
                        studentCategory:"undergraduate", 
                   };
				   chai.request(server)
                   .put('/student/5bddb8c26dac4604e4af91b6')
				   .send(student)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after

	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid student id', function(done) {
                   chai.request(server)
                   .put('/student/344344')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Student NOT Found! ' ) ;
                        done();
                   });
              });
         });
	});
  
    describe.only('PUT /studentMajor/:id',  () => {
		describe('when id is valid',function(){
              it('should return a message and change major', function(done) {
			       let student = { 
                        major:"Art" , 
                   };
                   chai.request(server)
                   .put('/studentMajor/5bddb8c26dac4604e4af91b6')
				   .send(student)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let student = res.body.data ;
				        expect(res.body).to.have.equal('Major changed successfully!' );
						//expect(student).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Art"});
                        done();
                   });
              });
			  after(function  (done) {
                   chai.request(server)
                   .get('/student')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {name:student.name,
                                  studentCategory:student.studentCategory,
                                  coursesNumbers:student.coursesNumbers,
                                  major:student.major
					         };
                         });
				         //done();
                   });
                   let student = { 
                        major:"Software Engineering", 
                   };
				   chai.request(server)
                   .put('/studentMajor/5bddb8c26dac4604e4af91b6')
				   .send(student)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after
	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid student id', function(done) {
                   chai.request(server)
                   .put('/studentMajor/344344')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Student NOT Found! ' ) ;
                        done();
                   });
              });
         });
	});

    describe('DELETE/student/:id',  () => {
	     describe('when id is valid',function(){
		      it('should return delete message ', function(done) {
                   chai.request(server)
				   .get('/student')
				   .end(function(err, res) {
					    const addID = res.body[8]._id;
                        chai.request(server)
                        .delete('/student/' + addID)
						.end(function(err, res) {
                             expect(res).to.have.status(200);
                             expect(res.body).to.have.property('message').equal('Student Deleted successfully!' ); 
                             done();
                        });
				   });   
              });
		      after(function  (done) {
                   chai.request(server)
                   .get('/student')
                   .end(function(err, res) {
                       let result = _.map(res.body, (student) => {
                             return { name:student.name,
                                  studentCategory:student.studentCategory,
                                  coursesNumbers:student.coursesNumbers,
                                  major:student.major
			                 };
                        });
                        expect(result).to.include( { name:"xiao ming",studentCategory:"undergraduate",coursesNumbers:3,major:"Software Engineering"  } );
		                expect(result).to.include( { name:"xiao wang",studentCategory:"undergraduate",coursesNumbers:2,major:"Software Engineering"});
				        expect(result).to.include( { name:"xiao hong",studentCategory:"postgraduate",coursesNumbers:4,major:"Communication Engineering"   } );
		                expect(result).to.include( { name:"xiao liu",studentCategory:"undergraduate",coursesNumbers:5,major:"Software Engineering"  } );
		                expect(result).to.include( { name:"xiao zhang",studentCategory:"postgraduate",coursesNumbers:2,major:"Communication Engineering"  } );
		                expect(result).to.include( { name:"xiao yan",studentCategory:"postgraduate",coursesNumbers:1,major:"English Learning" } );
		                expect(result).to.include( { name:"xiao mao",studentCategory:"undergraduate" ,coursesNumbers:6,major:"Mathmatical Formatting" } );
		                expect(result).to.include( { name:"xiao feng",studentCategory:"postgraduate",coursesNumbers:5,major:"Designing"  } );
                        done();
                   });
              });  // end-after
         });
         describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid student id', function(done) {
                  chai.request(server)
                  .delete('/student/1100001')
                  .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Cant find Student, Student NOT Deleted!' ) ;
                        done();
                   });
              });
	     });
    });
});
