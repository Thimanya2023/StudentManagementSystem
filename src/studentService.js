let students = [
    {
        id: 1,
        name: "John Silva",
        age: 21,
        course: "Computer Science",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Sarah Perera",
        age: 22,
        course: "Software Engineering",
        email: "sarah@example.com"
    }
];

function getAllStudents() {
    return students;
}

function getStudentById(id) {
    return students.find(student => student.id === id);
}

function addStudent(studentData) {
    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        ...studentData
    };

    students.push(newStudent);

    return newStudent;
}

function updateStudent(id, updatedData) {
    const student = getStudentById(id);

    if (!student) {
        return null;
    }

    Object.assign(student, updatedData);

    return student;
}

function deleteStudent(id) {
    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return false;
    }

    students.splice(studentIndex, 1);

    return true;
}

function resetStudents() {
    students = [
        {
            id: 1,
            name: "John Silva",
            age: 21,
            course: "Computer Science",
            email: "john@example.com"
        },
        {
            id: 2,
            name: "Sarah Perera",
            age: 22,
            course: "Software Engineering",
            email: "sarah@example.com"
        }
    ];
}

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    resetStudents
};