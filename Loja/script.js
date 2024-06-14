document.addEventListener("DOMContentLoaded", function () {
  fetch("../Dados/loja.json")
    .then((response) => response.json())
    .then((data) => {
      produtos = data;
      const produtosContainer = document.getElementById("produtos-container");

      produtos.forEach((produto, index) => {
        const card = document.createElement("div");
        card.className = "card";
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

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.textContent = "Preço: $" + produto.preco.toFixed(2);

        const btnAdicionarAoCarrinho = document.createElement("a");
        btnAdicionarAoCarrinho.href = "#";
        btnAdicionarAoCarrinho.className = "btn btn-primary btn-adicionar-ao-carrinho";
        btnAdicionarAoCarrinho.style.backgroundColor = "#1d1d3b";
        btnAdicionarAoCarrinho.style.padding = "13px";
        btnAdicionarAoCarrinho.textContent = "Adicionar ao Carrinho";
        btnAdicionarAoCarrinho.setAttribute("data-indice", index);

        cardBody.appendChild(cardTitle);
        priceAndBt.appendChild(cardText);
        priceAndBt.appendChild(btnAdicionarAoCarrinho);
        cardBody.appendChild(priceAndBt);

        card.appendChild(imagem);
        card.appendChild(cardBody);

        produtosContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON", error));

  $("#produtos-container").on(
    "click", 
    ".btn-adicionar-ao-carrinho", 
    function () {
      const indexDoProduto = $(this).data("indice");
      const produtoSelecionado = produtos[indexDoProduto];
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(produtoSelecionado);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
  });
});
