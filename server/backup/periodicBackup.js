require('dotenv').config();

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Função para criar backup periódico
function createPeriodicBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formatar timestamp
    const backupDirectory = path.join(__dirname, 'backupFiles'); // Diretório para salvar os backups
    
    const backupFileName = `periodic_backup_${timestamp}.sql`;
    
    const backupPath = path.join(backupDirectory, backupFileName);

    // Verificar se o diretório existe; caso contrário, criar
    if (!fs.existsSync(backupDirectory)) {
        fs.mkdirSync(backupDirectory, { recursive: true });
    }

    const dbName = process.env.DB_DATABASE;
    const dbPassword = process.env.DB_PASSWORD;

    // Comando mysqldump (ajuste os parâmetros conforme necessário)
    const dumpCommand = `mysqldump -u root -p${dbPassword} ${dbName} > "${backupPath}"`;

    // Executa o comando de dump
    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Erro ao criar backup periódico:', error.message);
            return;
        }
        console.log(`Backup periódico criado com sucesso: ${backupPath}`);
    });
}

module.exports = { createPeriodicBackup };
