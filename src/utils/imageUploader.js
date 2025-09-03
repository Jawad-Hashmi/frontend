import axios from "axios";
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};