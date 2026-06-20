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

import {
  collection,
  addDoc
} from 'firebase/firestore';

export default function FilmesScreen() {
  const [titulo, setTitulo] = useState('');
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
    } catch (error: any) {
      alert(error.message);
    }
  };

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
        onPress={adicionarFilme}
      >
        <Text style={styles.buttonText}>
          Adicionar
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.titulo}</Text>
          </View>
        )}
      />
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
});