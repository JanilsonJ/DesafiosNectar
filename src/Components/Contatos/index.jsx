import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import useFetch from "../../Hooks/useFetch";

const Contatos = ({navigation}) => {
    const {data, isFetching, requisitarAPI} = useFetch('https://app.nectarcrm.com.br/crm/api/1/contatos?attribute=nome&attribute=id')

    const ordermAlfabetica = (arr) => {
        return arr.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
    }

    useEffect(() => {
        requisitarAPI();
    }, [])
    
    const listarContatos = () => {
        ordermAlfabetica(data);

        return data.map(contato => {
            return (
                <View key={contato.id} style={styles.contato}>
                    <Text style={styles.contato_nome}>{contato.nome}</Text>
                    <Pressable style={styles.visualizar_contato} onPress={() => navigation.navigate('DadosContato', {id: contato.id})}>
                        <Icon name="account-eye" size={20} color="#fcfcfc" />
                    </Pressable>
                </View>
            )
        })
    }

    return (
        <ScrollView style={styles.container}>
            {isFetching ? <Text>Carregando Lista...</Text> : listarContatos()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fcfcfc',
    },
    contato: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#999',
        borderEndWidth: 5,
        borderBottomWidth: 5,
        margin: 5,
    },
    contato_nome: {
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 10,
    },
    visualizar_contato: {
        backgroundColor: '#fe9f04',
        marginLeft: 10,
        borderRadius: 5,
        padding: 8,
    },
    visualizar_contato_text: {
        color: '#FCFCFC',
        fontSize: 10,
        fontWeight: '600',
    },
});

export default Contatos;