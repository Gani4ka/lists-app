import { BiHappy } from 'react-icons/bi';
import { BsPersonWorkspace } from 'react-icons/bs';
import {
  FaBook,
  FaBookReader,
  FaCat,
  FaHome,
  FaList,
  FaPhone,
  FaPlaneDeparture,
  FaRegCalendar,
  FaShoppingBasket,
} from 'react-icons/fa';
import { FaPeopleGroup, FaPersonDotsFromLine } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import { LuTrees } from 'react-icons/lu';
import {
  MdFamilyRestroom,
  MdFastfood,
  MdHealthAndSafety,
  MdOutlineSportsMartialArts,
} from 'react-icons/md';
import { TbPigMoney } from 'react-icons/tb';

import { CategoryIcon } from '../components/icon-picker/types';

export const CATEGORY_ICONS: CategoryIcon[] = [
  { id: 1, name: 'hobby', Icon: FaPersonDotsFromLine },
  { id: 2, name: 'goals', Icon: GoGoal },
  { id: 3, name: 'books', Icon: FaBook },
  { id: 4, name: 'lists', Icon: FaList },
  { id: 5, name: 'shopping', Icon: FaShoppingBasket },
  { id: 6, name: 'sport', Icon: MdOutlineSportsMartialArts },
  { id: 7, name: 'events', Icon: FaRegCalendar },
  { id: 8, name: 'food', Icon: MdFastfood },
  { id: 9, name: 'gardening', Icon: LuTrees },
  { id: 10, name: 'call', Icon: FaPhone },
  { id: 11, name: 'social', Icon: FaPeopleGroup },
  { id: 12, name: 'animals', Icon: FaCat },
  { id: 13, name: 'work', Icon: BsPersonWorkspace },
  { id: 14, name: 'home', Icon: FaHome },
  { id: 15, name: 'health', Icon: MdHealthAndSafety },
  { id: 16, name: 'family', Icon: MdFamilyRestroom },
  { id: 17, name: 'finance', Icon: TbPigMoney },
  { id: 18, name: 'education', Icon: FaBookReader },
  { id: 19, name: 'travel', Icon: FaPlaneDeparture },
  { id: 20, name: 'custom', Icon: BiHappy },
];
