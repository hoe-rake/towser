import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray,useForm } from 'react-hook-form'
import { atom,useRecoilState } from 'recoil'
import { z } from 'zod'


const userSchema = z.object({
    team_dog: z.string().max(20),
    dogs: z
        .array(
            z.object({
                dog_name: z.string().max(10),
                dog_number: z.number().int().nonnegative().lte(999),
                dog_weight: z.number().gte(40).lte(85),
                dog_height: z.number().gte(130).lte(220),
            })
        )
        .min(5)
        .max(12),
    team_cat: z.string().max(20),
    cats: z
        .array(
            z.object({
                cat_name: z.string().max(10),
                cat_number: z.number().int().nonnegative().lte(999),
                cat_weight: z.number().gte(40).lte(85),
                cat_height: z.number().gte(130).lte(220),
            })
        )
        .min(5)
        .max(12),
})

type UserForm = z.infer<typeof userSchema>

const defaultValues: UserForm = {
    team_dog: '',
    dogs: Array(12).fill({ dog_name: '', dog_number: 0, dog_weight: 0, dog_height: 0 }),
    team_cat: '',
    cats: Array(12).fill({ cat_name: '', cat_number: 0, cat_weight: 0, cat_height: 0 }),
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
    const { fields: dogFields, append: dogAppend } = useFieldArray({ name: 'dogs', control })
    const { fields: catFields, append: catAppend } = useFieldArray({ name: 'cats', control })

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
        dogFields,
        dogAppend,
        catFields,
        catAppend
    }
}
