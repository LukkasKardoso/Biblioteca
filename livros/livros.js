const tabela = document.getElementById('tabelaLivros');

// carregar livros
async function carregarLivros() {

        const response = await fetch('http://localhost:3000/livros');
        const livros = await response.json();

        tabela.innerHTML = '';

        livros.forEach(livro => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${livro.id}</td>
                <td>${livro.titulo ?? '-'}</td>
                <td>${livro.autor ?? '-'}</td>
                <td>${livro.categoria ?? '-'}</td>
                <td>${livro.editora ?? '-'}</td>
                <td>${livro.ano ?? '-'}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm me-1" onclick="editarLivro('${livro.id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="excluirLivro('${livro.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;

            tabela.appendChild(tr);
        });
    }



// editar livro
function editarLivro(id) {
    window.location.href = `edicao-livro.html?id=${id}`;
}

// excluir livro
async function excluirLivro(id) {
    const confirmar = confirm('Tem certeza que deseja excluir este livro?');

    if (!confirmar) return;

    try {
        const response = await fetch(`http://localhost:3000/livros/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir');
        }

        carregarLivros(); // recarrega a tabela

    } catch (error) {
        alert('Erro ao excluir livro');
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', carregarLivros);
