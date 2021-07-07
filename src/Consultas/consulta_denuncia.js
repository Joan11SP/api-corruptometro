var mysql = require('../Database/mysql');
var consulta = require('../Database/sp')

const util = require('util');
const query = util.promisify(mysql.query).bind(mysql);
const crear_denuncia = async (denuncia) => {
    try {
        let guardarDenunciante;

        if (parseInt(denuncia.tipo) == 2 ){
            guardarDenunciante = await query(
                'insert into denuncinante (edad,genero,profesion,nombre) values (?,?,?,?)',
                [
                    parseInt(denuncia.edad),
                    parseInt(denuncia.genero), // 1 hombre - 2 mujer - 3 otro
                    denuncia.profesion,
                    denuncia.nombre
                ]
            );
            denuncia.idDenunciante = guardarDenunciante.insertId;
        }
        

        const guardar = await query(
            `insert into denuncia(id_denunciante, denunciado, fecha, tipo_corrupcion, detalles_denuncia, nivel_corrupcion, es_denuncia_real, correo_electronico, id_institucion, archivo, descripcion,cargo)  
            values (?,?,?,?,?,?,?,?,?,?,?,?);`,
            [
                parseInt(denuncia.idDenunciante),
                denuncia.denunciado,
                denuncia.fecha,
                parseInt(denuncia.tipoCorrupcion),
                denuncia.detallesDenuncia,
                parseInt(denuncia.nivelCorrupcion),
                parseInt(denuncia.esReal),
                denuncia.correo,
                parseInt(denuncia.idInstitucion),
                denuncia.archivo == null ? ' ':denuncia.archivo,
                denuncia.descripcion,
                denuncia.cargo == undefined ? null : denuncia.cargo
            ]
        );
        return { respuesta: guardar.affectedRows }
    } catch (error) {
        throw error;
    }
}
const buscar_denuncia_anonima = async () => {
    try {
        
        const buscar = await query(consulta.denuncia_anonima);

        return {mensaje:'Resultado encontrados', ok: 1, resultados: buscar};

    } catch (error) {
        throw error;
    }
}
const buscar_denuncia_no_anonima = async () => {
    try {
        
        const buscar = await query(consulta.denuncia_no_anonima);

        return {mensaje:'Resultado encontrados', ok: 1, resultados: buscar};

    } catch (error) {
        throw error;
    }
}

const obtner_datos_lista = async (denuncia) => {
    try {
        const lista = await query(
            `call ${consulta.datos_lista}`
        );
        return { mensaje:'Resultado', ok:1, resultados:lista}
    } catch (error) {
        throw error;
    }
}
const obtner_institucion = async (institucion) => {
    try {
        const lista = await query(`call ${consulta.obtener_institucion}(?)`,[institucion.idProvincia]
        );
        return { mensaje:'Resultado', ok:1, resultados:lista}
    } catch (error) {
        throw error;
    }
}
const filtrar_institucion = async (institucion) => {
    try {
        const lista = await query(consulta.filtrar_insituciones);
        return { mensaje:'Resultado', ok:1, resultados:lista}
    } catch (error) {
        throw error;
    }
} 
module.exports = {
    crear_denuncia,
    buscar_denuncia_anonima,
    buscar_denuncia_no_anonima,
    obtner_datos_lista,
    obtner_institucion,
    filtrar_institucion

}