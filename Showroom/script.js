document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      const produtosContainer = document.getElementById("produtos-container");

      data.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = produto.descricao;

        const cardStatus = document.createElement("div");
        cardStatus.className = "card-status";
        cardStatus.style.backgroundColor = produto.quantidade ? "green" : "red"; // Define a cor baseado na quantidade

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = "Preço: $" + produto.preco.toFixed(2);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardStatus); // Adiciona cardStatus ao cardBody

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));
});
