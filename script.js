// Inicialize o Firebase com as configurações do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyBW6ju3UGGI4jLgCHU_817rxGmKX_inOJs",
    authDomain: "barbearia-8a020.firebaseapp.com",
    databaseURL: "https://barbearia-8a020-default-rtdb.firebaseio.com",
    projectId: "barbearia-8a020",
    storageBucket: "barbearia-8a020.appspot.com",
    messagingSenderId: "907528196968",
    appId: "1:907528196968:web:13817d72f1db43c71bfcdd"
};

firebase.initializeApp(firebaseConfig);

// Função para mostrar o formulário de registro
function showRegistrationForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'block';
}

// Função para mostrar o formulário de login
function showLoginForm() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Função para exibir mensagens de feedback
function showMessage(message, success) {
    const feedbackDiv = document.getElementById('feedback');
    const messageDiv = document.getElementById('message');

    messageDiv.textContent = message;
    feedbackDiv.style.display = 'block';
    
    if (success) {
        feedbackDiv.style.backgroundColor = '#4CAF50'; // Cor de fundo verde para mensagens de sucesso
    } else {
        feedbackDiv.style.backgroundColor = '#f44336'; // Cor de fundo vermelho para mensagens de erro
    }
}

function register() {
    const email = document.getElementById('registrationEmail').value;
    const password = document.getElementById('registrationPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            const user = userCredential.user;
            showMessage('Registro bem-sucedido. Você pode fazer login agora.', true);
            showLoginForm();
        })
        .catch((error) => {
            // Lidar com erros de registro
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro de registro: ' + errorCode + ' - ' + errorMessage, false);
        });
}

// Função para fazer login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberLogin = document.getElementById('rememberLogin').checked;

    firebase.auth().setPersistence(rememberLogin ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            // Login bem-sucedido
            const user = userCredential.user;
            showMessage('Login bem-sucedido. Bem-vindo, ' + user.email + '!', true);
        })
        .catch((error) => {
            // Lidar com erros de login
            const errorCode = error.code;
            const errorMessage = errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found' ? 'Usuário ou senha errados' : error.message;
            showMessage('Erro de login: ' + errorMessage, false);
        });
}
// Função para redefinir a senha
function resetPassword() {
    const email = document.getElementById('resetPasswordEmail').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            // E-mail de redefinição de senha enviado com sucesso
            showMessage('E-mail de redefinição de senha enviado. Verifique sua caixa de entrada.', true);
            // Você pode redirecionar o usuário para uma página de confirmação aqui
        })
        .catch((error) => {
            // Lidar com erros de redefinição de senha
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage('Erro ao enviar o e-mail de redefinição de senha: ' + errorCode + ' - ' + errorMessage, false);
        });
}

// Função para mostrar o formulário de redefinição de senha
function showResetPasswordForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('resetPasswordForm').style.display = 'block';
}

// Função para voltar ao formulário de login
function backToLoginForm() {
    document.getElementById('resetPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
