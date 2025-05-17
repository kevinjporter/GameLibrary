import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useNotifications } from "@toolpad/core";
import { useDialogs } from "@toolpad/core";
import { useEffect, useState } from "react";
import { Genre } from "../dto/genre";
import { useNavigate } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';

function GenreListPage() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const notifications = useNotifications();
    const navigate = useNavigate();
    const dialogs = useDialogs();

    const columns : GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditSquareIcon color="info" />}
                    label="Edit"
                    onClick={() => editGenre(Number(params.id))}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon color='error' />}
                    label="Delete"
                    onClick={() => deleteGenre(Number(params.id))}
                />
            ]
        },
        { field: "name", headerName: "Name" }
    ]

    const editGenre = (genreId: number) => {
        navigate(`/genre/${genreId}`);
    };

    const deleteGenre = async (genreId: number) => {
        const confirmed = await dialogs.confirm('Are you sure you want to delete this genre?', {
            okText: 'Yes',
            cancelText: 'No',
        });

        if (confirmed) {
            setIsLoading(true);

            await fetch('http://localhost:5261/api/Genre?genreId=' + genreId, {
                method: 'DELETE'
            })
            .then(() => {
                setGenres(genres.filter(g => g.id !== genreId));
                setIsLoading(false);
            })
            .catch((err) => {
                notifications.show(`An error has occurred: ${err.message}`, {
                    autoHideDuration: 2000,
                    severity: "error"
                })
                setIsLoading(false);
        });

        } 
    };
    
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