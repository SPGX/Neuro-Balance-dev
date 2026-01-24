import FadeInSection from './FadeInSection';

export default function ContactSection() {
  const socials = [
    { name: 'สป.อว. Fanpage', icon: 'icons/fb.svg', href: 'https://www.facebook.com/neurobalanceasia' },
    { name: 'สป.อว.', icon: 'icons/x.svg', href: '#' },
    { name: 'สป.อว.', icon: 'icons/ig.svg', href: 'https://www.instagram.com/neurobalance' },
    { name: 'สป.อว. Channel', icon: 'icons/yt.svg', href: 'https://www.youtube.com/@neurobalance4293' },
    { name: '@สป.อว.', icon: 'icons/tt.svg', href: '#' },
  ];

  return (
    <section className="py-0 bg-transparent z-10 relative w-full mx-auto">
      <div>
        <FadeInSection>
          <div className="
            bg-white
            shadow-[0_2px_16px_rgba(35,53,92,0.06)]
            w-full
            flex justify-between items-center
            py-4 px-2 sm:px-6 lg:px-12 m-0
          ">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex flex-row items-center justify-center
                  flex-1 min-w-0 group hover:scale-105 transition-transform duration-200
              ">
                {/* ICON responsive size */}
                <img
                  src={s.icon}
                  alt={s.name}
                  className="
                    w-8 h-8
                    sm:w-7 sm:h-7
                    md:w-8 md:h-8
                    lg:w-10 lg:h-10
                  "
                />
                {/* TEXT responsive show/hide/size */}
                <span
                  className="
                    hidden
                    sm:inline
                    text-xs
                    md:text-sm
                    lg:text-lg
                    font-semibold text-gray-900
                    whitespace-nowrap truncate
                    ml-0 sm:ml-2
                  "
                >
                  Neuro Balance
                </span>
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
