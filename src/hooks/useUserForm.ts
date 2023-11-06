import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'
import { z } from 'zod'

const userSchema = z.object({
    team_dog: z.string().max(20),
    team_cat: z.string().max(20),
})

type UserForm = z.infer<typeof userSchema>

const defaultValues: UserForm = {
    team_dog: '',
    team_cat: '',
}

const form = atom<UserForm>({
    key: 'useUserFormAtom',
    default: defaultValues,
})

export const useUserForm = () => {
    const [formValues, setFormValues] = useRecoilState(form)
    const {
        register,
        handleSubmit,
        getValues,
        control,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onSubmit',
        defaultValues: formValues,
    })

    const handleSetFormValues = () => {
        console.log(JSON.stringify(getValues()))
        setFormValues(getValues())
    }

    return {
        handleSubmit,
        register,
        control,
        trigger,
        setFormValues,
        formValues,
        handleSetFormValues,
        errors,
    }
}
