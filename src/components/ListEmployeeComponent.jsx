import React from "react";

const ListEmployeeComponent = () => {
  const dummyData = [
    {
      id: 1,
      firstName: "saro",
      lastName: "Babikian",
      email: "saro@email.com",
    },
    {
      id: 1,
      firstName: "saro",
      lastName: "Babikian",
      email: "saro@email.com",
    },
    {
      id: 2,
      firstName: "david",
      lastName: "beckham",
      email: "david@email.com",
    },
    {
      id: 3,
      firstName: "raul",
      lastName: "gonzalez",
      email: "raul@email.com",
    },
  ];

  return (
    <div className="container">
      <h2 className="text-center">List of Emplyees</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
