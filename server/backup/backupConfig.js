module.exports = {
    periodicBackupInterval: '*/15 * * * *', // Agendamento padrão (a cada 1 min)
};


// O formato da variável segue o padrão do cron:

// */15 * * * *: A cada 15 minutos.
// 0 0 * * *: Diariamente à meia-noite.
// 0 */2 * * *: A cada 2 horas.


// Para alterar o tempo de backup:

// Abra o arquivo config/backupConfig.js.
// Altere o valor de periodicBackupInterval.
// Reinicie a aplicação para que a nova configuração seja aplicada.