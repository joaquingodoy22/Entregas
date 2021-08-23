var productsArray = [];

function showProductsList(array){
    
    let htmlContentToAppend = "";
    for(let i=0; i<array.length; i++){
        let products = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div>
                    <img src=` + products.imgSrc + ` alt=` + products.description + ` class="img-thumbnail" > 
                    
                </div>
                <div class="col">
                
                    <div class="w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>                       
                        <small class="text-muted">` + products.description + ` </small>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});
