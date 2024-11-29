const { UsuarioTaxa, Usuario, Taxa } = require('../models');
const yup = require('yup');

class UsuarioTaxaController {
  async index(req, res) {
    try {
      const usuarioTaxas = await UsuarioTaxa.findAll({
        where: { idEmpresa: req.userEmpresa },
        include: [
          {
            model: Usuario,
            attributes: ['id', 'usuario', 'CPF']
          },
          {
            model: Taxa,
            attributes: ['id', 'codigo', 'taxa', 'valor']
          }
        ]
      });
      return res.json(usuarioTaxas);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        idUsuario: yup.number().required('Usuário é obrigatório'),
        idTaxa: yup.number().required('Taxa é obrigatória'),
        idEmpresa: yup.number().required('Empresa é obrigatória'),
        exercicio: yup.number().required('Exercício é obrigatório')
      });

      await schema.validate(req.body);

      if (req.body.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a criar relação para outra empresa' });
      }

      const usuarioTaxaExists = await UsuarioTaxa.findOne({
        where: {
          idUsuario: req.body.idUsuario,
          idTaxa: req.body.idTaxa,
          exercicio: req.body.exercicio
        }
      });

      if (usuarioTaxaExists) {
        return res.status(400).json({ error: 'Relação já existe para este exercício' });
      }

      const usuario = await Usuario.findByPk(req.body.idUsuario);
      const taxa = await Taxa.findByPk(req.body.idTaxa);

      if (!usuario || !taxa) {
        return res.status(404).json({ error: 'Usuário ou Taxa não encontrados' });
      }

      if (usuario.idEmpresa !== req.userEmpresa || taxa.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      const usuarioTaxa = await UsuarioTaxa.create(req.body);

      return res.status(201).json(usuarioTaxa);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const usuarioTaxa = await UsuarioTaxa.findByPk(req.params.id);

      if (!usuarioTaxa) {
        return res.status(404).json({ error: 'Relação não encontrada' });
      }

      if (usuarioTaxa.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await usuarioTaxa.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new UsuarioTaxaController(); 