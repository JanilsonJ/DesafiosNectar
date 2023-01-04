import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditarContato from './src/Components/EditarContato';
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
          name='EditarContato'
          component={EditarContato}
          options={{title: 'Editar Contato'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
