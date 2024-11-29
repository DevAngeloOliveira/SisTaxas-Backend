const { Taxa } = require('../models');
const yup = require('yup');

class TaxaController {
  async index(req, res) {
    try {
      const taxas = await Taxa.findAll({
        where: { idEmpresa: req.userEmpresa }
      });
      return res.json(taxas);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        codigo: yup.string().required('Código é obrigatório'),
        taxa: yup.string().required('Nome da taxa é obrigatório'),
        valor: yup.number().required('Valor é obrigatório').positive('Valor deve ser positivo'),
        idEmpresa: yup.number().required('Empresa é obrigatória'),
        exercicio: yup.number().required('Exercício é obrigatório')
      });

      await schema.validate(req.body);

      if (req.body.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a cadastrar taxa para outra empresa' });
      }

      const taxaExists = await Taxa.findOne({
        where: { 
          codigo: req.body.codigo,
          idEmpresa: req.userEmpresa,
          exercicio: req.body.exercicio
        }
      });

      if (taxaExists) {
        return res.status(400).json({ error: 'Taxa já cadastrada para este exercício' });
      }

      const taxa = await Taxa.create(req.body);

      return res.status(201).json(taxa);
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
        codigo: yup.string(),
        taxa: yup.string(),
        valor: yup.number().positive('Valor deve ser positivo'),
        idEmpresa: yup.number(),
        exercicio: yup.number()
      });

      await schema.validate(req.body);

      const taxa = await Taxa.findByPk(req.params.id);

      if (!taxa) {
        return res.status(404).json({ error: 'Taxa não encontrada' });
      }

      if (taxa.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      if (req.body.idEmpresa && req.body.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a transferir taxa para outra empresa' });
      }

      await taxa.update(req.body);

      return res.json(taxa);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const taxa = await Taxa.findByPk(req.params.id);

      if (!taxa) {
        return res.status(404).json({ error: 'Taxa não encontrada' });
      }

      if (taxa.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await taxa.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new TaxaController(); 