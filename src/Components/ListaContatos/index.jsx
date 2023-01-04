import { useEffect, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

const ListaContatos = ({navigation}) => {
    const NECTAR_API_TOKEN = `api_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjMxODQzNTYsImV4cCI6MTY5NDcyMDIxNywidXNlckxvZ2luIjoiMUBuZWN0YXIuY29tIiwidXNlcklkIjoiMjY2IiwidXN1YXJpb01hc3RlcklkIjoiMjY1In0.VgTsTd2SRAXCazn0oyaAkgp4-YPSMcIBgbuw3WGwgAM`

    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetch('https://app.nectarcrm.com.br/crm/api/1/contatos?attribute=nome&attribute=id&' + NECTAR_API_TOKEN)
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((err) => {
            setData(null);
        })
        .finally(() => {
            setIsFetching(false);
        });
    }, [])

    const ordermAlfabetica = (arr) => {
        return arr.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
    }

    const listarContatos = () => {
        ordermAlfabetica(data);

        return data.map(contato => {
            return (
                <View key={contato.id} style={styles.contato}>
                    <Text style={styles.contato_nome}>{contato.nome}</Text>
                    <Pressable style={styles.editar_contato_button} onPress={() => navigation.navigate('EditarContato', {id: contato.id})}>
                        <Text style={styles.editar_contato_button_text}>Editar</Text>
                    </Pressable>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.contatos}>
                <Text style={styles.contatos_title}>Contatos</Text>
                {isFetching ? <Text>Carregando Lista...</Text> : listarContatos()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    contatos: {
        width: '90%',
    },
    contatos_title: {
        textAlign: 'center',
        color: '#fe9f04',
        fontWeight: '700',
        fontSize: 24,
        marginBottom: 15,
    },
    contato: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#999',
        borderEndWidth: 5,
        borderBottomWidth: 5,
        margin: 4,
    },
    contato_nome: {
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 10,
    },
    editar_contato_button: {
        backgroundColor: '#129237',
        marginLeft: 10,
        borderRadius: 5,
        padding: 8,
    },
    editar_contato_button_text: {
        color: '#FCFCFC',
        fontSize: 10,
        fontWeight: '600',
    },
});

export default ListaContatos;