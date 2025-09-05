import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('coverImage', file); // must match backend field name

  try {
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data.imageUrl; // Cloudinary URL
  } catch (error) {
    console.error('Image upload failed:', error.response?.data || error.message);
    throw error;
  }
};
