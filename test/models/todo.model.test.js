  import sinon from 'sinon';
  import chai from 'chai';
  const expect = chai.expect;
  import mongoose from 'mongoose';
  import 'sinon-mongoose';
  //   require('sinon-mongoose') //why we need this
  //Importing our todo model for our unit testing. 
  import Todo from '../../src/models/todo.model';

  describe("Get all todos", () => {
      // Test will pass if we get all todos 
      it("should return all todos", function(done) {
          var TodoMock = sinon.mock(Todo);
          var expectedResult = { status: true, todo: [] };
          TodoMock.expects('find').yields(null, expectedResult);
          Todo.find(function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(result.status).to.be.true;
              done();
          });
      });
      // Test will pass if we fail to get a todo 
      it("should return error", function(done) {
          var TodoMock = sinon.mock(Todo);
          var expectedResult = { status: false, error: "Something went wrong" };
          TodoMock.expects('find').yields(expectedResult, null);
          Todo.find(function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(err.status).to.not.be.true;
              done();
          });
      });
  });

  // Test will pass if the todo is saved 
  describe("Post a new todo", function() {
      it("should create new post", function(done) {
          var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock' }));
          var todo = TodoMock.object;
          var expectedResult = { status: true };
          TodoMock.expects('save').yields(null, expectedResult);
          todo.save(function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(result.status).to.be.true;
              done();
          });
      }); // Test will pass if the todo is not saved 
      it("should return error, if post not saved", function(done) {
          var TodoMock = sinon.mock(new Todo({
              todo: 'Save new todo from mock'
          }));
          var todo = TodoMock.object;
          var expectedResult = { status: false };
          TodoMock.expects('save').yields(expectedResult, null);
          todo.save(function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(err.status).to.not.be.true;
              done();
          });
      });
  });

  // Test will pass if the todo is updated based on an ID
  describe("Update a new todo by id", function() {
      it("should updated a todo by id", function(done) {
          var TodoMock = sinon.mock(new Todo({
              completed: true
          }));
          var todo = TodoMock.object;
          var expectedResult = { status: true };
          TodoMock.expects('save').withArgs({ _id: 12345 }).yields(null, expectedResult);
          todo.save({ _id: 12345 }, function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(result.status).to.be.true;
              done();
          });
      }); // Test will pass if the todo is not updated based on an ID 
      it("should return error if update action is failed", function(done) {
          var TodoMock = sinon.mock(new Todo({
              completed: true
          }));
          var todo = TodoMock.object;
          var expectedResult = { status: false };
          TodoMock.expects('save').withArgs({ _id: 12345 }).yields(expectedResult, null);
          todo.save({ _id: 12345 }, function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(err.status).to.not.be.true;
              done();
          });
      });
  });

  // Test will pass if the todo is deleted based on an ID 
  describe("Delete a todo by id", function() {
      it("should delete a todo by id", function(done) {
          var TodoMock = sinon.mock(Todo);
          var expectedResult = { status: true };
          TodoMock.expects('remove').withArgs({ _id: 12345 }).yields(null, expectedResult);
          Todo.remove({ _id: 12345 }, function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(result.status).to.be.true;
              done();
          });
      }); // Test will pass if the todo is not deleted based on an ID 
      it("should return error if delete action is failed", function(done) {
          var TodoMock = sinon.mock(Todo);
          var expectedResult = { status: false };
          TodoMock.expects('remove').withArgs({ _id: 12345 }).yields(expectedResult, null);
          Todo.remove({ _id: 12345 }, function(err, result) {
              TodoMock.verify();
              TodoMock.restore();
              expect(err.status).to.not.be.true;
              done();
          });
      });
  });