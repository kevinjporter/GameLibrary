import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import { useNotifications } from "@toolpad/core";
import { useEffect, useState } from "react";
import { Genre } from "../dto/genre";

function GenreListPage() {
    const [genres, setGenres] = useState<Genre[]>([]);

    const notifications = useNotifications();
    
    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        await fetch('http://localhost:5261/api/Genre', {
            method: 'GET'
        })
        .then((resp) => resp.json())        
        .then((data) => setGenres(data))
        .catch((err) => {
            notifications.show(`An error has occurred: ${err.message}`, {
                autoHideDuration: 2000,
                severity: "error"
            })
        });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {genres.map((row) => (
                            <TableRow 
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GenreListPage