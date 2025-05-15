import React, { useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView,Platform, ScrollView, Image } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [corClassificacao, setCorClassificacao] = useState('#000');

 const calcularIMC = () => {
  const pesoNum = parseFloat(peso.replace(',', '.'));
  const alturaNum = parseFloat(altura.replace(',', '.'));

  if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
    Alert.alert('Erro', 'Insira valores válidos e positivos!');
    return;
  }

  const imc = pesoNum / (alturaNum * alturaNum);
  let classificacao = '';
  let cor = '#000';
  let emoji = '';

  if (imc < 18.5) {
    classificacao = 'Abaixo do peso';
    cor = '#3B82F6';
    emoji = '😟'; 
  } else if (imc <= 24.9) {
    classificacao = 'Peso normal';
    cor = '#22C55E'; 
    emoji = '😄';
  } else if (imc <= 29.9) {
    classificacao = 'Sobrepeso';
    cor = '#EAB308'; 
    emoji = '😐';
  } else if (imc <= 34.9) {
    classificacao = 'Obesidade grau I';
    cor = '#FB923C'; 
    emoji = '😕';
  } else if (imc <= 39.9) {
    classificacao = 'Obesidade grau II';
    cor = '#EF4444'; 
    emoji = '😟';
  } else {
    classificacao = 'Obesidade grau III';
    cor = '#B91C1C'; 
    emoji = '😢';
  }

  setResultado(imc.toFixed(2));
  setClassificacao(`${emoji} ${classificacao}`);
  setCorClassificacao(cor);
};


  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setClassificacao('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('./assets/fita.png')} style={styles.logo} />
        <Text style={styles.title}>Calculadora de IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <View style={styles.buttonContainer}>
          <Button title="Calcular IMC" onPress={calcularIMC} />
          <Button title="Limpar" onPress={limparCampos} color="#999" />
        </View>

        {resultado ? (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>IMC: {resultado}</Text>
            <Text style={[styles.result, { color: corClassificacao }]}>
           Classificação: {classificacao}
          </Text>

          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f0f0f0',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resultContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  result: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  logo: {
  width: 160,
  height: 160,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginBottom: 16,
},

});
