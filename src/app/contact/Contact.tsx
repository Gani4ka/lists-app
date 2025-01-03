'use client';
import React, { type MouseEvent, useState } from 'react';
import * as Label from '@radix-ui/react-label';
import { Button, Flex, Heading } from '@radix-ui/themes';

import { sendUserMessage } from '@app/api/user';

import styles from './contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState({ error: false, message: '' });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: MouseEvent | React.KeyboardEvent | React.FormEvent
  ) => {
    e.preventDefault();

    const name = formData.name;
    const message = formData.message;
    const email = formData.email;
    const response = await sendUserMessage(name, message, email);
    if (!response.error) {
      setFormData({ name: '', email: '', message: '' });
    }
    setMessage({ error: response.error, message: response.message });
  };

  return (
    <Flex className={styles.container}>
      <div className={styles.wrapper}>
        <Heading>Contact Us</Heading>
        <p
          className={
            message.error ? styles['error-text'] : styles['success-text']
          }
        >
          {message.message}
        </p>
        <p>
          We are here to assist you with any questions or feedback about
          Listify.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Label.Root className="LabelRoot">Name:</Label.Root>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Label.Root className="LabelRoot">Email:</Label.Root>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Label.Root>Message:</Label.Root>
          <textarea
            className={styles.textarea}
            rows={5}
            cols={10}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <Button type="submit" className={styles.button}>
            Send Message
          </Button>
        </form>
      </div>
    </Flex>
  );
};

export default Contact;
