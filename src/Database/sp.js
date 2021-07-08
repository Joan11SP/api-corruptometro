module.exports= {
    crear_denuncia: 'nueva_denuncia',
    datos_lista: 'all_pro_ciu_ins',
    obtener_institucion:'filtrar_instituciones',
    filtrar_insituciones:'select nombre,count(nombre) as total from corruptometro.institucion i join corruptometro.denuncia d on  i.id_institucion = d.id_institucion group by nombre;',
    denuncia_anonima: 'select i.nombre as institucion, t.nombre as tipoCorrupcion,DATE_FORMAT(d.fecha,\'%d/%m/%y\') as fecha, p.nombre as provincia, d.detalles_denuncia, d.descripcion, c.nombre as ciudad from institucion i join tipocorrupcion t join denuncia d join provincia p join ciudad c on i.id_institucion = d.id_institucion where d.tipo_corrupcion = t.id_tipo and i.id_provincia = p.id_provincia and c.id_ciudad = p.id_ciudad  and d.id_denunciante = 0 or d.id_denunciante is null',
    denuncia_no_anonima: 'select dd.nombre as nombre_denunciante, i.nombre as institucion, t.nombre as tipoCorrupcion,DATE_FORMAT(d.fecha,\'%d/%m/%y\') as fecha, p.nombre as provincia, d.detalles_denuncia, d.descripcion, c.nombre as ciudad from institucion i join tipocorrupcion t join denuncia d join provincia p join ciudad c join denunciante dd on i.id_institucion = d.id_institucion where d.tipo_corrupcion = t.id_tipo and i.id_provincia = p.id_provincia and c.id_ciudad = p.id_ciudad and d.id_denunciante = dd.id_Denunciante'

}