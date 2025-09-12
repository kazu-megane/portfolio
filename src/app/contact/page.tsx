import { Metadata } from 'next';
import { ContentContainer } from '@/components/common/ContentContainer';
import { CONTACT_DATA } from '@/constants';

export const metadata: Metadata = {
  title: 'Contact',
  openGraph: {
    title: 'Kazuya Hashimoto - Portfolio | Contact',
    url: 'https://kazuyaframe.work/contact',
  },
};

export default function Contact() {
  return (
    <ContentContainer>
      <div className="grid grow place-items-end">
        <section>
          <h2 className="font-serif text-4xl tracking-[.2em] text-stone-500">CONTACT</h2>
          <div className="flex flex-col gap-4">
            <p className="mt-2 flex flex-col gap-1 text-sm">
              <span>各種お問い合わせはこちらから</span>
              <span>Contact us here for any inquiries.</span>
            </p>
            <ul className="flex flex-col gap-2">
              {CONTACT_DATA.map((contact) => (
                <li key={contact.name} className="flex">
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 font-serif text-sm underline ease-in hover:opacity-50 md:text-base"
                  >
                    {contact.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
