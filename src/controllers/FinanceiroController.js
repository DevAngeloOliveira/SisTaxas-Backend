const { Financeiro, Taxa, Contribuinte } = require('../models');
const yup = require('yup');

class FinanceiroController {
  async index(req, res) {
    try {
      const financeiros = await Financeiro.findAll({
        where: { empresa: req.userEmpresa },
        include: [
          {
            model: Taxa,
            attributes: ['codigo', 'taxa']
          }
        ]
      });
      return res.json(financeiros);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        idCPF: yup.string().required('CPF é obrigatório'),
        vencimento: yup.date().required('Data de vencimento é obrigatória'),
        descricao: yup.string().required('Descrição é obrigatória'),
        valor: yup.number().required('Valor é obrigatório').positive('Valor deve ser positivo'),
        desconto: yup.number().min(0, 'Desconto não pode ser negativo'),
        codigoTaxa: yup.string().required('Código da taxa é obrigatório'),
        exercicio: yup.number().required('Exercício é obrigatório'),
        valorTotal: yup.number().required('Valor total é obrigatório').positive('Valor total deve ser positivo'),
        codigoBarra: yup.string().required('Código de barras é obrigatório'),
        linhaDigitavel: yup.string().required('Linha digitável é obrigatória'),
        qrcode: yup.string(),
        linkPix: yup.string(),
        usuario: yup.number().required('Usuário é obrigatório'),
        empresa: yup.number().required('Empresa é obrigatória')
      });

      await schema.validate(req.body);

      if (req.body.empresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado a criar lançamento para outra empresa' });
      }

      // Verifica se o contribuinte existe
      const contribuinte = await Contribuinte.findOne({
        where: { 
          CPF: req.body.idCPF,
          idEmpresa: req.userEmpresa
        }
      });

      if (!contribuinte) {
        return res.status(404).json({ error: 'Contribuinte não encontrado' });
      }

      // Verifica se a taxa existe
      const taxa = await Taxa.findOne({
        where: {
          codigo: req.body.codigoTaxa,
          idEmpresa: req.userEmpresa,
          exercicio: req.body.exercicio
        }
      });

      if (!taxa) {
        return res.status(404).json({ error: 'Taxa não encontrada' });
      }

      const financeiro = await Financeiro.create({
        ...req.body,
        valorTotal: req.body.valor - (req.body.desconto || 0)
      });

      return res.status(201).json(financeiro);
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
        vencimento: yup.date(),
        descricao: yup.string(),
        valor: yup.number().positive('Valor deve ser positivo'),
        desconto: yup.number().min(0, 'Desconto não pode ser negativo'),
        valorTotal: yup.number().positive('Valor total deve ser positivo'),
        codigoBarra: yup.string(),
        linhaDigitavel: yup.string(),
        qrcode: yup.string(),
        linkPix: yup.string()
      });

      await schema.validate(req.body);

      const financeiro = await Financeiro.findByPk(req.params.id);

      if (!financeiro) {
        return res.status(404).json({ error: 'Lançamento não encontrado' });
      }

      if (financeiro.empresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      if (req.body.valor || req.body.desconto) {
        req.body.valorTotal = (req.body.valor || financeiro.valor) - (req.body.desconto || financeiro.desconto || 0);
      }

      await financeiro.update(req.body);

      return res.json(financeiro);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const financeiro = await Financeiro.findByPk(req.params.id);

      if (!financeiro) {
        return res.status(404).json({ error: 'Lançamento não encontrado' });
      }

      if (financeiro.empresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await financeiro.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new FinanceiroController(); 