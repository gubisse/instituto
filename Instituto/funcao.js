// auth.js

// Lista de dados
const lista_de_usuarios = [
  {id: 1234, nome: "YX", apelido: "XX", usuario: "xx", senha: "yy", acesso: "teacher"},
  {id: 1235, nome: "XY", apelido: "Xy", usuario: "xy", senha: "yx", acesso: "student"}
];

// Função de login
function auth(username, password) {
  const user = lista_de_usuarios.find(u => u.usuario === username && u.senha === password);

  if (user) {
    return { success: true, message: 'Login successful', user };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

// security.js



// Exportar a função para uso externo
module.exports = { auth };
