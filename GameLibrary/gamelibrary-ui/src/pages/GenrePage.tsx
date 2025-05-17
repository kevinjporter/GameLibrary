import { Box, Button, Stack, TextField } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useEffect, useState } from "react";
import { isNullOrEmpty } from "../utils";
import { useNavigate, useParams } from 'react-router';

function GenrePage() {
    const [genre, setGenre] = useState<string>("");
    const [hasError, setHasError] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const notifications = useNotifications();
    const navigate = useNavigate();    

    const params = useParams();
    const genreId = Number(params.genreId) ?? 0;

    useEffect(() => {
        if (genreId == 0) return;

        loadGenre();
    }, []);

    const loadGenre = async () => {
        try
        {
            const response = await fetch("http://localhost:5261/api/Genre/" + genreId);
            const data = await response.json();
            setGenre(data.name);
        }
        catch (err)
        {
            notifications.show(`An error has occurred: ${err}`, {
                autoHideDuration: 2000,
                severity: "error"
            })
        }
    };
    
    const addGenre = async () => {
        setIsSaving(true);

        await fetch('http://localhost:5261/api/Genre', {
            method: 'POST',
            body: JSON.stringify({
                name: genre
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(() => {
            setIsSaving(false);

            notifications.show("New genre saved", {
                autoHideDuration: 2000,
                severity: "success"
            })
            resetForm();
        })
        .catch((err) => {
            setIsSaving(false);
            notifications.show(`An error has occurred: ${err.message}`, {
                autoHideDuration: 2000,
                severity: "error"
            })
        });
    };

    const updateGenre = async () => {
        setIsSaving(true);

        await fetch('http://localhost:5261/api/Genre', {
            method: 'PUT',
            body: JSON.stringify({
                id: genreId,
                name: genre
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(() => {
            setIsSaving(false);
            navigate(-1);
        })
        .catch((err) => {
            setIsSaving(false);
            notifications.show(`An error has occurred: ${err.message}`, {
                autoHideDuration: 2000,
                severity: "error"
            })
        });
    }

    function saveGenre() {
        if (isNullOrEmpty(genre)) {
            setHasError(true);
            return;
        }     
        
        if (genreId == 0) 
            addGenre();
        else
            updateGenre();
    }

    function resetForm() {
        setGenre("");
        setHasError(false);
    }

    return (
        <>
            <TextField
                label="Genre"
                variant="outlined"
                required={true}
                error={hasError}
                helperText={hasError ? "Genre is required" : ""}
                placeholder="Enter genre"
                value={genre}                
                onChange={(e) => setGenre(e.target.value)}
            />
            <Box sx={{ paddingTop: "8px" }}>
                <Stack direction="row" spacing={1} sx={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}>
                    <Button 
                        variant="contained" 
                        onClick={() => saveGenre()}
                        loading={isSaving}
                        loadingPosition="end">
                        Save
                    </Button>
                    <Button variant="outlined" onClick={() => resetForm()}>Cancel</Button>
                </Stack>
            </Box>
        </>
    )
}

export default GenrePage