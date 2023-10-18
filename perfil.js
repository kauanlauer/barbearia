// Importe as funções necessárias do SDK Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBW6ju3UGGI4jLgCHU_817rxGmKX_inOJs",
    authDomain: "barbearia-8a020.firebaseapp.com",
    databaseURL: "https://barbearia-8a020-defaulst-rtdb.firebaseio.com",
    projectId: "barbearia-8a020",
    storageBucket: "barbearia-8a020.appspot.com",
    messagingSenderId: "907528196968",
    appId: "1:907528196968:web:13817d72f1db43c71bfcdd"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha uma referência para o banco de dados
const db = getDatabase(app);

// Função para carregar informações do perfil
async function loadUserProfile() {
  const auth = getAuth();
  try {
    // Faça o login do usuário (substitua com o método correto, se necessário)
    const userCredential = await signInWithEmailAndPassword(auth, 'user@example.com', 'password');
    const user = userCredential.user;

    // Use o email do usuário para buscar informações no banco de dados
    const email = user.email;
    const userRef = ref(db, 'users/' + email);

    // Obtenha os dados do usuário do banco de dados
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    // Exiba as informações do perfil na página
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
      <p>Nome: ${userData.name}</p>
      <p>Email: ${userData.email}</p>
      <p>ID do Usuário: ${userData.uid}</p>
    `;
  } catch (error) {
    // Lidar com erros, como usuário não autenticado, etc.
    console.error('Erro:', error);
  }
}

// Carregue as informações do perfil quando a página for carregada
window.onload = loadUserProfile;
