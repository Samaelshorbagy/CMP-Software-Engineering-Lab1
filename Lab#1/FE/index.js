function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const form=document.getElementById("employeeForm")
form.addEventListener("submit", createEmployee)
 

// TODO
// add event listener to delete button
// Add event listener to the table body for delegation
const tableBody = document.getElementById('dataTable');
tableBody.addEventListener('click', function (event) {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('btn-danger')) {
    // Find the closest row to get the employee ID
    const row = event.target.closest('tr');
    const idToDelete = row.querySelector('td:first-child').textContent;

    // Call deleteEmployee function with the employee ID
    deleteEmployee(idToDelete);
  }
});

// TODO
function createEmployee (event){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  event.preventDefault()
  const name=document.getElementById("name").value
  const id=document.getElementById("id").value

  console.log(name)
  console.log(id)

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response if needed
      console.log('Employee created successfully:', data);
      // After creating the employee, fetch updated employee data
      // call fetchEmployees
      
    })
    .catch(error => console.error('Error creating employee:', error));
    fetchEmployees();
}

// TODO
function deleteEmployee (id){
  
  const confirmDeletion = window.confirm('Are you sure you want to delete this employee?');
  
  if (!confirmDeletion) {
    return; // If the user clicks Cancel, do not proceed with deletion
  }

  //Send delete request to BE 
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response if needed
      console.log('Employee deleted successfully:', data);
      // After deleting the employee, fetch updated employee data
    })
    // Handle errors during http request if needed
    .catch(error => console.error('Error deleting employee:', error));
    fetchEmployees();
}



fetchEmployees()
