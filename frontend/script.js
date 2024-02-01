window.onload = function() {
    carregarSquadsEColaboradores();
};

document.getElementById('formSquad').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('squadName').value;
    fetch('/squads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })
        .then(response => {
            if (response.ok) {
                if (response.headers.get('Content-Type').includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else {
                throw new Error('Falha ao adicionar squad');
            }
        })
        .then(data => {
            if (typeof data === 'object') {
                alert('Squad adicionado com sucesso!');
            } else {
                alert(data);
            }
            document.getElementById('formSquad').reset();
            carregarSquadsEColaboradores();
        })
});

document.getElementById('formColaborador').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('colaboradorName').value;
    const squad_id = document.getElementById('squadId').value;
    fetch('/colaboradores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, squad_id }),
    })
        .then(response => {
            if (response.ok) {
                if (response.headers.get('Content-Type').includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else {
                throw new Error('Falha ao adicionar colaborador');
            }
        })
        .then(data => {
            if (typeof data === 'object') {
                alert('Colaborador adicionado com sucesso!');
            } else {
                alert(data);
            }
            document.getElementById('formColaborador').reset();
            carregarSquadsEColaboradores();
        })
        .catch(error => {
            console.error('Erro ao adicionar colaborador:', error);
        });
});


function carregarSquadsEColaboradores() {
    fetch('/squads')
        .then(response => response.json())
        .then(squads => {
            const squadsContainer = document.getElementById('squadsContainer');
            squadsContainer.innerHTML = '';

            squads.forEach(squad => {
                const squadDiv = document.createElement('div');
                squadDiv.className = 'squad';
                squadDiv.id = `squad-${squad.id}`;
                squadDiv.innerHTML = `<h3>${squad.name}</h3><ul></ul>`;
                squadsContainer.appendChild(squadDiv);
            });

            return fetch('/colaboradores');
        })
        .then(response => response.json())
        .then(colaboradores => {
            colaboradores.forEach(colaborador => {
                const squadUl = document.querySelector(`#squad-${colaborador.squad_id} ul`);
                if (squadUl) {
                    const li = document.createElement('li');
                    li.textContent = colaborador.name;
                    squadUl.appendChild(li);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
        });
}

document.getElementById('editSquadBtn').addEventListener('click', function() {
    document.getElementById('editSquadPopup').style.display = 'block';
    carregarSquadsParaSelecao();
});

function fecharPopup() {
    document.getElementById('editSquadPopup').style.display = 'none';
}

function carregarSquadsParaSelecao() {
    fetch('/squads')
        .then(response => response.json())
        .then(squads => {
            const select = document.getElementById('squadSelection');
            select.innerHTML = '';
            squads.forEach(squad => {
                const option = document.createElement('option');
                option.value = squad.id;
                option.textContent = squad.name;
                select.appendChild(option);
            });
            carregarDetalhesDoSquad(select.value);
        });
}

function atualizarSelecaoSquad() {
    const select = document.getElementById('squadSelection');
    select.innerHTML = '';
    fetch('/squads')
        .then(response => response.json())
        .then(squads => {
            squads.forEach(squad => {
                const option = document.createElement('option');
                option.value = squad.id;
                option.textContent = squad.name;
                select.appendChild(option);
            });
            if (squads.length > 0) {
                carregarColaboradoresDoSquad(squads[0].id);
            }
        })
        .catch(error => console.error('Erro ao carregar squads:', error));


    select.onchange = () => carregarColaboradoresDoSquad(select.value);
}

function carregarColaboradoresDoSquad(squadId) {
    fetch(`/colaboradores?squad_id=${squadId}`)
        .then(response => response.json())
        .then(colaboradores => {
            const colaboradoresContainer = document.getElementById('colaboradoresContainer');
            colaboradoresContainer.innerHTML = '';
            colaboradores.forEach(colaborador => {
                const colaboradorDiv = document.createElement('div');
                colaboradorDiv.innerHTML = `${colaborador.name} <button onclick="editarColaborador(${colaborador.id})">Editar</button> <button onclick="removerColaborador(${colaborador.id})">Remover</button>`;
                colaboradoresContainer.appendChild(colaboradorDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar colaboradores:', error));
}

function editarColaborador(colaboradorId) {
    const novoNome = prompt("Novo nome do colaborador:");
    if (novoNome) {
        fetch(`/colaboradores/${colaboradorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: novoNome }),
        })
            .then(response => {
                if (response.ok) {
                    carregarColaboradoresDoSquad(document.getElementById('squadSelection').value);
                } else {
                    alert('Falha ao editar colaborador');
                }
            });
    }
}

function removerColaborador(colaboradorId) {
    if (confirm("Tem certeza que deseja remover este colaborador?")) {
        fetch(`/colaboradores/${colaboradorId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    carregarColaboradoresDoSquad(document.getElementById('squadSelection').value);
                } else {
                    alert('Falha ao remover colaborador');
                }
            });
    }
}

document.getElementById('editSquad').addEventListener('click', function() {
    const squadId = document.getElementById('squadSelection').value;
    const novoNome = prompt("Novo nome do squad:");
    if (novoNome) {
        fetch(`/squads/${squadId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: novoNome }),
        })
            .then(response => {
                if (response.ok) {
                    atualizarSelecaoSquad();
                } else {
                    alert('Falha ao editar o nome do squad');
                }
            });
    }
});

document.getElementById('deleteSquad').addEventListener('click', function() {
    const squadId = document.getElementById('squadSelection').value;
    if (confirm("Tem certeza que deseja remover este squad?")) {
        fetch(`/squads/${squadId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    atualizarSelecaoSquad();
                } else {
                    alert('Falha ao remover squad');
                }
            });
    }
});


function carregarColaboradores() {
    fetch('/colaboradores')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const listaColaboradores = document.getElementById('listaColaboradores');
            listaColaboradores.innerHTML = '';
            data.forEach(colaborador => {
                const item = document.createElement('li');
                item.textContent = `${colaborador.name} (Squad ID: ${colaborador.squad_id})`;
                listaColaboradores.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar colaboradores:', error);
        });
}
