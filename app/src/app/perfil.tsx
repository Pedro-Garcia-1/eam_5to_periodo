import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { router } from 'expo-router';

export default function PerfilScreen() {
  const usuario = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View style={styles.card}>
        <Text style={styles.value}>
          Usuário do Sistema
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.value}>
          {usuario?.email}
        </Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/filmes')}
        >
          <Text>Filmes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabAtiva}
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
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
  },

  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 30,
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