import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the grid
import dayjs from 'dayjs';



function Traininglist() {

    const [training, setTraining] = useState([]);




    const [colDefs] = useState([
        {
            headerName: "Date",
            valueGetter: (params) => dayjs(params.data.date).format("DD.MM.YYYY HH:mm"),
            filter: true,
        },
        { field: "duration", filter: true },
        { field: "activity", filter: true },
        {
            headerName: "Customer",
            valueGetter: (params) =>
                params.data.customer.firstname + " " + params.data.customer.lastname,
            filter: true,
        },
    ]);





    useEffect(() => {
        fetchTrainings();
    }, []);



    const fetchTrainings = () => {
        return fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);

                return response.json();
            }).then(data => setTraining(data))
            .catch(err => console.error(err))
    };

    


    return (

        <div className="ag-theme-material" style={{ height: 600 }}>

            <AgGridReact
                rowData={training}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    )



}

export default Traininglist;