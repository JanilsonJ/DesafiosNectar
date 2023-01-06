import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import useFetch from "../../Hooks/useFetch";

const Tarefas = () => {
    const isFocused = useIsFocused()

    const [status, setStatus] = useState('0')
    const [abertoIsPressed, setAbertoIsPressed] = useState(false)
    const [concluidoIsPressed, setConcluidoIsPressed] = useState(false)
    const [canceladoIsPressed, setCanceladaIsPressed] = useState(false)

    const {data, isFetching, requisitarAPI} = useFetch(`https://app.nectarcrm.com.br/crm/api/1/tarefa?attribute=titulo&attribute=status&attribute=tarefaTipo&status=${status}`)

    useEffect(() => {
        requisitarAPI();
    }, [status, isFocused])

    const tarefas = () => {
        return data.map(tarefa => {
            return (
                <View style={[styles.tarefa, styles[`tarefa${tarefa.status}`]]}>
                    <Text style={styles.tarefa_titulo}>{tarefa.titulo}</Text>
                    <Text>Tipo: {tarefa.tarefaTipo.nome}</Text>
                </View>
            ) 
        })
    }

    const aplicarFiltro = (e, novoStatus) => {
        if(isFetching)
            return
            
        setAbertoIsPressed(false);
        setConcluidoIsPressed(false);
        setCanceladaIsPressed(false);

        if (novoStatus === status){
            setStatus('');
        }
        else{
            switch (novoStatus) {
                case '0': setAbertoIsPressed(true); break;
                case '1': setConcluidoIsPressed(true); break;
                case '2': setCanceladaIsPressed(true); break;
                default: break;
            }
            setStatus(novoStatus);
        }
    }

    return (
        <View style={styles.container_tarefas}>
            <View style={styles.filtros}>
                <Text>Filtar por: </Text>
                <TouchableOpacity style={[styles.status_button, abertoIsPressed ? styles.status_button_active : null]} onPress={(e) => aplicarFiltro(e, '0')}>
                    <Text style={styles.status_button_text}>Abertas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.status_button, concluidoIsPressed ? styles.status_button_active : null]} onPress={(e) => aplicarFiltro(e, '1')}>
                    <Text style={styles.status_button_text}>Concluídas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.status_button, canceladoIsPressed ? styles.status_button_active : null]} onPress={(e) => aplicarFiltro(e, '2')}>
                    <Text style={styles.status_button_text}>Canceladas</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.lista_tarefas}>
                {isFetching ? <Text>Carregando...</Text> : tarefas()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({  
    container_tarefas: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#FFF',
    },
    filtros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 5,
    },
    status_button: {
        padding: 5,
        borderRadius: 5,
        borderBottomWidth: 3,
    },
    status_button_active: {
        backgroundColor: '#fe9f04',
    },
    status_button_text: {
        fontWeight: '500',
    },
    tarefa: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        margin: 4,
        padding: 5,

        borderWidth: 1,
        borderBottomWidth: 3,
        borderRadius: 2,
    },
    tarefa0: {
        backgroundColor: '#fcfcfc',
    },
    tarefa1: {
        backgroundColor: '#e6f4ea',
    },
    tarefa2: {
        backgroundColor: '#ff7575',
    },
    tarefa_titulo: {
        fontWeight: '700',
        fontSize: 18,
    },
})

export default Tarefas;