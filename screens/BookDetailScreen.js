
import React from 'react';
import { View, Text, Button } from 'react-native';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;

  const handleDeleteBook = () => {
    // Realiza la llamada a la API para eliminar el libro
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          
          console.log('Libro eliminado con éxito');
          
          navigation.navigate('BookList');
        } else {
          console.error('Error al eliminar el libro:', response.status);
          
        }
      })
      .catch(error => {
        console.error('Error al eliminar el libro:', error);
        
      });
  };

  return (
    <View>
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
     
      <Button title="Eliminar Libro" onPress={handleDeleteBook} />
    </View>
  );
};

export default BookDetailScreen;