require('dotenv').config();

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Função para criar backup após evento (por exemplo, ao deletar um usuário)
function createEventBackup(eventDescription) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Formatar timestamp
    const backupDirectory = path.join(__dirname, 'backupFiles');

    const backupFileName = `event_backup_${timestamp}.sql`;

    const backupPath = path.join(backupDirectory, backupFileName);

    // Verificar se o diretório existe; caso contrário, criar
    if (!fs.existsSync(backupDirectory)) {
        fs.mkdirSync(backupDirectory, { recursive: true });
    }


    const dbName = process.env.DB_DATABASE;

    // Comando mysqldump
    const dumpCommand = `mysqldump --defaults-file="${path.join(__dirname, '../my.cnf')}" "${dbName}" > "${backupPath}"`;



    // Executa o comando de dump
    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao criar backup após o evento: ${eventDescription}`, error.message)
            return;
        }
        if (stderr) {
            console.error(`Erro ao criar backup após o evento: ${stderr}`);
            return;
        }
        console.log(`Backup após o evento (${eventDescription}) criado com sucesso: ${backupPath}`);
    });
}

module.exports = { createEventBackup };
