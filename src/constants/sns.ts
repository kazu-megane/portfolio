import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

type Sns = {
  name: string;
  url: string;
  icon: IconType;
};

export const SNS_DATA: Sns[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/kazuya_frame', icon: FaInstagram },
  { name: 'X', url: 'https://x.com/kazuya_frame', icon: FaXTwitter },
];
