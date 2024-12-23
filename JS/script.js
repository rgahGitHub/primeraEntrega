function gotoModal() {
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  let carritoContent = JSON.parse(localStorage.getItem("carrito"));
  const section = document.querySelector(".items");
  section.innerHTML = "";
  let total = 0;

  if (carritoContent != null) {
    carritoContent.forEach((item) => {
      total = total + parseFloat(item.precio.replace("$", ""));
      const html = `
          <tr data-id="${item.id}">
            <td>${item.nombreproducto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td><button type="button" class="eliminar" onclick="eliminar(${item.id})">Eliminar</button></td>
          </tr>
    `;
      section.innerHTML += html;
    });
  }
  const htmltotal = document.querySelector("#total");
  htmltotal.innerHTML = "";
  htmltotal.innerHTML = "TOTAL: " + parseFloat(total);
}

function closeModal() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

function vaciar() {
  localStorage.clear();
  const htmltotal = document.querySelector("#total");
  htmltotal.innerHTML = "";
  gotoModal();
}

function eliminar(serviceID) {
  //localStorage.removeItem("carrito");
  let carritoContent = JSON.parse(localStorage.getItem("carrito"));
  if (carritoContent != null) {
    carritoContent = carritoContent.filter((item) => item.id !== serviceID);
    localStorage.setItem("carrito", JSON.stringify(carritoContent));
    gotoModal();
  }
}

function pagar() {}

async function comprar(serviceID) {
  console.log(serviceID);
  let nombre = "";
  let precio = "";

  try {
    const response = await fetch("./resources/json/data.json");
    const posts = await response.json();

    posts.forEach((post) => {
      if (post.serviceID === serviceID.toString()) {
        nombre = post.nombre;
        precio = post.precio;
      }
    });
  } catch (error) {
    console.log(error);
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const producto = {
    id: serviceID,
    nombreproducto: nombre,
    precio: precio,
    cantidad: 1,
  };

  carrito.push(producto);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Se ha agregado un servicio al carrito!");
}

function cargadatos() {
  fetch("./resources/json/data.json")
    .then((response) => response.json())
    .then((posts) => {
      const section = document.querySelector(".seccionesFlex");
      section.innerHTML = "";

      posts.forEach((post) => {
        const html = `
            <div class="card">
              <div class="cardContainer">
                <h4><b>${post.nombre}</b></h4>
                <p>
                ${post.descripcion}
                </p>
              </div>
              <div class="buttoncontainer">
                <div class="btn-holder">
                  <p>${post.precio}</p>
                  <button type="button" class="agregar" onclick="comprar(${post.serviceID})">Agregar al carrito</button>
                </div>
              </div>
            </div>
        `;
        section.innerHTML += html;
      });
    })
    .catch((error) => {
      console.log(error);
    });

  fetch("./resources/json/testimonio.json")
    .then((response) => {
      response
        .json()
        .then((json) => {
          const section1 = document.querySelector(".containerGrid");
          section1.innerHTML = "";
          json.forEach((item) => {
            const html1 = `
                <article class="item item-1">
                  <img src="/resources/img/${item.imagen}" width="100"alt=${item.alt} />
                  <p>${item.nombre}</p>
                </article>
                <article class="item item-2">
                  <p>
                  ${item.descripcion}
                  </p>
                </article>
            `;
            section1.innerHTML += html1;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
