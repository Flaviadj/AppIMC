import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira valores válidos de peso e altura!');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = imc.toFixed(1);
    let classificacaoIMC = '';

    if (imc < 18.5) classificacaoIMC = 'Abaixo do peso';
    else if (imc < 25) classificacaoIMC = 'Peso normal';
    else if (imc < 30) classificacaoIMC = 'Sobrepeso';
    else if (imc < 35) classificacaoIMC = 'Obesidade grau I';
    else if (imc < 40) classificacaoIMC = 'Obesidade grau II';
    else classificacaoIMC = 'Obesidade grau III';

    setResultado(`IMC: ${imcFormatado}`);
    setClassificacao(classificacaoIMC);
    Keyboard.dismiss();
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setClassificacao('');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/ImagIMC.png')} style={styles.imagem} resizeMode="contain" />
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
      </View>

      <TouchableOpacity onPress={limparCampos}>
        <Text style={styles.clearButton}>Limpar Campos</Text>
      </TouchableOpacity>

      {resultado !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.result}>{resultado}</Text>
          <Text style={styles.classificacao}>{classificacao}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },

  imagem: {
    width: '100%',
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  clearButton: {
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  classificacao: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },
});


