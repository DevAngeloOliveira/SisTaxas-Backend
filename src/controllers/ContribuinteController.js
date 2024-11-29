const { Contribuinte } = require('../models');
const yup = require('yup');

class ContribuinteController {
  async index(req, res) {
    try {
      const contribuintes = await Contribuinte.findAll({
        where: { idEmpresa: req.userEmpresa }
      });
      return res.json(contribuintes);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        CPF: yup.string().required('CPF é obrigatório'),
        nome: yup.string().required('Nome é obrigatório'),
        idEmpresa: yup.number().required('Empresa é obrigatória')
      });

      await schema.validate(req.body);

      if (req.body.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a cadastrar contribuinte para outra empresa' });
      }

      const contribuinteExists = await Contribuinte.findOne({
        where: { 
          CPF: req.body.CPF,
          idEmpresa: req.userEmpresa
        }
      });

      if (contribuinteExists) {
        return res.status(400).json({ error: 'Contribuinte já cadastrado para esta empresa' });
      }

      const contribuinte = await Contribuinte.create(req.body);

      return res.status(201).json(contribuinte);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const schema = yup.object().shape({
        CPF: yup.string(),
        nome: yup.string(),
        idEmpresa: yup.number()
      });

      await schema.validate(req.body);

      const contribuinte = await Contribuinte.findByPk(req.params.id);

      if (!contribuinte) {
        return res.status(404).json({ error: 'Contribuinte não encontrado' });
      }

      if (contribuinte.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      if (req.body.idEmpresa && req.body.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a transferir contribuinte para outra empresa' });
      }

      await contribuinte.update(req.body);

      return res.json(contribuinte);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const contribuinte = await Contribuinte.findByPk(req.params.id);

      if (!contribuinte) {
        return res.status(404).json({ error: 'Contribuinte não encontrado' });
      }

      if (contribuinte.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await contribuinte.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new ContribuinteController(); 