class Task{
  static listaTasks = [];
  static contador = 0;

  constructor(nome, descricao) {
    this.id = ++Task.contador;
    this.nome = nome;
    this.descricao = descricao;
  }

  static listar() {
    console.log("Listando Tasks");
    return Task.listaTasks;
  }

  static listarPorId(id) {
    return Task.listaTasks.find(task=> task.id === Number(id));
  }

  static adicionarTask(task) {
    console.log("Teste1");
    Task.listaTasks.push(task);

    return JSON.stringify({ msg: "Sucesso!" });
  }

  static removerTask(id) {
    const index = Task.listaTasks.findIndex(p => p.id === id);

    if (index !== -1) {
      Task.listaTasks.splice(index, 1);
      return JSON.stringify({ msg: "Task removido com sucesso!" });
    }

    return JSON.stringify({ msg: "Task não encontrado!" });
  }

  static editarTask(id, task) {
    const index = Task.listaTasks.findIndex(p => p.id === id);

    if (index !== -1) {
      Task.listaTasks[index] = {
        ...task
        ,
        id: Number(id)
      };

      return JSON.stringify({ msg: "Task atualizado com sucesso!" });
    }

    return JSON.stringify({ msg: "Tasks não encontrado!" });
  }
};

module.exports = Task;
