import { FaInstagram, FaXTwitter, FaGithub, FaRegNoteSticky } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

type Sns = {
  name: string;
  url: string;
  icon: IconType;
};

export const SNS_DATA: Sns[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/kazuya_frame', icon: FaInstagram },
  { name: 'X', url: 'https://x.com/kazuya_frame', icon: FaXTwitter },
  { name: 'GitHub', url: 'https://github.com/kazuya-frame', icon: FaGithub },
  { name: 'note', url: 'https://note.com/kazuya_frame', icon: FaRegNoteSticky },
];

export const CONTACT_DATA = SNS_DATA.filter((sns) => sns.name !== 'GitHub' && sns.name !== 'note');
