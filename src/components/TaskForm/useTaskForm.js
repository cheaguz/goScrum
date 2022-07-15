import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../store/actions/taskActions';
import { newTask } from "../../api/taskServices";
import { toast } from 'react-toastify';
import swalAlert from '../../utils/swal';
import { validationSchema } from './validations';



export const useTaskForm = () => {
    const dispatch = useDispatch()

    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: ''
    }

    const onSubmit = () => {
        newTask(values)
            .then(data => {
                if (data.status_code === 200) {
                    resetForm()
                    toast('Tu tarea se creo')
                    dispatch(getTasks())
                }
            })
            .catch(err => swalAlert({
                title: "Error",
                text: "Hubo un error al crear la tarea",
                icon: 'error'
            }))
    };

    const formik = useFormik({ initialValues, validationSchema, onSubmit })
    const { handleSubmit, handleBlur, handleChange, errors, touched, resetForm, values } = formik

    return (
        { handleSubmit, handleBlur, handleChange, errors, touched, values }
    )
}
