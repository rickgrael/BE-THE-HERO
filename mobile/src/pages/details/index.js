import React from 'react';
import {Feather} from '@expo/vector-icons'
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Detail(){
    const route=useRoute();

    const incident=route.params.incident;

    const navigation=useNavigation();
    const message=`Olá, ${incident.nome} quero fazer uma doação de R$ ${incident.value} pra vc poder ajudar com o caso " ${incident.title}".`
    
    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Héroi do caso: ${incident.title}`,
            recipients:[`${incident.email}`],
            body:message,
        })
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e82041' />
                </TouchableOpacity>
            </View>
            
            <View style={styles.incident}>
                <View style={styles.headerPrimary}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.incidentPropertyLeft}>CASO:</Text>
                        <Text style={styles.incidentValueLeft}>{incident.title}</Text>
                    </View>

                    <View style={styles.headerRight}>
                        <Text style={styles.incidentPropertyRight}>ONG:</Text>
                        <Text style={styles.incidentValueRight}>{incident.nome}</Text>
                    </View>
                </View>
 
         

                <Text style={[styles.incidentProperty,{marginTop:35}]}>Descrição:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>


            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>                   
                    
                </View>
        </View>
    );
}