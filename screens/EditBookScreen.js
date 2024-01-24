// Archivo: EditBookScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EditBookScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleEditBook = () => {
    // Implementa la lógica para editar el libro existente
    const updatedBook = {
      ...book,
      title: title,
      author: author,
      // Otros campos según tus necesidades
    };

    // Realiza la llamada a la API para actualizar el libro
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
      .then(response => response.json())
      .then(data => {})
  }}