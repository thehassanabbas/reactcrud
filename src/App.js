import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Data } from './EmployeeData';

import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';                         // Icons
import 'primeflex/primeflex.css';                           // PrimeFlex for responsive layout

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setData(Data);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setUsername(dt.username);
      setEmail(dt.email);
      setPhoneNumber(dt.phoneNumber);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';

    if (firstName === '') error += 'First Name is required. ';
    if (lastName === '') error += 'Last Name is required. ';
    if (username === '') error += 'Username is required. ';
    if (email === '' || !/\S+@\S+\.\S+/.test(email)) error += 'A valid Email is required. ';
    if (phoneNumber === '' || !/^\d{11}$/.test(phoneNumber)) error += 'A valid 11-digit Phone Number is required. ';

    if (!error) {
      const newObject = { id: data.length + 1, firstName, lastName, username, email, phoneNumber };
      setData((prevData) => [...prevData, newObject]);
      alert("Record Saved!");
    } else {
      alert("Error: " + error);
    }
  };

  const clearData = (e) => {
    e.preventDefault();
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPhoneNumber('');
    alert("Record Cleared!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const actionTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => handleEdit(rowData.id)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} />
    </>
  );

  return (
    <div className="p-m-5">
      <Card style={{ background: "#eeeefd" }} title="Signup Form" className="card p-shadow-3 m-6">
        <div className="p-fluid p-grid">
          <div style={{ display: "flex", gap: "5px", marginBottom: "25px" }}>
            <span style={{ width: "50%" }} className="p-float-label">
              <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <label htmlFor="firstName">First Name</label>
            </span>

            <span style={{ width: "50%" }} className="p-float-label">
              <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <label htmlFor="lastName">Last Name</label>
            </span>
          </div>
          <div style={{ display: "flex", gap: "5px", marginBottom: "25px" }}>
            <span style={{ width: "50%" }} className="p-float-label">
              <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="username">Username</label>
            </span>

            <span style={{ width: "50%" }} className="p-float-label">
              <InputText id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <label htmlFor="phoneNumber">Phone Number</label>
            </span>
          </div>
            <span style={{ marginBottom: "25px" }} className="p-float-label">
              <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </span>

            <div style={{ display: "flex", gap: "5px", }}>
              <Button style={{ width: "50%" }} label="Save" className="p-button-primary p-mr-2" onClick={handleSave} />
              <Button style={{ width: "50%" }} label="Clear" className="p-button-danger" onClick={clearData} />
            </div>
        </div>
      </Card>

      <div className="p-mt-5 m-6">
        <DataTable showGridlines stripedRows paginator rows={1} rowsPerPageOptions={[1,2,3,4,5]} value={data} responsiveLayout="scroll">
          <Column field="id" header="Id" />
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
          <Column field="username" header="Username" />
          <Column field="email" header="Email" />
          <Column field="phoneNumber" header="Phone Number" />
          <Column body={actionTemplate} header="Action" />
        </DataTable>
      </div>
    </div>
  );
}

export default App;
