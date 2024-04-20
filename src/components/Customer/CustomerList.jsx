import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid


import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingToCustomer from "./AddTrainingToCustomer"


function Customerlist() {



    const [customers, setCustomers] = useState([]);

    const [colDefs] = useState([
        { field: "firstname", filter: true, width: 150 },
        { field: "lastname", filter: true, width: 150 },
        { field: "streetaddress", filter: true, width: 180 },
        { field: "postcode", filter: true, width: 150 },
        { field: "city", filter: true, width: 120 },
        { field: "email", filter: true, width: 150 },
        { field: "phone", filter: true, width: 150 },

        {
            cellRenderer: params =>
                <AddTrainingToCustomer size="small" saveTraining={saveTraining} customer={params.data}  > 

                </AddTrainingToCustomer>

        },


        {
            cellRenderer: params =>
                <EditCustomer size="small" updateCustomer={updateCustomer} customer={params.data}>

                </EditCustomer>
        },
        {
            cellRenderer: params =>
                <IconButton size="small" color="error" onClick={() => deleteCustomer(params.data._links.customer.href)}>
                    < DeleteIcon />
                </IconButton>
        },
    ]);





    useEffect(() => {
        fetchCustomers();
    }, []);


    const fetchCustomers = () => {
        return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))

    }

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding a customer: " + response.statusText);

                return response.json();
            })
            .then(() => fetchCustomers())
            .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm("are you sure?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error in deletion: " + response.statusText);

                    return response.json();
                })
                .then(() => fetchCustomers())
                .catch(err => console.error(err))
        }
    };

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when updating a customer: " + response.statusText);

                return response.json();
            })
            .then(() => fetchCustomers())
            .catch(err => console.error(err))

    };

    const saveTraining = (trainingData) => {

        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trainingData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error when adding a Training: " + response.statusText);
                    
                }
                return response.json();
            })
            .then(()=> fetchCustomers())
            .catch(err => console.error(err))
    };






    return (

        <div className="ag-theme-material" style={{ height: 600 }}>
            <AddCustomer saveCustomer={saveCustomer} />
            <AgGridReact
                rowData={customers}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}

            />
        </div>
    )



}

export default Customerlist;