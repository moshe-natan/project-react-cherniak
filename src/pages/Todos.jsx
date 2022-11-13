import { Checkbox} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Todos = (props) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [todos, setTodos] = useState(null)


    useEffect(() => {
        if (!todos) {
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
                .then(res => res.json())
                .then(data => setTodos(data.filter(e => e.userId == user.id)))
        }
    }, [])

    const check = (props) => {
        return <Checkbox defaultChecked={props.row.completed} />
    }

    const columns = [
        { field: 'completed',renderCell : check , headerName: 'COMPLITED', width: 100 },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'TITLE', width: 320 },
      ];
    return (
        <React.Fragment>
            {todos && <div style={{ height: 600, width: '100%' }}>
                <DataGrid 
                    getRowHeight={() => 'auto'}
                    rows={todos}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[3]}
                />
            </div>}
        </React.Fragment>
    );
}

export default Todos;