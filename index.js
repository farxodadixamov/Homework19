document.addEventListener('DOMContentLoaded', function() {


    const form = document.querySelector('#studentForm');
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const ageInput = document.querySelector('#age');
    const studentsList = document.querySelector('#studentsList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const age = ageInput.value;

        const newStudent = {
            firstName: firstName,
            lastName: lastName,
            age: age
        };

        let studentsArray = JSON.parse(localStorage.getItem('students')) || [];
        studentsArray.push(newStudent);
        localStorage.setItem('students', JSON.stringify(studentsArray));

        updateStudentsList();
    });

    function updateStudentsList() {
        studentsList.innerHTML = '';
        const studentsArray = JSON.parse(localStorage.getItem('students')) || [];

        studentsArray.forEach(function(student, index) {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student');

            const studentInfo = document.createElement('p');
            studentInfo.textContent = `Ism: ${student.firstName}, Familiya: ${student.lastName}, Yosh: ${student.age}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'O\'chirish';
            deleteButton.addEventListener('click', function() {
                studentsArray.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(studentsArray));
                updateStudentsList();
            });

            studentDiv.appendChild(studentInfo);
            studentDiv.appendChild(deleteButton);
            studentsList.appendChild(studentDiv);
        });
    }

    updateStudentsList();
});
