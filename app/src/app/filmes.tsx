import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { db } from '../firebase';
import { useEffect } from 'react';
import { router } from 'expo-router';

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';



export default function FilmesScreen() {
  const [titulo, setTitulo] = useState('');
  const [editando, setEditando] = useState(false);
  const [idEdicao, setIdEdicao] = useState('');
  const [filmes, setFilmes] = useState([
    { id: '1', titulo: 'Interestelar' },
    { id: '2', titulo: 'Batman' },
  ]);

    const adicionarFilme = async () => {
    if (!titulo) return;

    try {
      await addDoc(
        collection(db, 'filmes'),
        {
          titulo,
          criadoEm: new Date()
        }
      );

      alert('Filme salvo!');

      setTitulo('');
      await carregarFilmes();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const carregarFilmes = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, 'filmes')
    );

    const lista: any[] = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setFilmes(lista);
  } catch (error: any) {
    alert(error.message);
  }
  };
  
  const excluirFilme = async (id: string) => {
  try {
    await deleteDoc(
      doc(db, 'filmes', id)
    );

    await carregarFilmes();

    alert('Filme excluído!');
  } catch (error: any) {
    alert(error.message);
  }
  };

  const editarFilme = (filme: any) => {
  setTitulo(filme.titulo);
  setIdEdicao(filme.id);
  setEditando(true);
  };

  const atualizarFilme = async () => {
  try {
    await updateDoc(
      doc(db, 'filmes', idEdicao),
      {
        titulo
      }
    );

    alert('Filme atualizado!');

    setTitulo('');
    setEditando(false);
    setIdEdicao('');

    await carregarFilmes();
  } catch (error: any) {
    alert(error.message);
  }
  };

  useEffect(() => {
  carregarFilmes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Filmes
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do filme"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          editando
            ? atualizarFilme
            : adicionarFilme
        }
      >
        <Text style={styles.buttonText}>
          {editando ? 'Atualizar' : 'Adicionar'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>{item.titulo}</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editarFilme(item)}
          >
            <Text style={styles.buttonText}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => excluirFilme(item.id)}
          >
            <Text style={styles.buttonText}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      )}
      />
      <View style={styles.menu}>
      <TouchableOpacity style={styles.tabAtiva}>
        <Text>Filmes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => router.push('/perfil')}
      >
        <Text>Perfil</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
  backgroundColor: '#f44336',
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
  },
  editButton: {
  backgroundColor: '#FF9800',
  padding: 10,
  borderRadius: 8,
  marginTop: 10,
  },
  menu: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
  },

  tab: {
    padding: 15,
  },

  tabAtiva: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
});