import { Text } from "react-native";

const EditarContato = ({navigation, route}) => {

    return (
        <>
            <Text>Editando o usuario de id: {route.params.id}</Text>
        </>
    )
}

export default EditarContato;