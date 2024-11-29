const API_BASE_URL = 'http://localhost:5000/api';

// Função auxiliar para obter o token e verificar autenticação
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Usuário não está autenticado');
    }
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Função auxiliar para obter dados do usuário
const getUserData = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        throw new Error('Dados do usuário não encontrados');
    }
    const user = JSON.parse(userStr);
    if (!user.id || !user.idEmpresa) {
        throw new Error('Dados do usuário incompletos');
    }
    return user;
};

// Função auxiliar para tratar respostas
async function handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const responseData = contentType && contentType.includes('application/json') 
        ? await response.json()
        : await response.text();

    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    console.log('Response Data:', responseData);

    if (!response.ok) {
        const error = new Error(
            typeof responseData === 'object' 
                ? responseData.error || 'Erro na requisição'
                : responseData
        );
        error.status = response.status;
        error.data = responseData;
        throw error;
    }
    return responseData;
}

const api = {
    // Auth
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await handleResponse(response);
        if (data.token && data.usuario) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.usuario));
        }
        return data;
    },

    // Contribuintes
    getContribuintes: async () => {
        const response = await fetch(`${API_BASE_URL}/contribuintes`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createContribuinte: async (data) => {
        try {
            const user = getUserData();
            console.log('User data:', user);

            const contribuinteData = {
                ...data,
                idEmpresa: user.idEmpresa
            };

            console.log('Sending contribuinte data:', contribuinteData);
            console.log('Headers:', getAuthHeader());

            const response = await fetch(`${API_BASE_URL}/contribuintes`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: JSON.stringify(contribuinteData)
            });

            return handleResponse(response);
        } catch (error) {
            console.error('Error in createContribuinte:', error);
            throw error;
        }
    },

    updateContribuinte: async (id, data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/contribuintes/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                idEmpresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    deleteContribuinte: async (id) => {
        const response = await fetch(`${API_BASE_URL}/contribuintes/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    // Empresas
    getEmpresas: async () => {
        const response = await fetch(`${API_BASE_URL}/empresas`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createEmpresa: async (data) => {
        const response = await fetch(`${API_BASE_URL}/empresas`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    updateEmpresa: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    deleteEmpresa: async (id) => {
        const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    // Usuários
    getUsuarios: async () => {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createUsuario: async (data) => {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    updateUsuario: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    deleteUsuario: async (id) => {
        const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    // Taxas
    getTaxas: async () => {
        const response = await fetch(`${API_BASE_URL}/taxas`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createTaxa: async (data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/taxas`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                idEmpresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    updateTaxa: async (id, data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/taxas/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                idEmpresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    deleteTaxa: async (id) => {
        const response = await fetch(`${API_BASE_URL}/taxas/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    // Usuário-Taxa
    getUsuarioTaxas: async () => {
        const response = await fetch(`${API_BASE_URL}/usuario-taxas`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createUsuarioTaxa: async (data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/usuario-taxas`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                idEmpresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    deleteUsuarioTaxa: async (id) => {
        const response = await fetch(`${API_BASE_URL}/usuario-taxas/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    // Financeiro
    getFinanceiro: async () => {
        const response = await fetch(`${API_BASE_URL}/financeiro`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    createFinanceiro: async (data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/financeiro`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                usuario: user.id,
                empresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    updateFinanceiro: async (id, data) => {
        const user = getUserData();
        const response = await fetch(`${API_BASE_URL}/financeiro/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({
                ...data,
                usuario: user.id,
                empresa: user.idEmpresa
            })
        });
        return handleResponse(response);
    },

    deleteFinanceiro: async (id) => {
        const response = await fetch(`${API_BASE_URL}/financeiro/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    }
}; 