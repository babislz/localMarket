$(document).ready(function () {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const listaElement = $("#lista");
  const totalElement = $("#total");

  function exibirCarrinho() {
    listaElement.empty();
  
    let totalPreco = 0;
  
    $.each(carrinho, function (index, item) {
      const removeButton = $("<button>")
        .text("❌")
        .click(function () {
          removerItemDoCarrinho(index);
        });
  
      const listItem = $("<li>")
        .addClass("list-item")  
        .append(removeButton)
        .append(`${item.descricao} - Preço: $${item.preco.toFixed(2)}`);
  
      listaElement.append(listItem);
  
      totalPreco += item.preco;
    });
  
    totalElement.text(`Total: $${totalPreco.toFixed(2)}`);
  }
  
  

  function removerItemDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    exibirCarrinho();
  }

  exibirCarrinho();
});

function gerarDocumentoWord() {
  const listaElement = document.getElementById("lista");
  const totalElement = document.getElementById("total");

  const listaClone = listaElement.cloneNode(true);

  $(listaClone).find("button").remove();

  const listaHtml = listaClone.innerHTML;
  const totalHtml = totalElement.innerHTML;

  const conteudoHtml = `
    <html>
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        <h1>Pedido confirmado</h1>
        <h3>Agradecemos sua preferencia</h3>
        ${listaHtml}
        <br>
        <br>
        ${totalHtml}
      </body>
    </html>
  `;

  const blob = new Blob([conteudoHtml], { type: "application/msword" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "carrinho.doc";
  link.click();
  document.getElementById("pedido").style.display = "block";
}

function successClose() {
  document.getElementById("pedido").style.display = "none";
}
