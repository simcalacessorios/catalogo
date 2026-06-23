let produtos = [];

const campoBusca =
document.getElementById("busca");

fetch("produtos.json")
.then(r => r.json())
.then(data => {

    produtos = data;

    const params =
    new URLSearchParams(
        window.location.search
    );

    const busca =
    params.get("busca");

    if(busca){

        campoBusca.value = busca;

        pesquisar(busca);

    }

});

campoBusca.addEventListener(
"input",
e => {

    const termo = e.target.value;

    const url =
    new URL(window.location);

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

    history.replaceState(
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

        p.codigo.toLowerCase().includes(termo)
        ||
        p.nome.toLowerCase().includes(termo)
        ||
        p.marca.toLowerCase().includes(termo)

    );

    const resultado =
    document.getElementById(
        "resultado"
    );

    if(encontrados.length === 1){

        exibirProduto(
            encontrados[0]
        );

        return;
    }

    resultado.innerHTML =
    `
    <div class="lista-busca">
    ${
        encontrados.map(p => `
        <div
            class="item-busca"
            onclick="abrirProduto('${p.codigo}')"
        >
            <strong>${p.nome}</strong><br>
            Código: ${p.codigo}<br>
            Marca: ${p.marca}
        </div>
        `).join("")
    }
    </div>
    `;
}

function abrirProduto(codigo){

    document.getElementById(
        "busca"
    ).value = codigo;

    const url =
    new URL(window.location);

    url.searchParams.set(
        "busca",
        codigo
    );

    history.replaceState(
        {},
        "",
        url
    );

    pesquisar(codigo);
}

function exibirProduto(produto){

    document.getElementById(
        "resultado"
    ).innerHTML =
    `
    <div class="produto">

        <div class="topo-produto">

            <div>

                <div class="imagem-principal">
                    <img
                        id="imgPrincipal"
                        src="${produto.imagem}"
                    >
                </div>

                <div class="galeria">

                    ${
                        produto.galeria.map(img => `
                        <img
                            src="${img}"
                            onclick="
                            document.getElementById(
                            'imgPrincipal'
                            ).src='${img}'
                            "
                        >
                        `).join("")
                    }

                </div>

            </div>

            <div class="info">

                <h2>${produto.nome}</h2>

                <div class="codigo">
                    Código: ${produto.codigo}
                </div>

                <div class="descricao">
                    ${produto.descricao}
                </div>

            </div>

        </div>

        <div class="bloco">

            <h3>Especificações</h3>

            <table class="tabela">

            ${
                Object.entries(
                    produto.especificacoes
                )
                .map(
                ([k,v]) =>
                `
                <tr>
                    <td>${k}</td>
                    <td>${v}</td>
                </tr>
                `
                )
                .join("")
            }

            </table>

        </div>

        <div class="bloco">

            <h3>Downloads</h3>

            ${
                produto.downloads.map(
                d => `
                <a
                class="download"
                href="${d.arquivo}"
                target="_blank">
                📄 ${d.titulo}
                </a><br>
                `
                ).join("")
            }

        </div>

    </div>
    `;
}
