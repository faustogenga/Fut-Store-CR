import axios from 'axios';

export const sendEmail = async ( userEmail, orderId) => {
  try {
    const response = await axios.post('http://localhost:3001/send-email', {
      userEmail: userEmail,
      orderId: orderId,
    } );
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
