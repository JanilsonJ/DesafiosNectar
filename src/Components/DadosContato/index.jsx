import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

import useFetch from "../../Hooks/useFetch";

const DadosContato = ({navigation, route}) => {
    const isFocused = useIsFocused()

    const {data: contato, isFetching, requisitarAPI} = useFetch(`https://app.nectarcrm.com.br/crm/api/1/contatos/${route.params.id}`)

    useEffect(() => {
        requisitarAPI();
    }, [isFocused])

    const tratarNomeDoDado = (nome) => {
        nome = nome.split(/(?=[A-ZÀ-Ú])/).join(' ');
        return nome.charAt(0).toUpperCase() + nome.slice(1)
    }

    const campoDeInformação = (dado) => {
        return (
            <View key={dado} style={styles.campo_dados}>
                <Text style={styles.campo_dados_text}>{tratarNomeDoDado(dado)}: </Text>
                <Text style={styles.campo_dados_text_input}>{contato[dado]}</Text>
                <Pressable onPress={() => navigation.navigate('EditarDado', {nomeDado: dado, dado: contato[dado], idContato: route.params.id})}> 
                    <Icon name="pencil-square-o" size={15} color="#379f76" />
                </Pressable>
            </View>
        )
    }

    const dadosContato = () => {
        const campos = ['nome', 'site', 'linkedin', 'facebook', 'origem', 'segmento', 'diasSemInteracao' ]

        return campos.map( campo => campoDeInformação(campo))
        
        return Object.keys(contato).map(dado => {
            if (typeof contato[dado] === 'object')
                return

            return campoDeInformação(dado);
        })
    }

    return (
        <ScrollView style={styles.container_dados}>
            {isFetching ? <Text>Carregando Dados...</Text> : dadosContato()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container_dados: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FCFCFC',
    },
    campo_dados: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5c5c5c',
        borderBottomWidth: 5,
        marginBottom: 8,
        padding: 5,
    },
    campo_dados_text: {
        color: '#fe9f04',
        fontWeight: '700',
        fontSize: 12,
    },
    campo_dados_text_input: {
        fontWeight: '500',
        fontSize: 12,
        flex: 1,
        flexWrap: 'wrap',
    }
})

export default DadosContato;
