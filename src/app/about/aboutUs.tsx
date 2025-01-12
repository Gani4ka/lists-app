import React from 'react';
import { Heading } from '@radix-ui/themes';

import Link from 'next/link';

import styles from './aboutUs.module.css';
const AboutUs = () => {
  return (
    <div className={styles.container}>
      <Heading as="h1">About Listify</Heading>
      <section className={styles.section}>
        <Heading as="h2">Our Mission</Heading>
        <p>
          At Listify, our mission is to make organization effortless. Whether
          you are managing personal tasks, professional projects, or shared
          group goals, Listify helps you create, sort, and prioritize with ease.
        </p>
      </section>
      <section className={styles.section}>
        <Heading as="h2">Our Story</Heading>
        <p>
          Founded by a team of 2 passionate developers, Listify started as a
          simple idea to streamline to-do lists.
        </p>
      </section>
      <section className={styles.section}>
        <Heading as="h2">Our Features</Heading>
        <ul>
          <li>
            Easy-to-use interface for creating categories and subcategories.
          </li>
          <li>Choose your colors and icons</li>
          <li>Earn points by completing your lists</li>
          <li>Use AI to generate your personal lists</li>
        </ul>
      </section>
      <div className={styles.link}>
        <p>Ready to get organized?</p>
        <Link href="/auth/signup">Sign Up Now!</Link>
      </div>
    </div>
  );
};

export default AboutUs;
