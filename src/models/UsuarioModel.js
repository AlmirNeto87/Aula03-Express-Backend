
class Usuario {
  static listaUsuarios = [];
  static contador = 0;

  constructor(nome, email, login, password) {
    this.id = ++Usuario.contador;
    this.nome = nome;
    this.email = email;
    this.login = login;
    this.password = password;
  }

  static {
    // Usuário cadastrado automaticamente
    const usuarioAdmin = new Usuario(
      "Administrador",
      "admin@email.com",
      "admin",
      "123456"
    );

    Usuario.listaUsuarios.push(usuarioAdmin);
  }

  static authenticate(login, password) {
    const userAuth = Usuario.listaUsuarios.find(
      user => user.login === login &&
              user.password === password
    );

    return userAuth;
  }

  static listar() {
    return Usuario.listaUsuarios;
  }

  static listarPorId(id) {
    return Usuario.listaUsuarios.find(
      usuario => usuario.id === Number(id)
    );
  }

  static adicionarUsuario(usuario) {
    Usuario.listaUsuarios.push(usuario);
    return JSON.stringify({ msg: "Sucesso!" });
  }

  static removerUsuario(id) {
    const index = Usuario.listaUsuarios.findIndex(
      p => p.id === Number(id)
    );

    if (index !== -1) {
      Usuario.listaUsuarios.splice(index, 1);
      return JSON.stringify({
        msg: "Usuario removido com sucesso!"
      });
    }

    return JSON.stringify({
      msg: "Usuario não encontrado!"
    });
  }

  static editarUsuario(id, usuario) {
    const index = Usuario.listaUsuarios.findIndex(
      p => p.id === Number(id)
    );

    if (index !== -1) {
      Usuario.listaUsuarios[index] = {
        ...usuario,
        id: Number(id)
      };

      return JSON.stringify({ msg: "Usuario atualizado!" });
    }

    return JSON.stringify({
      msg: "Usuario não encontrado!"
    });
  }
}

module.exports = Usuario;
