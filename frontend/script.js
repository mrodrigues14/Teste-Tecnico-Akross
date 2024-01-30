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
                return response.json();
            } else {
                throw new Error('Falha ao adicionar squad');
            }
        })
        .then(() => {
            alert('Squad adicionado com sucesso!');
            document.getElementById('formSquad').reset();
            carregarSquadsEColaboradores();
        })
        .catch(error => {
            console.error('Erro ao adicionar squad:', error);
        });
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
                return response.json();
            } else {
                throw new Error('Falha ao adicionar colaborador');
            }
        })
        .then(() => {
            alert('Colaborador adicionado com sucesso!');
            document.getElementById('formColaborador').reset();
            carregarSquadsEColaboradores();
        })
        .catch(error => {
            console.error('Erro ao adicionar colaborador:', error);
        });
});

function carregarSquadsEColaboradores() {
    fetch('/squads')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const listaSquads = document.getElementById('listaSquads');
            listaSquads.innerHTML = '';
            data.forEach(squad => {
                const item = document.createElement('li');
                item.textContent = squad.name;
                listaSquads.appendChild(item);
            });
            carregarColaboradores();
        })
        .catch(error => {
            console.error('Erro ao carregar squads:', error);
        });
}

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
