import * as Yup from 'yup';

const isRequired = '* El campo es requerido'
 export const validationSchema = Yup.object().shape({
    title: Yup.string().min(6, 'La cantidad minima de caracteres es 6').required(isRequired),
    status: Yup.string().required(isRequired),
    importance: Yup.string().required(isRequired),
    description: Yup.string().required(isRequired),
})