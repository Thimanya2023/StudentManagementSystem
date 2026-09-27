const request = require("supertest");

const app = require("../src/app");

const {
    resetStudents
} = require("../src/studentService");

beforeEach(() => {
    resetStudents();
});

describe("Student Management API", () => {

    test("GET /students should return all students", async () => {
        const response = await request(app)
            .get("/students");

        expect(response.statusCode).toBe(200);

        expect(response.body.length).toBe(2);
    });

    test("GET /students/:id should return one student", async () => {
        const response = await request(app)
            .get("/students/1");

        expect(response.statusCode).toBe(200);

        expect(response.body.name).toBe("John Silva");
    });

    test("GET /students/:id should return 404 for unknown student", async () => {
        const response = await request(app)
            .get("/students/999");

        expect(response.statusCode).toBe(404);
    });

    test("POST /students should create a student", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "David Fernando",
                age: 23,
                course: "Information Technology",
                email: "david@example.com"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body.name).toBe("David Fernando");
    });

    test("POST /students should reject incomplete data", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "David Fernando"
            });

        expect(response.statusCode).toBe(400);
    });

    test("PUT /students/:id should update a student", async () => {
        const response = await request(app)
            .put("/students/1")
            .send({
                course: "Cyber Security"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.course).toBe("Cyber Security");
    });

    test("DELETE /students/:id should delete a student", async () => {
        const response = await request(app)
            .delete("/students/1");

        expect(response.statusCode).toBe(200);

        expect(response.body.message).toBe(
            "Student deleted successfully"
        );
    });
    test("POST /students should reject invalid age", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "Invalid Student",
                age: -5,
                course: "Computer Science",
                email: "invalid@example.com"
            });

        expect(response.statusCode).toBe(400);
    });

});