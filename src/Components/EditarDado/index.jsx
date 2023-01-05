import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import useFetch from "../../Hooks/useFetch";

const EditarDado = ({navigation, route}) => {
    const [dado, setDado] = useState(route.params.dado);
    const [alterandoDado, setAlterandoDado] = useState(false)

    const {data: contato, isFetching, requisitarAPI} = 
        useFetch(`https://app.nectarcrm.com.br/crm/api/1/contatos/${route.params.idContato}`, 'PUT', {[route.params.nomeDado]: dado})

    const tratarNomeDoDado = (nome) => {
        nome = nome.split(/(?=[A-ZÀ-Ú])/).join(' ');
        return nome.charAt(0).toUpperCase() + nome.slice(1)
    }

    const salvarAlteracao = async () => {
        setAlterandoDado(true);
        await requisitarAPI();
        navigation.goBack();
    }

    if (alterandoDado)
        return (
            <View style={styles.alterando_dado}>
                <Text style={styles.alterando_dado_texto}>Salvando...</Text>
            </View>
        )
    
    return (
        <View style={styles.container_editarDado}>
            <Text style={styles.nomeDado}>Editando {tratarNomeDoDado(route.params.nomeDado)}</Text>
            <TextInput style={styles.dado} multiline={true} onChangeText={e => setDado(e)}>{dado}</TextInput>
            <Pressable style={styles.botao_salvar} onPress={() => salvarAlteracao()}>
                <Text style={styles.botao_salvar_texto}>Salvar alteração</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container_editarDado: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fcfcfc',
    },
    nomeDado: {
        width: '70%',
        padding: 12,
        marginTop: 30,
        marginBottom: 20,
        
        backgroundColor: '#fe9f04',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',

        overflow: 'hidden', //Overflow necessário para o borderRadius
        borderRadius: 5,
    },
    dado : {
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingVertical: 7,

        backgroundColor: '#fcfcfc',
        
        fontSize: 16,
        fontWeight: '600',

        overflow: 'hidden', //Overflow necessário para o borderRadius
        borderRadius: 5,
        borderColor: '#fe9f04',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 4,
        borderRightWidth: 4,
    },
    botao_salvar: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 30,
        marginBottom: 20,

        backgroundColor: '#5dbb7c',
        overflow: 'hidden', //Overflow necessário para o borderRadius
        borderRadius: 15,
    },
    botao_salvar_texto: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    alterando_dado: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c2c2c'
    },
    alterando_dado_texto: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 2,
        color: '#fe9f04',
    },
})

export default EditarDado;