//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentProductArray = [];
var comentariosArray = [];
var productsArray = [];

function showRelatedProduct(arrayListado, arrayRelacionados) {

    let contenido = "";

    arrayRelacionados.forEach(function (i) {
        contenido += `
        <a href="products.html" class="list-group-item list-group-item-action related-style">
            <div class="row">
                <div class="col-3">
                    <img src="${arrayListado[i].imgSrc}" alt="${arrayListado[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${arrayListado[i].name}</h5>
                        <small class="text-muted">${arrayListado[i].soldCount} artículos vendidos.</small>
                    </div>
                    <p class="mb-1">${arrayListado[i].description}</p>
                    <div class="precio">
                    <p>${arrayListado[i].cost} ${arrayListado[i].currency}</p>
                    </div>
                </div>
            </div>
        </a>
        `

    });
    document.getElementById('relatedProducts').innerHTML = contenido;
}

function showProductInfo(producto, arrayComments) {

    let info = "";
    let imgs = "";
    let comments = "<hr>";

    info += `
        <div>
            <div>
                 <h3>` + producto.name + `</h3>
                 <p>` + producto.description + `</p>
                 <p>Precio: `+producto.cost + `
                 `+producto.currency+`</p>
                 <p>Vendidos: `+producto.soldCount+`</p>
                 <p>Categoría: `+producto.category+`</p><br>
            </div>
        </div>
            `;

    imgs += `
             <div id="carousel" class="carousel slide" data-ride="carousel" style="margin-left: auto; margin-right: auto; ">
                 <ol class="carousel-indicators" >
                     <li data-target="#carousel" data-slide-to="0" class="active"></li>
                     <li data-target="#carousel" data-slide-to="1"></li>
                     <li data-target="#carousel" data-slide-to="2"></li>
                     <li data-target="#carousel" data-slide-to="3"></li>
                     <li data-target="#carousel" data-slide-to="4"></li>
                 </ol>
                 <div id="carusel" class="carousel-inner">
                         
                     <div class="carousel-item active">
                         <img  src="`+producto.images[0]+`" class="d-block" alt="...">
                         <div class="carousel-caption d-none d-md-block">
                             <h5></h5>
                             <p></p>
                         </div>
                     </div>
                     <div class="carousel-item">
                         <img src="`+producto.images[1]+`" class="d-block" alt="...">
                         <div class="carousel-caption d-none d-md-block">
                             <h5></h5>
                             <p></p>
                         </div>
                     </div>
                     <div class="carousel-item">
                         <img src="`+ producto.images[2]+`" class="d-block" alt="...">
                         <div class="carousel-caption d-none d-md-block">
                             <h5></h5>
                              <p></p>
                         </div>
                     </div>
      
                     <div class="carousel-item">
                         <img src="`+ producto.images[3]+`" class="d-block" alt="...">
                          <div class="carousel-caption d-none d-md-block">
                             <h5></h5>
                             <p></p>
                         </div>
                     </div>
                     <div class="carousel-item">
                         <img src="`+ producto.images[4]+`" class="d-block" alt="...">
                         <div class="carousel-caption d-none d-md-block">
                             <h5></h5>
                             <p></p>
                         </div>
                     </div>
                 </div>
                 
                 <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span class="sr-only">Previous</span>
                 </a>
                 <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                     <span class="sr-only">Next</span>
                 </a>
             </div>
        `;

    arrayComments.forEach(function (comment) {

        let puntos = "";

        comments += `
                 <div class="comentario" style="border:solid; padding:10px" >
                     <strong>`+ comment.user+` dice:</strong><br>
                     <p>`+comment.description+`</p>
        `;
        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }
        comments += `<div style="text-align: right;">`+puntos+`</div>
        <p class="text-muted text-right">`+comment.dateTime+`</p></div><br>`;


    })


    document.getElementById("prodInfo").innerHTML = info;
    document.getElementById("prodImgs").innerHTML = imgs;
    document.getElementById("prodCom").innerHTML = comments;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuarioreg = localStorage.getItem("usuario");
    if (usuarioreg) {
        document.getElementById('sinAcceder').style = "display: none";
        document.getElementById('nuevoComentarioContenedor').style = "display: inline-block";
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            currentProductArray = resultObj.data;

            showProductInfo(currentProductArray, comentariosArray);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showRelatedProduct(productsArray, currentProductArray.relatedProducts)
        }
    });
    document.getElementById('enviarComm').addEventListener("click", function (e) {

        let fecha = new Date();

        let dateTime = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();
        
        dateTime += " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();


        let newComment = {
            score: parseInt(document.getElementById('nuevaCal').value),
            description: document.getElementById('nuevoCom').value,
            user: JSON.parse(localStorage.getItem("usuario")).nombre,
            dateTime: dateTime
        };
        comentariosArray.push(newComment);

        showProductInfo(currentProductArray, comentariosArray);
    })


});