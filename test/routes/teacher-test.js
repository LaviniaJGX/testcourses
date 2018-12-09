import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
import _ from 'lodash';
import things from 'chai-things'
chai.use( things);
chai.use(chaiHttp);

describe('Teacher', function (){
    // TODO
	describe('GET /teacher',  () => {
         it('should return all the teachers in an array', function(done) {
              chai.request(server)
              .get('/teacher')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(8);
                   let result = _.map(res.body, (teacher) => {
                        return { name:teacher.name,
                             teacherType:teacher.teacherType,
                             teacherGender:teacher.teacherGender,
                             department:teacher.department,
                             departmentMajor:teacher.departmentMajor
			            };
                   });
                   expect(result).to.include( { name:"Lily",teacherType:"common",teacherGender:"female",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		           expect(result).to.include( { name:"David",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"});
				   expect(result).to.include( { name:"Amanda",teacherType:"admin",teacherGender:"female",department:"Science and Technology",departmentMajor:"Communication Engineering"   } );
		           expect(result).to.include( { name:"April",teacherType:"common",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		           expect(result).to.include( { name:"Sky",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Communication Engineering"  } );
		           expect(result).to.include( { name:"Lucy",teacherType:"common",teacherGender:"female",department:"Language and Culture",departmentMajor:"English Learning" } );
		           expect(result).to.include( { name:"Lavinia",teacherType:"admin" ,teacherGender:"female",department:"Mathmatice",departmentMajor:"Mathmatical Formatting" } );
		           expect(result).to.include( { name:"Anease",teacherType:"common",teacherGender:"male",department:"Art and Design",departmentMajor:"Designing"  } );
                   done();
              });
         });
    });

    describe('GET /teacher/:id',  () => {
         it('should return the teacher with the certain ID', function(done) {
              chai.request(server)
              .get('/teacher/5bddb8586dac4604e4af91af')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   let result = _.map(res.body, (teacher) => {
                        return { name:teacher.name,
                             teacherType:teacher.teacherType,
                             teacherGender:teacher.teacherGender,
                             department:teacher.department,
                             departmentMajor:teacher.departmentMajor
			            };
                   });
		           expect(result).to.include( { name:"David",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"});
                   done();
              });
         });
		 /*it('should return a 404 and a message for invalid teacher id', function(done) {
              chai.request(server)
              .get('/teacher/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(404);
				   expect(res.body).to.have.property('message','Teacher NOT Found!!' ) ;
                   done();
              });
         });*/
    });

    describe('GET /teacherName/:name',  () => {
         it('should return the teacher with the certain name', function(done) {
              chai.request(server)
              .get('/teacherName/David')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(1);
                   let result = _.map(res.body, (teacher) => {
                        return { name:teacher.name,
                             teacherType:teacher.teacherType,
                             teacherGender:teacher.teacherGender,
                             department:teacher.department,
                             departmentMajor:teacher.departmentMajor
			            };
                   });
		           expect(result).to.include( { name:"David",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"});
                   done();
              });
         });
		 it('should return null for invalid name', function(done) {
              chai.request(server)
              .get('/teacherName/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   done();
              });
         });
    });


    describe('GET /teacherElements/:department',  () => {
         it('should return teacher with the keyword in department', function(done) {
              chai.request(server)
              .get('/teacherElements/s')
		      .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.be.a('array');
                   expect(res.body.length).to.equal(6);
                   let result = _.map(res.body, (teacher) => {
                        return { name:teacher.name,
                             teacherType:teacher.teacherType,
                             teacherGender:teacher.teacherGender,
                             department:teacher.department,
                             departmentMajor:teacher.departmentMajor
			            };
                   });
                   expect(result).to.include( { name:"Lily",teacherType:"common",teacherGender:"female",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		           expect(result).to.include( { name:"David",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"});
				   expect(result).to.include( { name:"Amanda",teacherType:"admin",teacherGender:"female",department:"Science and Technology",departmentMajor:"Communication Engineering"   } );
		           expect(result).to.include( { name:"April",teacherType:"common",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		           expect(result).to.include( { name:"Sky",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Communication Engineering"  } );
                   expect(result).to.include( { name:"Anease",teacherType:"common",teacherGender:"male",department:"Art and Design",departmentMajor:"Designing"  } );
                   done();
              });
         });
		 it('should return null for invalid keywords', function(done) {
              chai.request(server)
              .get('/teacherElements/2876487469387')
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   done();
              });
         });
    });

	describe('POST /teacher', function () {
         it('should return confirmation message', function(done) {
              let teacher = {
                   name:"Jay",
                   teacherType:"admin",
                   teacherGender:"male",
                   department:"Art and Design",
                   departmentMajor:"Designing"
              };
              chai.request(server)
              .post('/teacher')
              .send(teacher)
              .end(function(err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body).to.have.property('message').equal('Teacher Added Successfully!' );
                   done();
              });
         });
	     after(function  (done) {
              chai.request(server)
              .get('/teacher')
              .end(function(err, res) {
                   let result = _.map(res.body, (teacher) => {
                        return {
							 name:teacher.name,
                             teacherType:teacher.teacherType,
                             teacherGender:teacher.teacherGender,
                             department:teacher.department,
                             departmentMajor:teacher.departmentMajor
					    };
                   });
                   expect(result).to.include( { name:"Jay",teacherType:"admin",teacherGender:"male",department:"Art and Design",departmentMajor:"Designing"});
				   done();
              });
          });  // end-after
    }); // end-describe

    describe('PUT /teacher/:id',  () => {
		describe('when id is valid',function(){
              it('should return a message and change department', function(done) {
			       let teacher = {
                        department: "Art and Design",
                   };
                   chai.request(server)
                   .put('/teacher/5bddb84c6dac4604e4af91ae')
				   .send(teacher)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let teacher = res.body.data ;
				        expect(res.body).to.have.equal('Department changed successfully!' );
                        done();
                   });
              });
			  after(function  (done) {
                   chai.request(server)
                   .get('/teacher')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {name:teacher.name,
                                  teacherType:teacher.teacherType,
                                  teacherGender:teacher.teacherGender,
                                  department:teacher.department,
                                  departmentMajor:teacher.departmentMajor
					         };
                         });
                   });
                   let teacher = {
                        department: "Science and Technology",
                   };
				   chai.request(server)
                   .put('/teacher/5bddb84c6dac4604e4af91ae')
				   .send(teacher)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after

	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid teacher id', function(done) {
                   chai.request(server)
                   .put('/teacher/344344')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Teacher NOT Found! ' ) ;
                        done();
                   });
              });
         });
	});

    describe('PUT /teacherMajor/:id',  () => {
		describe('when id is valid',function(){
              it('should return a message and change major', function(done) {
			       let teacher = {
                        departmentMajor:"Designing" ,
                   };
                   chai.request(server)
                   .put('/teacherMajor/5bddb84c6dac4604e4af91ae')
				   .send(teacher)
                   .end(function(err, res) {
                        expect(res).to.have.status(200);
				        let teacher = res.body.data ;
				        expect(res.body).to.have.equal('Major changed successfully!' );
                        done();
                   });
              });
			  after(function  (done) {
                   chai.request(server)
                   .get('/teacher')
                   .end(function(err, res) {
                        let result = _.map(res.body, (student) => {
                             return {name:teacher.name,
                                  teacherType:teacher.teacherType,
                                  teacherGender:teacher.teacherGender,
                                  department:teacher.department,
                                  departmentMajor:teacher.departmentMajor
					         };
                         });
                   });
                   let teacher = {
                        departmentMajor: "Software Engineering",
                   };
				   chai.request(server)
                   .put('/teacherMajor/5bddb84c6dac4604e4af91ae')
				   .send(teacher)
                   .end(function(err, res) {
                        done();
                   });
              });  // end-after
	     });
		 describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid teacher id', function(done) {
                   chai.request(server)
                   .put('/teacherMajor/344344')
                   .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Teacher NOT Found! ' ) ;
                        done();
                   });
              });
         });
	});

    describe('DELETE/teacher/:id',  () => {
	     describe('when id is valid',function(){
		      it('should return delete message ', function(done) {
                   chai.request(server)
				   .get('/teacher')
				   .end(function(err, res) {
					    const addID = res.body[8]._id;
                        chai.request(server)
                        .delete('/teacher/' + addID)
						.end(function(err, res) {
                             expect(res).to.have.status(200);
                             expect(res.body).to.have.property('message').equal('Teacher Deleted successfully!' );
                             done();
                        });
				   });
              });
		      after(function  (done) {
                   chai.request(server)
                   .get('/teacher')
                   .end(function(err, res) {
                       let result = _.map(res.body, (teacher) => {
                             return { name:teacher.name,
                                  teacherType:teacher.teacherType,
                                  teacherGender:teacher.teacherGender,
                                  department:teacher.department,
                                  departmentMajor:teacher.departmentMajor
			                 };
                        });
                        expect(result).to.include( { name:"Lily",teacherType:"common",teacherGender:"female",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		                expect(result).to.include( { name:"David",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"});
				        expect(result).to.include( { name:"Amanda",teacherType:"admin",teacherGender:"female",department:"Science and Technology",departmentMajor:"Communication Engineering"   } );
		                expect(result).to.include( { name:"April",teacherType:"common",teacherGender:"male",department:"Science and Technology",departmentMajor:"Software Engineering"  } );
		                expect(result).to.include( { name:"Sky",teacherType:"admin",teacherGender:"male",department:"Science and Technology",departmentMajor:"Communication Engineering"  } );
		                expect(result).to.include( { name:"Lucy",teacherType:"common",teacherGender:"female",department:"Language and Culture",departmentMajor:"English Learning" } );
		                expect(result).to.include( { name:"Lavinia",teacherType:"admin" ,teacherGender:"female",department:"Mathmatice",departmentMajor:"Mathmatical Formatting" } );
		                expect(result).to.include( { name:"Anease",teacherType:"common",teacherGender:"male",department:"Art and Design",departmentMajor:"Designing"  } );
						done();
                   });
              });  // end-after
         });
         describe('when id is invalid',function(){
		      it('should return a 404 and a message for invalid teacher id', function(done) {
                  chai.request(server)
                  .delete('/teacher/1100001')
                  .end(function(err, res) {
                        expect(res).to.have.status(404);
                        expect(res.body).to.have.property('message','Cant find Teacher, Teacher NOT Deleted!' ) ;
                        done();
                   });
              });
	     });
    });
});
