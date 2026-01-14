// ================== CADASTRAR ALUNO ==================
async function cadastrarAluno(event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        datacadastro: document.getElementById('datacadastro').value
    };

    await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
    });

    window.location.href = 'alunos.html';
}

// ================== LISTAR ALUNOS ==================
async function listarAlunos() {
    const response = await fetch('http://localhost:3000/alunos');
    const alunos = await response.json();

    const tabela = document.getElementById('tabelaResultado');
    tabela.innerHTML = '';

    alunos.forEach(aluno => {
        tabela.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.email}</td>
                <td>${aluno.tel}</td>
                <td>${aluno.datacadastro}</td>
                <td class="text-center">
                    <!-- VER -->
                    <button class="btn btn-sm btn-info text-white me-1"
                        onclick="verAluno(${aluno.id})">
                        <i class="bi bi-eye-fill"></i>
                    </button>

                    <!-- EDITAR -->
                    <button class="btn btn-sm btn-warning text-white me-1"
                        onclick="editarAluno(${aluno.id})">
                        <i class="bi bi-pencil-fill"></i>
                    </button>

                    <!-- EXCLUIR -->
                    <button class="btn btn-sm btn-danger"
                        onclick="excluirAluno(${aluno.id})">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

// ================== VER ==================
function verAluno(id) {
    window.location.href = `ver-aluno.html?id=${id}`;
}

// ================== EDITAR ==================
function editarAluno(id) {
    window.location.href = `editar-aluno.html?id=${id}`;
}

// ================== EXCLUIR ==================
async function excluirAluno(id) {
    const confirmar = confirm('Deseja realmente excluir este aluno?');
    if (!confirmar) return;

    await fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'DELETE'
    });

    listarAlunos();
}

// ================== AUTO ==================
if (document.getElementById('tabelaResultado')) {
    listarAlunos();
}
