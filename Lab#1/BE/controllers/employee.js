const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  /* const idToDelete= req.params.id
  const employeeIndex = employee.findIndex(emp => emp.id === idToDelete);
  if (employeeIndex == -1) {
    res.status(404).json({ success: false, message: 'Employee not found' });
    return
  }
  employee.splice(employeeIndex, 1);
  res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  */
  const id = req.params.id
  for(let i = 0; i < employee.length; i++){
    if(employee[i].id == id) {
      employee.splice(i,1);
      res.status(200).json({message: 'Deleted successfully'})
      return;
    }
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmployee = {id: req.body.id, name: req.body.name}
  employee.push(newEmployee)
};
