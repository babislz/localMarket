document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const produtosContainer = document.getElementById("produtos-container");

      produtos.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "360px";
        card.style.transition = "300ms";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardBody.style.display = "flex";
        cardBody.style.flexDirection = "column";
        cardBody.style.justifyContent = "space-between";
        cardBody.style.alignItems = "center";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = produto.descricao;

        const priceAndBt = document.createElement("div");
        priceAndBt.className = "card-price-and-bt";
        priceAndBt.style.display = "flex";
        priceAndBt.style.flexDirection = "column";
        priceAndBt.style.justifyContent = "flex-end";
        priceAndBt.style.paddingTop = "20px";
        priceAndBt.style.alignItems = "center";

        const cardStatus = document.createElement("div");
        cardStatus.className = "card-status";
        cardStatus.style.backgroundColor = produto.quantidade>0?"green":"red";

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = "Preço: $" + produto.preco.toFixed(2);

        cardBody.appendChild(cardTitle);
        priceAndBt.appendChild(cardText);
        cardBody.appendChild(priceAndBt);
        cardBody.appendChild(cardStatus);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));
});
