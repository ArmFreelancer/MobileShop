import type { Phone } from '../types';

export interface ColorOption {
  name: string;
  value: string;
}

export interface StorageOption {
  size: string;
  priceBump: number;
}

export function getPhoneColors(phone: Phone): ColorOption[] {
  if (phone.brand === 'apple') {
    if (phone.name.includes('Pro')) {
      return [
        { name: 'Natural Titanium', value: '#bebeb3' },
        { name: 'Desert Titanium', value: '#c7b4a2' },
        { name: 'White Titanium', value: '#f2f1ed' },
        { name: 'Black Titanium', value: '#3c3d3a' },
      ];
    }
    return [
      { name: 'Ultramarine', value: '#3b5998' },
      { name: 'Teal', value: '#008080' },
      { name: 'Pink', value: '#ffc0cb' },
      { name: 'White', value: '#ffffff' },
      { name: 'Black', value: '#1c1c1e' },
    ];
  }
  
  if (phone.brand === 'samsung') {
    if (phone.name.includes('Ultra')) {
      return [
        { name: 'Titanium Gray', value: '#7d7f82' },
        { name: 'Titanium Black', value: '#232426' },
        { name: 'Titanium Violet', value: '#473f4e' },
        { name: 'Titanium Yellow', value: '#eae3cb' },
      ];
    }
    return [
      { name: 'Onyx Black', value: '#292a2c' },
      { name: 'Marble Gray', value: '#b6b8ba' },
      { name: 'Cobalt Violet', value: '#3f304f' },
      { name: 'Amber Yellow', value: '#ebdca5' },
    ];
  }

  if (phone.brand === 'google') {
    return [
      { name: 'Obsidian', value: '#2e3033' },
      { name: 'Porcelain', value: '#f4ebd9' },
      { name: 'Hazel', value: '#8a8d82' },
      { name: 'Rose Quartz', value: '#f3d3cf' },
    ];
  }

  return [
    { name: 'Midnight Black', value: '#121212' },
    { name: 'Platinum Silver', value: '#e5e5e5' },
    { name: 'Aurora Blue', value: '#1a365d' },
  ];
}

export function getPhoneStorages(phone: Phone): StorageOption[] {
  const base = phone.storage;
  
  if (base === '512GB') {
    return [
      { size: '512GB', priceBump: 0 },
      { size: '1TB', priceBump: 100000 },
    ];
  }
  
  if (base === '256GB') {
    return [
      { size: '256GB', priceBump: 0 },
      { size: '512GB', priceBump: 50000 },
      { size: '1TB', priceBump: 130000 },
    ];
  }
  
  return [
    { size: '128GB', priceBump: 0 },
    { size: '256GB', priceBump: 40000 },
    { size: '512GB', priceBump: 90000 },
  ];
}
