import { StyleSheet, View } from 'react-native';

import ListaContatos from './src/Components/ListaContatos';

export default function App() {
  return (
    <View style={styles.container}>
      <ListaContatos></ListaContatos>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
