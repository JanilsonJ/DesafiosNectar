import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DadosContato from './src/Components/DadosContato';
import ListaContatos from './src/Components/ListaContatos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='ListaContatos'
          component={ListaContatos}
          options={{title: 'Lista de Contatos'}}
        />
        <Stack.Screen
          name='DadosContato'
          component={DadosContato}
          options={{title: 'Dados Contato'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
