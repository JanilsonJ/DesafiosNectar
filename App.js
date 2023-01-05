import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DadosContato from './src/Components/DadosContato';
import Contatos from './src/Components/Contatos';
import EditarDado from './src/Components/EditarDado';
import TelaInicial from './src/Components/TelaInicial';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name='TelaInicial'
          component={TelaInicial}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Contatos'
          component={Contatos}
          options={{title: 'Contatos'}}
        />
        <Stack.Screen
          name='DadosContato'
          component={DadosContato}
          options={{title: 'Dados Contato'}}
        />
        <Stack.Screen
          name='EditarDado'
          component={EditarDado}
          options={{title: 'Editando Contato'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
