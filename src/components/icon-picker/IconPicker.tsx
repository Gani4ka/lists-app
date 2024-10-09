'use client';
import React from 'react';
import { Flex, Grid, Text } from '@radix-ui/themes';

import { categoryIcons } from '@app/app/constants';

import styles from './classes.module.css';
import { IconPickerType } from './types';

const IconPicker = ({ selectedIcon, onSelectIcon }: IconPickerType) => {
  return (
    <Flex
      direction={'column'}
      gap={'20px'}
      width={'320px'}
      align={'center'}
      className={styles.container}
    >
      <Text align={'center'}>Choose category icon</Text>
      <Grid columns={'4'} rows={'5'} className={styles.grid}>
        {categoryIcons.map(({ name, Icon: IconComponent }) => (
          <Flex
            key={name}
            onClick={() => onSelectIcon(name)}
            className={styles.icon}
            style={{
              backgroundColor:
                selectedIcon === name ? '#bed7dc' : 'transparent',
            }}
          >
            <IconComponent size={24} />
          </Flex>
        ))}
      </Grid>
      <Text align={'center'} style={{ marginTop: '2rem' }}>
        - {selectedIcon ?? ''} -
      </Text>
    </Flex>
  );
};

export default IconPicker;
