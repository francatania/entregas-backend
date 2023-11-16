

(function (){
    

    const btnAgregar = document.querySelectorAll('.agregarButton');
    console.log(btnAgregar);

    btnAgregar.forEach(boton=>{
        const productoID = boton.value;

        boton.addEventListener('click', ()=>{
            console.log('click')
            const datos = {
                product: productoID
            }

            const url = `http://localhost:8080/api/cart/654be5c9cc1dc6449ae333a3`

            fetch(url, {
                method: "PUT",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log("Producto agregado al carrito con éxito");
                } else {
                    console.error("Error al agregar el producto al carrito");
                }
            })
            .catch(error => {
                console.error("Error de red: " + error);
            });
        })
    })})()