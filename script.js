const studentTable = document.getElementById('student-data');
const searchInput = document.getElementById('search');

// Function to fetch JSON data from the URL
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

// Function to render the table with student data
function renderTable(data) {
    // Clear existing content of the studentTable
    studentTable.innerHTML = '';

    // Iterate over each student in the data array
    data.forEach(student => {
        // Create a table row for each student
        const tableRow = document.createElement('tr');

        // Create a table cell for the student's image
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = student.img_src; // Use the 'img_src' property from the data
        imageCell.appendChild(image); // Append the image to the cell

        // Create a table cell for the student's full name
        const nameCell = document.createElement('td');
        nameCell.textContent = `${student.first_name} ${student.last_name}`; // Concatenate first and last name

        // Create a table cell for the student's email
        const emailCell = document.createElement('td');
        emailCell.textContent = student.email; // Use the 'email' property from the data
        const marks = document.createElement('td');
        marks.textContent = student.marks;

        const passing = document.createElement('td');
        passing.textContent = student.passing;

        const standard = document.createElement('td');
        standard.textContent = student.class;

        // Append the cells to the table row
        tableRow.appendChild(imageCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(emailCell);
        tableRow.appendChild(marks);
        tableRow.appendChild(passing);
        tableRow.appendChild(standard);

        // Append the table row to the studentTable
        studentTable.appendChild(tableRow);
    });
}

// Fetch data from the URL and render the table
fetchData('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(studentData => {
        // Call the renderTable function with the fetched data
        renderTable(studentData);
    });
