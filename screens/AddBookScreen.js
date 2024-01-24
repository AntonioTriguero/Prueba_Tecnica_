
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const AddBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {
   
    const newBook = {
      title: title,
      author: author,
      
    };

    // Realiza la llamada a la API para agregar el nuevo libro
    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        
        console.log('Libro agregado:', data);

       
        navigation.navigate('BookList');
      })
      .catch(error => {
        console.error('Error al agregar el libro:', error);
      
      });
  };

  return (
    <View>
      <Text>Agregar Nuevo Libro</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Autor"
        value={author}
        onChangeText={(text) => setAuthor(text)}
      />
     
      <Button title="Agregar Libro" onPress={handleAddBook} />
    </View>
  );
};

export default AddBookScreen;