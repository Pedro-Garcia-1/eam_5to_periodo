import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sistema de Filmes
      </Text>

      <Text style={styles.subtitle}>
        Trabalho de Engenharia de Aplicações Móveis
      </Text>

      <Text>
        Firebase + CRUD + Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});