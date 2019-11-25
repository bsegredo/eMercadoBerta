let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
let paymentTypeSelected = false;
let products = [];
let articlesUnitCost = 0;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función para deshabilitar campos tarjetas, se habilita al clickear Transferencia
function deactivateCreditCard(){
        document.getElementById('creditCardNumber').disabled = true;
        document.getElementById('creditCardSecurityCode').disabled = true;
        document.getElementById('dueDate').disabled = true;
        document.getElementById('bankAccountNumber').disabled = false;
    }

//Función para deshabilitar campo de trasnferencia, al clikear Tarjeta
function deactivateBankTransf(){
  document.getElementById('bankAccountNumber').disabled = true;
  document.getElementById('creditCardNumber').disabled = false;
  document.getElementById('creditCardSecurityCode').disabled = false;
  document.getElementById('dueDate').disabled = false;
    }

function showPaymentSelection(){
  let textToShowHTML = document.getElementById('paymentSelection');

  if (document.getElementById('bankAccountNumber').disabled = true){
    textToShowHTML.innerHTML = "Tarjeta de Crédito";
  } else {
    textToShowHTML.innerHTML = "Transferencia bancaria";
  }
}
//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let unitPriceHTML = document.getElementById("unitPriceText");
  let shippingCostHTML = document.getElementById("shippingCostText");
  let totalPriceHTML = document.getElementById("totalPriceText");

  let unitPriceToShow = MONEY_SYMBOL + subtotal;
  let shippingCostToShow = Math.round((shippingPercentage * 100)) + PERCENTAGE_SYMBOL;
  let totalPriceToShow = MONEY_SYMBOL + (Math.round(subtotal  * (1 + shippingPercentage)));

  unitPriceHTML.innerHTML = unitPriceToShow;
  shippingCostHTML.innerHTML = shippingCostToShow;
  totalPriceHTML.innerHTML = totalPriceToShow;

}



function updateSubtotal(){
  let articlesCount = parseInt(document.getElementById('count').value);

  subtotal = articlesCount * articlesUnitCost;

  document.getElementById('subtotal').innerHTML = subtotal;

   updateTotalCosts();
}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showProducts(products){
    let htmlContentToAppend = "";
    for(let i = 0; i < products.length; i++){
        let articles = products[i];

        articlesUnitCost = articles.unitCost

        htmlContentToAppend += `
              <tr>
                <td><img src="` + articles.src + `" class="img_cart">` + articles.name + `</td>
                <td id="currency">` + articles.currency + `</td>
                <td id="unitCost">` + articles.unitCost + `</td>
                <td ><input type="number" name="count" value="2" min="1" step="1" id="count" onchange = "updateSubtotal()"
                 class="count"></td>
                <td id="subtotal"></td>
              </tr>
        `

    }

    document.getElementById("cartArticles").innerHTML = htmlContentToAppend;
    updateSubtotal();

    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
      products = resultObj.data.articles;
      showProducts(resultObj.data.articles);
    }
  });
  document.getElementById("premiumShipping").addEventListener("change", function(){
    shippingPercentage = 0.15;
    updateTotalCosts();
  });

  document.getElementById("expressShipping").addEventListener("change", function(){
    shippingPercentage = 0.07;
    updateTotalCosts();
  });

  document.getElementById("standardShipping").addEventListener("change", function(){
    shippingPercentage = 0.05;
    updateTotalCosts();
  });
  // Se muestra la forma de pago
  document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){
    document.getElementById("pago").innerHTML = CREDIT_CARD_PAYMENT;
  });

  document.getElementById("bankingRadio").addEventListener("change", function(){
    document.getElementById("pago").innerHTML = BANKING_PAYMENT;
  });
});




//Se obtiene el formulario de publicación de producto
var cartForm = document.getElementById("cart-info");

//Se agrega una escucha en el evento 'submit' que será
//lanzado por el formulario cuando se seleccione 'Vender'.
cartForm.addEventListener("submit", function(e){

    let streetAddress = document.getElementById("street");
    let numberAddress = document.getElementById("number");
    let cornerAddress = document.getElementById("corner");
    let infoMissing = false;

    //Quito las clases que marcan como inválidos
    streetAddress.classList.remove('is-invalid');
    numberAddress.classList.remove('is-invalid');
    cornerAddress.classList.remove('is-invalid');

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado el nombre y categoría.
    //Consulto por la Dirección de envío
    if (streetAddress.value === "")
    {
        streetAddress.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por el número de envío
    if (numberAddress.value <=0)
    {
        numberAddress.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por la número de envío
    if (cornerAddress.value === "")
    {
        cornerAddress.classList.add('is-invalid');
        infoMissing = true;
    }

    if(!infoMissing)
    {
        //Aquí ingresa si pasó los controles, irá a enviar
        //la solicitud para crear la publicación.

        getJSONData(CART_BUY_URL).then(function(resultObj){
            let msgToShowHTML = document.getElementById("resultSpan");
            let msgToShow = "";

            //Si la publicación fue exitosa, devolverá mensaje de éxito,
            //de lo contrario, devolverá mensaje de error.
            if (resultObj.status === 'ok')
            {
                msgToShow = resultObj.data.msg;
            }
            else if (resultObj.status === 'error')
            {
                msgToShow = ERROR_MSG;
            }

            bootbox.alert(msgToShow, null);
        });
    }

    //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
    if (e.preventDefault) e.preventDefault();
        return false;
});
