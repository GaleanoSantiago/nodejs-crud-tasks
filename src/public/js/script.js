// ------ Formulario de crear-------
const formCreate = document.getElementById("crear");
const inputTitulo = document.getElementById("titulo");
const inputDesc = document.getElementById("descripcion");

// ------ Formulario de eliminar-------

const formDelete = document.querySelectorAll(".formDestroy");
const btnDelete = document.querySelectorAll(".btnDelete");
const idDelete = document.querySelectorAll(".idDelete");

// ------ Formulario de editar-------

const btnEdit = document.getElementById("btnEdit");
const formEdit = document.getElementById("formEdit");

// ---------------- Para eliminar un elemento de la bd ----------------

// Eliminar async
// btnDelete.forEach(btn=>{
//   btn.addEventListener("click", (e)=>{
//       e.preventDefault();
//       console.log(btn.value);
//       fetch('http://localhost:3000/tasks/delete/' + btn.value, {
//           method: 'DELETE'
//         })
//         .then(res => res.json())
//         .catch(error => console.error('Error:', error))
//         .then(response=>{
//           // alert("Usuario Eliminado correctamente");
//           Swal.fire({
//             icon: "success",
//             text: "Tarea Eliminada",
//             timer: 700, // <- Ocultar dentro de 0.7 segundos
//           });
//         });
//   })
// })

if (formDelete !== null) {
  formDelete.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await Swal.fire({
        title: "Confirmación",
        text: "¿Eliminar la tarea? esto no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          form.submit();
        }
      })

    })
  })
}


// ---------------- Para CREAR un elemento de la bd ----------------
let data;
if (formCreate!==null){

  let url = window.location;  //Para obtener la url de mi posicion actual

  formCreate.addEventListener("submit",(e)=>{
    e.preventDefault();
    data = { titulo: `${inputTitulo.value}`, descripcion:`${inputDesc.value}` };
  
    console.log(data);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      
      inputTitulo.value="";
      inputDesc.value="";
      Swal.fire({
        icon: "success",
        text: "Tarea Guardada",
        timer: 700, // <- Ocultar dentro de 0.7 segundos
    });
    })
    .catch((error) => {
      console.error('Algo fallo en la recepcion Error:', error);
    });
  })
  console.log("Formulario existente");

}

// ---------------- Para EDITAR un elemento de la bd ----------------

// Para boton de confirmacion en sweetalert
if (btnEdit !== null) {
  btnEdit.addEventListener("click", async (e) => {
    e.preventDefault();
    await Swal.fire({
      title: '¿Seguro que desea guardar los cambios?',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      denyButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#00AB66',
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Guardado!',
          timer: 700,
          icon: 'success'
        });
        formEdit.submit();

      } else if (result.isDenied) {
        Swal.fire({
          title: 'Cambios no guardados',
          timer: 700,
          icon: 'info'
        })
      }
    })
  })
}


// const loadDataAsync = async ()=>{
//     const res = await fetch("http://localhost:3000/tasks/")
//     const data = await res.json()
//     console.log(data);
// }

// loadDataAsync();


