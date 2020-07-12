//-----------------------//
// PUERTO
//----------------------//

process.env.PORT = process.env.PORT || 3000;

//-----------------------//
// VENCIMIENTO DEL TOKEN
//60 Segundos
//60 minutos
//24 horas
//30 dias
//----------------------//

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//-----------------------//
// SEED DEL TOKEN
//----------------------//

process.env.SEED = 'este-es-el-seed-desarrollo';