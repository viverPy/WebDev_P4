DROP DATABASE IF EXISTS school_users;
CREATE DATABASE school_users;

USE school_users;

CREATE TABLE IF NOT EXISTS Teachers(
	teacherID INTEGER AUTO_INCREMENT,
    teacherLastname VARCHAR(50),
    teacherFirstName VARCHAR(50),
    teacherMiddleName VARCHAR(50),
    PRIMARY KEY(teacherID)
);

CREATE TABLE IF NOT EXISTS Subjects(
	subjectID INTEGER AUTO_INCREMENT,
    subjectTitle VARCHAR(200),
    subjectNo VARCHAR(50),
    transcriptLoad INTEGER,
    payingLoad INTEGER,
    teachingLoad INTEGER,
    PRIMARY KEY(subjectID)
);

CREATE TABLE IF NOT EXISTS Students(
	studentID INTEGER AUTO_INCREMENT,
    studentLastname VARCHAR(50),
    StudentFirstName VARCHAR(50),
    studentMiddleName VARCHAR(50),
    PRIMARY KEY(studentID)
);