import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Contatos from "../Contatos";
import Tarefas from "../Tarefas";

const Tab = createBottomTabNavigator()

const TelaInicial = () => {

    const screenOptions = (route, color) => {
        let iconName;
      
        switch (route.name) {
            case 'Contatos': iconName = 'contacts'; break;
            case 'Tarefas': iconName = 'add-task'; break;
            default: break;
        }
      
        return <Icon name={iconName} color={color} size={24} />;
      };

    return (
        <Tab.Navigator screenOptions={({route}) => ({tabBarIcon: ({color}) => screenOptions(route, color), tabBarActiveTintColor: '#fe9f04', tabBarInactiveTintColor: 'gray',})}>
            <Tab.Screen name='Contatos' component={Contatos} options={{title: 'Contatos'}}/>
            <Tab.Screen name='Tarefas' component={Tarefas} options={{title: 'Tarefas'}}/>
        </Tab.Navigator>
    )
}

export default TelaInicial;