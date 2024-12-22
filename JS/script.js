function gotoModal() {
  console.log("va a abrir el modal");
  const dialog = document.querySelector("dialog");
  dialog.showModal();

  let carritoContent = JSON.parse(localStorage.getItem("carrito"));
  console.log("muestra el contenido del carrito");
  console.log(carritoContent);
  // localStorage.clear();
  const section = document.querySelector(".contenidoCarrito");
  section.innerHTML = "";

  carritoContent.forEach((item) => {
    const html = `
          <tr data-id="${item.id}">
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
          </tr>
    `;
    section.innerHTML += html;
  });
}

function closeModal() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

async function comprar(serviceID, pnombre) {
  console.log(serviceID);
  console.log(pnombre);
  const nombre = "";
  const precio = "";

  // fetch("./resources/json/data.json")
  //   .then((response) => response.json())
  //   .then((posts) => {
  //     posts.forEach((post) => {
  //       console.log("prueba");
  //       console.log(post.nombre);
  //       console.log(post.precio);

  //       if (post.serviceID === serviceID) {
  //         console.log("son iguales");
  //         nombre = post.nombre;
  //         precio = post.precio;
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  try {
    const response = await fetch("./resources/json/data.json");
    const posts = await response.json();

    posts.forEach((post) => {
      if (post.serviceID === serviceID) {
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

  //console.log(producto);

  carrito.push(producto);
  // console.log(carrito);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  // alert("Se ha agregado un servicio al carrito!");
}

function cargadatos() {
  fetch("./resources/json/data.json")
    .then((response) => response.json())
    .then((posts) => {
      //const section = document.querySelector("section");
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
                  <button type="button" class="agregar" onclick="comprar(${post.serviceID},${post.nombre})">Agregar al carrito</button>
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
