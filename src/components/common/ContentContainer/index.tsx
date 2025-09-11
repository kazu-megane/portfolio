import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ContentContainer = ({ children }: Props) => {
  return <div className="mx-4 mt-10 flex grow flex-col pb-40 md:mx-6 md:mt-20">{children}</div>;
};
