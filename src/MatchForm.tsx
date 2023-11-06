import { Box, Button, Grid, TextField } from '@mui/material'
import { Fragment } from 'react'
import { useUserForm } from './hooks/useUserForm'

export default function MatchForm() {
    const userForm = useUserForm()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await userForm.trigger(['team_dog', 'team_cat'])

        userForm.handleSetFormValues()
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField {...userForm.register('team_dog')} label="Team A" variant="filled" />
                    {userForm.dogFields.map((field, index) => (
                        <Fragment key={field.id}>
                            <TextField
                                {...userForm.register(`dogs.${index}.dog_name`)}
                                label={`Dog Name ${index + 1}`}
                                variant="filled"
                            />
                        </Fragment>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    <TextField {...userForm.register('team_cat')} label="Team B" variant="filled" />
                    {userForm.catFields.map((field, index) => (
                        <Fragment key={field.id}>
                            <TextField
                                {...userForm.register(`cats.${index}.cat_name`)}
                                label={`Cat Name ${index + 1}`}
                                variant="filled"
                            />
                        </Fragment>
                    ))}
                </Grid>
            </Grid>
            <Button type="submit" variant="contained">
                Commit
            </Button>
        </Box>
    )
}
