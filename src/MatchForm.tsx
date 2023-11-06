import { Box, Button, TextField } from '@mui/material'
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
            {userForm.errors.team_dog?.message && <p>{userForm.errors.team_dog?.message}</p>}
            <TextField {...userForm.register('team_dog')} label="Team A" variant="filled" />
            {userForm.errors.team_cat?.message && <p>{userForm.errors.team_cat?.message}</p>}
            <TextField {...userForm.register('team_cat')} label="Team B" variant="filled" />

            <Button type="submit" variant="contained">
                Commit
            </Button>
        </Box>
    )
}
