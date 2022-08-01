import Swal from 'sweetalert2'

 const swalAlert = ({title,text,icon}) => {

    return  Swal.fire({
        title :  title ,
        text :  text ,
        icon :  icon ,
        confirmButtonText : "Aceptar",
        width : "400px",
        timer : 10000,
        timerProgressBar : true,
      })
};

export default swalAlert

/* export const swalPrompt = Swal.fire({
  title: 'Do you want to save the changes?',
  showCancelButton: true,
  confirmButtonText: 'Save',

}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
  }
})  */