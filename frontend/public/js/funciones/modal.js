const API = "http://localhost:3001";

//modal add user
const formUser = document.getElementById("formAddUser");

if (formUser) {
  formUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rol = e.target.rol.value;

    const user = await fetch(`${API}/crear-usuario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, lastname, email, password, rol }),
    });
    const result = await user;
    if (result.status === 201) {
      swal("Good", "Usuario registrado", "success");
      setTimeout(() => {
        window.location.href = "/usuarios";
      }, 2000);
    } else {
      swal("Oops", "Email ya registrado", "error");
      setTimeout(() => {
        window.location.href = "/usuarios";
      }, 2000);
    }
  });
}

$(document).on("click", ".btnEliminar", function () {});
