import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
