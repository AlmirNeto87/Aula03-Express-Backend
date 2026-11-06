class Produto {
  static listaProdutos = [];
  static contador = 0;

  constructor(nome, valor) {
    this.id = ++Produto.contador;
    this.nome = nome;
    this.valor = valor;
  }

  static listar() {
    console.log("Listando produtos");
    return Produto.listaProdutos;
  }

  static listarPorId(id) {
        return Produto.listaProdutos.find(
            produto => produto.id === Number(id)
        );
    }

  static adicionarProduto(produto) {
    Produto.listaProdutos.push(produto);

    return JSON.stringify({ msg: "Sucesso!" });
  }

  static removerProduto(id) {
    const index = Produto.listaProdutos.findIndex(p => p.id === id);

    if (index !== -1) {
      Produto.listaProdutos.splice(index, 1);
      return JSON.stringify({ msg: "Produto removido com sucesso!" });
    }

    return JSON.stringify({ msg: "Produto não encontrado!" });
  }

  static editarProduto(id, produto) {
    const index = Produto.listaProdutos.findIndex(p => p.id === id);

    if (index !== -1) {
      Produto.listaProdutos[index] = {
        ...produto,
        id: Number(id)
      };

      return JSON.stringify({ msg: "Produto atualizado com sucesso!" });
    }

    return JSON.stringify({ msg: "Produto não encontrado!" });
  }
}

module.exports = Produto;
