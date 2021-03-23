var { Router } = require('express');

var control_denuncia = require('../Controllers/controller_denuncia');
const upload = require('../utilities/multer');

var router = Router();

// ROUTES OF DENUNCIAS
router.post('/nueva-denuncia',upload, control_denuncia.nueva_denuncia);
router.post('/buscar-anonima', control_denuncia.buscar_anonima);
router.post('/buscar-no_anonima', control_denuncia.buscar_no_anonima);
router.post('/datos-lista', control_denuncia.datos_lista);
router.post('/obtener-institucion', control_denuncia.datos_lista_institucion);
router.post('/filtro-institucion', control_denuncia.filtro_insitutciones);

module.exports = router;