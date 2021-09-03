//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("submitBtn").addEventListener("click", function (e) {
        let email = document.getElementById("inputEmail");
        let password = document.getElementById("inputPassword");
        let datos = document.getElementById("inputUsuario")
        let usuario = {}
        

        if (password.value.trim() === '' || email.value.trim() === '' || datos.value.trim() === '') {
            
            alerta();
        }
        else {
            usuario.nombre = datos.value
            usuario.estado = "conectado"


            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location = "index.html"


        }

    });

});

function desconectar() {
    localStorage.clear();
    location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () =>{
let usuario = JSON.parse(localStorage.getItem("usuario"));
document.getElementById("nombre").innerHTML = usuario.nombre;
});

function alerta() {
    Swal.fire ({
        title: '<strong>¡Debes ingresar los datos!</strong>',
        width: 900,
        position: "top",
        padding: '3em',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        imageUrl:"https://c.tenor.com/yDlbqNGSnE0AAAAC/por-favor-puss-in-boots.gif",
        imageWidth: 500,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Muy bien, ¡me convenciste!',
        
        
        
})
}