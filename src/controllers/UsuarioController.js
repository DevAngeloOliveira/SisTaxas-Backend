const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const yup = require('yup');

class UsuarioController {
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        where: { idEmpresa: req.userEmpresa },
        attributes: { exclude: ['senha'] }
      });
      return res.json(usuarios);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async store(req, res) {
    try {
      const schema = yup.object().shape({
        usuario: yup.string().required('Nome do usuário é obrigatório'),
        CPF: yup.string().required('CPF é obrigatório'),
        login: yup.string().required('Login é obrigatório'),
        senha: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres'),
        idEmpresa: yup.number().required('Empresa é obrigatória')
      });

      await schema.validate(req.body);

      const usuarioExists = await Usuario.findOne({
        where: { 
          CPF: req.body.CPF
        }
      });

      if (usuarioExists) {
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      }

      const { senha, ...data } = req.body;
      
      const usuario = await Usuario.create({
        ...data,
        senha: await bcrypt.hash(senha, 8)
      });

      return res.status(201).json({
        id: usuario.id,
        usuario: usuario.usuario,
        CPF: usuario.CPF,
        login: usuario.login,
        idEmpresa: usuario.idEmpresa
      });
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
        usuario: yup.string(),
        CPF: yup.string(),
        login: yup.string(),
        senha: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
        idEmpresa: yup.number()
      });

      await schema.validate(req.body);

      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (usuario.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      const { senha, ...data } = req.body;
      
      await usuario.update({
        ...data,
        ...(senha ? { senha: await bcrypt.hash(senha, 8) } : {})
      });

      return res.json({
        id: usuario.id,
        usuario: usuario.usuario,
        CPF: usuario.CPF,
        login: usuario.login,
        idEmpresa: usuario.idEmpresa
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      if (usuario.idEmpresa !== req.userEmpresa) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await usuario.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new UsuarioController(); 