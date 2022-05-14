import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(currentEquation) {

    const splitNumbers = currentEquation.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const finalNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    if (splitNumbers.length != 3 || currentNumber.length < 1)
      return

    setLastNumber(currentEquation + " = ")

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((fistNumber + finalNumber).toString())
        return
      case '-':
        setCurrentNumber((fistNumber - finalNumber).toString())
        return
      case '*':
        setCurrentNumber((fistNumber * finalNumber).toString())
        return
      case '/':
        setCurrentNumber((fistNumber / finalNumber).toString())
        return
    }
  }

  function calculatePercent(currentEquation) {
    const splitNumbers = currentEquation.split(' ')
    if (splitNumbers.length != 2 || currentNumber.length < 1)
      return;

    const fistNumber = parseFloat(splitNumbers[0])
    const operator = splitNumbers[1]
    let result = 0.0;

    switch (operator) {
      case '+':
      case '-':
        result = fistNumber * parseFloat(currentNumber) / 100
        break
      case '*':
      case '/':
        result = parseFloat(currentNumber) / 100
        break
    }

    setCurrentNumber(result.toString())
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed) // Mostra no Console a tecla pressionada

    switch (buttonPressed) {
      case '+':
      case '-':
      case '*':
      case '/':
        if (currentNumber.length > 0) {
          setLastNumber(currentNumber + " " + buttonPressed)
          setCurrentNumber("")
        }
        return
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        calculator(lastNumber + " " + currentNumber)
        return
      case '%':
        calculatePercent(lastNumber)
        return
      case '+/-':
        if (currentNumber.length > 0) {
          setCurrentNumber((parseFloat(currentNumber) * -1).toString())
        }
        return
      case '.':
        if (currentNumber.includes('.'))
          return
        break
      case 0:
        if (currentNumber.charAt(0) == '0' && !currentNumber.includes('.'))
          return
        break
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) =>
          button === '=' ? // Mapeamento do botão =
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#3dd0e3' }]}>
              <Text style={[styles.textButton, { color: "white", fontSize: 30 }]}>{button}</Text>
            </TouchableOpacity>
            : // Mapeamento dos outros botões
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
              <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'black' : '#0093a6' }]}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },
  resultText: {
    color: "#282F38",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText: {
    color: "#7c7c7c",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    minHeight: 100,
    flex: 2,
  },
  textButton: {
    color: "#7c7c7c",
    fontSize: 20,
  }
});