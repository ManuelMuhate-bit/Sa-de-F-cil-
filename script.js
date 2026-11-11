const unidadesPorProvincia = {
    "maputo": [
        {nome: "Hospital Provincial de Maputo"},
        {nome: "Centro de Saúde da Matola"},
        {nome: "Centro de Saúde de Boane"}
    ],
    "gaza": [
        {nome: "Hospital Provincial de Xai-Xai"},
        {nome: "Centro de Saúde de Chókwè"}
    ],
    "inhambane": [
        {nome: "Hospital Provincial de Inhambane"},
        {nome: "Centro de Saúde de Maxixe"}
    ],
    "sofala": [
        {nome: "Hospital Central da Beira"},
        {nome: "Centro de Saúde de Munhava"}
    ],
    "manica": [
        {nome: "Hospital Provincial de Chimoio"},
        {nome: "Centro de Saúde de Manica"}
    ],
    "tete": [
        {nome: "Hospital Provincial de Tete"},
        {nome: "Centro de Saúde de Moatize"}
    ],
    "zambézia": [
        {nome: "Hospital Provincial de Quelimane"},
        {nome: "Centro de Saúde de Mocuba"}
    ],
    "nampula": [
        {nome: "Hospital Central de Nampula"},
        {nome: "Centro de Saúde de Angoche"}
    ],
    "cabo-delgado": [
        {nome: "Hospital Provincial de Pemba"},
        {nome: "Centro de Saúde de Mocimboa da Praia"}
    ],
    "niassa": [
        {nome: "Hospital Provincial de Lichinga"},
        {nome: "Centro de Saúde de Mandimba"}
    ],
    "cidade-maputo": [
        {nome: "Hospital Central de Maputo"},
        {nome: "Centro de Saúde de Machava"},
        {nome: "Centro de Saúde de Xipamanine"},
        {nome: "Centro de Saúde de Malhangalene"}
    ]
};

let consultasMarcadas = [];

document.addEventListener('DOMContentLoaded', function() {
    const selectProvincia = document.getElementById('provincia');
    selectProvincia.addEventListener('change', carregarUnidades);
    
    const formulario = document.getElementById('form-marcação');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        marcarConsulta();
    });
});

function carregarUnidades() {
    const provinciaEscolhida = document.getElementById('provincia').value;
    const selectUnidade = document.getElementById('unidade');
    
    selectUnidade.innerHTML = '<option value="">Selecione a unidade</option>';
    
    if (unidadesPorProvincia[provinciaEscolhida]) {
        unidadesPorProvincia[provinciaEscolhida].forEach(function(unidade) {
            const opcao = document.createElement('option');
            opcao.value = unidade.nome;
            opcao.textContent = unidade.nome;
            selectUnidade.appendChild(opcao);
        });
    }
}

function marcarConsulta() {
    const provincia = document.getElementById('provincia').value;
    const unidade = document.getElementById('unidade').value;
    const especialidade = document.getElementById('especialidade').value;
    const data = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem-resultado');
    
    const codigo = 'MZ' + Math.floor(Math.random() * 9000 + 1000);
    
    const consulta = {
        codigo: codigo,
        nome: nome,
        telefone: telefone,
        provincia: provincia,
        unidade: unidade,
        especialidade: especialidade.replace('-', ' ').toUpperCase(),
        data: data
    };
    
    consultasMarcadas.push(consulta);
    
    mensagem.className = 'mensagem sucesso';
    mensagem.innerHTML = `
        ✅ <strong>Consulta Marcada com Sucesso!</strong><br><br>
        📋 Seu Código: <strong>${codigo}</strong><br>
        🏥 Unidade: ${unidade}<br>
        📅 Data: ${new Date(data).toLocaleDateString('pt-PT')}<br>
        🩺 Especialidade: ${consulta.especialidade}<br><br>
        Guarde este código! Será pedido na receção da unidade.
    `;
    
    document.getElementById('form-marcação').reset();
    
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 12000);
}

function verConsulta() {
    const codigo = document.getElementById('codigo-consulta').value.trim().toUpperCase();
    const resultado = document.getElementById('resultado-consulta');
    
    const consulta = consultasMarcadas.find(c => c.codigo === codigo);
    
    if (consulta) {
        resultado.style.display = 'block';
        resultado.innerHTML = `
            ✅ <strong>Consulta Encontrada</strong><br><br>
            📋 Código: ${consulta.codigo}<br>
            👤 Utente: ${consulta.nome}<br>
            📲 Telefone: ${consulta.telefone}<br>
            🏥 Unidade: ${consulta.unidade}<br>
            🩺 Especialidade: ${consulta.especialidade}<br>
            📅 Data: ${new Date(consulta.data).toLocaleDateString('pt-PT')}<br><br>
            <button type="button" onclick="cancelarConsulta('${consulta.codigo}')" 
                    style="background:#cc0000;color:white;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;">
                ❌ Cancelar Consulta
            </button>
        `;
    } else {
        resultado.style.display = 'block';
        resultado.innerHTML = `<p style="color:#cc0000;">❌ Código não encontrado. Verifique e tente novamente.</p>`;
    }
}

function cancelarConsulta(codigo) {
    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
        consultasMarcadas = consultasMarcadas.filter(c => c.codigo !== codigo);
        const resultado = document.getElementById('resultado-consulta');
        resultado.innerHTML = `<p style="color:#009933;">✅ Consulta cancelada com sucesso!</p>`;
        document.getElementById('codigo-consulta').value = '';
    }
}
