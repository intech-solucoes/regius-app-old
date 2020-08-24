var recadastramento = {
    passos: [
        // Passo 1
        {
            titulo: "Dados Pessoais",
            tabela: "ASD_EFG",
            campos: [
                {
                    titulo: "Nome",
                    id: "nome",
                    tipo: "text",
                    obrigatorio: false,
                    anexaArquivo: false,
                    arquivoAnexado: false,
                    apenasLeitura: false,
                    banco: {
                        coluna: "NOM_PARTICIPANTE"
                    }
                },
                {
                    titulo: "Endereço",
                    id: "endereco",
                    tipo: "text",
                    obrigatorio: true,
                    anexaArquivo: true,
                    arquivoAnexado: false,
                    apenasLeitura: true,
                    banco: {
                        tabela: "ASD_EFG_ENDERECO",
                        coluna: "NOM_PARTICIPANTE"
                    }
                }
            ]
        },
        
        // Passo 2
        {
            
        }
    ]
};
