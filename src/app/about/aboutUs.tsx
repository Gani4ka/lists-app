import React from 'react';

import Link from 'next/link';

import styles from './aboutUs.module.css';
const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h1>About Listify</h1>
      <section className={styles.section}>
        <h2>Our Mission</h2>
        <p>
          At Listify, our mission is to make organization effortless. Whether
          you are managing personal tasks, professional projects, or shared
          group goals, Listify helps you create, sort, and prioritize with ease.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Story</h2>
        <p>
          Founded by a team of 2 passionate developers, Listify started as a
          simple idea to streamline to-do lists.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Features</h2>
        <ul>
          <li>
            Easy-to-use interface for creating categories and subcategories.
          </li>
          <li>Choose your colors and icons</li>
          <li>Earn points by completing your lists</li>
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
