const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const yup = require('yup');

class AuthController {
  async login(req, res) {
    try {
      const schema = yup.object().shape({
        login: yup.string().required('Login é obrigatório'),
        senha: yup.string().required('Senha é obrigatória')
      });

      await schema.validate(req.body);

      const { login, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { login } });

      if (!usuario) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { id: usuario.id, idEmpresa: usuario.idEmpresa },
        process.env.JWT_SECRET || 'sistaxas2024',
        { expiresIn: '1d' }
      );

      return res.json({
        usuario: {
          id: usuario.id,
          usuario: usuario.usuario,
          login: usuario.login,
          idEmpresa: usuario.idEmpresa
        },
        token
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController(); 