// src/components/ContactForm.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ContactForm.css'; // Import the CSS file for styling

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    try {
      // Send email via EmailJS
      await emailjs.send(
        'service_t2pnygp',     // your service ID
        'template_nnhypme',    // your template ID
        form,
        'kh6TGpnNI10aNLExi'    // your public key
      );

      // Save to Firebase Firestore
      await addDoc(collection(db, 'contacts'), {
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: serverTimestamp()
      });

      setStatus('Form submitted! Check your email for confirmation ✉️');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactForm;
