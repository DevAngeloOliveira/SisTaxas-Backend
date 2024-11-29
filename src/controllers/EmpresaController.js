const { Empresa } = require('../models');
const yup = require('yup');

class EmpresaController {
  async index(req, res) {
    try {
      const empresas = await Empresa.findAll();
      return res.json(empresas);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        CNPJ: yup.string().required('CNPJ é obrigatório'),
        empresa: yup.string().required('Nome da empresa é obrigatório')
      });

      await schema.validate(req.body);

      const empresaExists = await Empresa.findOne({
        where: { CNPJ: req.body.CNPJ }
      });

      if (empresaExists) {
        return res.status(400).json({ error: 'Empresa já cadastrada' });
      }

      const empresa = await Empresa.create(req.body);

      return res.status(201).json(empresa);
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
        CNPJ: yup.string(),
        empresa: yup.string()
      });

      await schema.validate(req.body);

      const empresa = await Empresa.findByPk(req.params.id);

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      await empresa.update(req.body);

      return res.json(empresa);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const empresa = await Empresa.findByPk(req.params.id);

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      await empresa.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new EmpresaController(); 