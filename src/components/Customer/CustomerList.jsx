import { useEffect, useState, useCallback, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid


import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


import IconButton from '@mui/material/IconButton';


import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingToCustomer from "./AddTrainingToCustomer"



function Customerlist() {


    const gridRef = useRef(null);
    const [customers, setCustomers] = useState([]);

    const [colDefs] = useState([
        { field: "firstname", filter: true, sortable: false, width: 150 },
        { field: "lastname", filter: true, sortable: false, width: 150 },
        { field: "streetaddress", filter: true, sortable: false, width: 180 },
        { field: "postcode", filter: true, sortable: false, width: 150 },
        { field: "city", filter: true, sortable: false, width: 120 },
        { field: "email", filter: true, sortable: false, width: 150 },
        { field: "phone", filter: true, sortable: false, width: 150 },
        {
            width: 100,
            cellRenderer: params =>
                <AddTrainingToCustomer size="small" saveTraining={saveTraining} customer={params.data} />
        },
        {
            width: 100,
            cellRenderer: params =>
                <EditCustomer size="small" updateCustomer={updateCustomer} customer={params.data} />
        },
        {
            width: 100,
            cellRenderer: params =>
                <IconButton size="small" color="error" onClick={() => deleteCustomer(params.data._links.customer.href)} >
                    <DeleteIcon />
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
        if (window.confirm("Are you sure you want to delete this customer?")) {
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
            .then(() => fetchCustomers())
            .catch(err => console.error(err))
    };




    const onBtExport = useCallback(() => {
        const api = gridRef.current.api;
        const columnIdsToExclude = ["addTraining", "editCustomer", "deleteCustomer"];
        const columnDefs = api.getColumnDefs().filter(col => !columnIdsToExclude.includes(col.field));
        const columnsToExport = columnDefs.map(col => col.field);
    
        const params = {
            suppressQuotes: true,
            columnKeys: columnsToExport,
        };
    
        api.exportDataAsCsv(params);
    }, []);

    

    return (

        <div className="ag-theme-material" style={{ height: 600 }}>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AddCustomer saveCustomer={saveCustomer} />
                <IconButton
                    onClick={onBtExport}
                    style={{ marginLeft: "10px", fontWeight: "bold"}}
                >
                    <FileDownloadIcon />
                </IconButton>
            </div>


            <AgGridReact
                ref={gridRef}
                rowData={customers}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}

            />


        </div>
    )



}

export default Customerlist;