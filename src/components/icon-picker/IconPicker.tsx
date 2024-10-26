'use client';
import React from 'react';
import { Flex, Grid, Text } from '@radix-ui/themes';

import { CategoryIconItem } from '@app/app/categories/types';
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
      <Text align={'center'} style={{ marginTop: '20px' }}>
        Choose category icon
      </Text>
      <Grid columns={'5'} rows={'4'} className={styles.grid}>
        {categoryIcons.map((iconItem: CategoryIconItem) => {
          const { name, Icon: IconComponent } = iconItem;
          return (
            <Flex
              display={'flex'}
              direction={'column'}
              align={'center'}
              key={iconItem.id}
            >
              <Flex
                key={name}
                onClick={() => onSelectIcon(iconItem)}
                className={styles.icon}
                style={{
                  backgroundColor:
                    selectedIcon.name === name ? '#2AA383' : 'transparent',
                  margin: 0,
                  marginTop: '10px',
                }}
              >
                <IconComponent size={30} />
              </Flex>
              <Text
                align={'center'}
                style={{
                  marginBottom: '10px',
                }}
              >
                {name}
              </Text>
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default IconPicker;
