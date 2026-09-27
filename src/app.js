const express = require("express");

const {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} = require("./studentService");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});

app.get("/students", (req, res) => {
    res.json(getAllStudents());
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = getStudentById(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const { name, age, course, email } = req.body;

    if (
        !name ||
        !age ||
        !course ||
        !email ||
        Number(age) <= 0
    )  {
        return res.status(400).json({
            message: "name, age, course and email are required"
        });
    }

    const student = addStudent({
        name,
        age,
        course,
        email
    });

    res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = updateStudent(id, req.body);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const deleted = deleteStudent(id);

    if (!deleted) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({
        message: "Student deleted successfully"
    });
});

module.exports = app;