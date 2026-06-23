let produtos = [];

fetch('produtos.json')
  .then(r => r.json())
  .then(data => {
      produtos = data;

      const url = new URL(window.location);

      const buscaInicial =
          url.searchParams.get("busca");

      if(buscaInicial){
          document.getElementById("busca").value =
              buscaInicial;

          pesquisar(buscaInicial);
      }
  });

const campo =
    document.getElementById("busca");

campo.addEventListener("input", e => {

    const termo = e.target.value;

    const url = new URL(window.location);

    if(termo){
        url.searchParams.set(
            "busca",
            termo
        );
    }else{
        url.searchParams.delete(
            "busca"
        );
    }

    window.history.replaceState(
        {},
        "",
        url
    );

    pesquisar(termo);

});

function pesquisar(termo){

    termo = termo.toLowerCase();

    const encontrados =
        produtos.filter(p =>

            p.nome.toLowerCase().includes(termo)
            ||
            p.codigo.toLowerCase().includes(termo)
            ||
            p.marca.toLowerCase().includes(termo)

        );

    document.getElementById(
        "resultado"
    ).innerHTML =
        encontrados.map(p => `
            <div class="card">

                <div class="codigo">
                    Código ${p.codigo}
                </div>

                <h2>${p.nome}</h2>

                <p>${p.marca}</p>

                <p>${p.descricao}</p>

            </div>
        `).join('');
}
