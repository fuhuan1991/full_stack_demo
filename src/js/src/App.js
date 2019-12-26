import React, { Component } from 'react';
import './App.css';
import { getAllStudents } from './client';
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty,
} from 'antd';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';
import { errorNotification } from './Notification';

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} />

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false,
  }

  componentDidMount () {
    this.fetchStudents();
  }

  openAddStudentModal = () => {
    this.setState({
      isAddStudentModalVisible: true,
    }
  )}

  closeAddStudentModal = () => {
    this.setState({
      isAddStudentModalVisible: false,
    }
  )}

  fetchStudents = () => {
    this.setState({
      isFetching: true,
    });
    getAllStudents()
      .then(res => res.json()
      .then(students => {
        this.setState({
          students,
          isFetching: false,
        })
      }))
      .catch(error => {
        console.log(error.error)
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      });
  }

  render () {

    const { students, isFetching, isAddStudentModalVisible } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={antIcon}/>
        </Container>
      );
    }

    const commonElements = () => (
      <div>
        <Modal
          title='Add new student'
          visible={isAddStudentModalVisible}
          onOk={this.closeAddStudentModal}
          onCancel={this.closeAddStudentModal}
          width={1000}
        >
          <AddStudentForm 
            onSuccess={() => {
              this.closeAddStudentModal();
              this.fetchStudents();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.error;
              console.log(JSON.stringify(error));
              errorNotification(message, description);
            }}
          />
        </Modal>
        <Footer 
          numberOfStudents={students.length} 
          handleAddStudentClickEvent={this.openAddStudentModal}></Footer>
      </div>
    );

    if (students && students.length > 0) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '100px'}}
            dataSource={students} 
            columns={columns} 
            rowKey='studentId'
            pagination={false}
          />
          {commonElements()}
        </Container>)
    }

    return (
      <Container>
        <Empty description='No students found' />
        {commonElements()}
      </Container>
    );
  }
}

export default App;
