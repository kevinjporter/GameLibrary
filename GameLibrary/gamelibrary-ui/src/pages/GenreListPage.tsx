import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNotifications } from "@toolpad/core";
import { useEffect, useState } from "react";
import { Genre } from "../dto/genre";

function GenreListPage() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const notifications = useNotifications();

    const columns : GridColDef[] = [
        { field: "name", headerName: "Name" }
    ]
    
    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        setIsLoading(true);

        await fetch('http://localhost:5261/api/Genre', {
            method: 'GET'
        })
        .then((resp) => resp.json())        
        .then((data) => {
            setGenres(data);
            setIsLoading(false);
        })
        .catch((err) => {
            notifications.show(`An error has occurred: ${err.message}`, {
                autoHideDuration: 2000,
                severity: "error"
            })
            setIsLoading(false);
        });
    };

    return (<>
        <DataGrid
            rows={genres}
            columns={columns}
            loading={isLoading}            
        />
        </>
    )
}

export default GenreListPage