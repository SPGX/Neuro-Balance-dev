import FadeInSection from './FadeInSection';

export default function ContactSection() {
  const socials = [
    {
      name: 'สป.อว. Fanpage',
      icon: '/fb.png',
      href: '#',
    },
    {
      name: 'สป.อว.',
      icon: '/x.png',
      href: '#',
    },
    {
      name: 'สป.อว.',
      icon: '/ig.png',
      href: '#',
    },
    {
      name: 'สป.อว. Channel',
      icon: '/yt.png',
      href: '#',
    },
    {
      name: '@สป.อว.',
      icon: '/tt.png',
      href: '#',
    },
  ];

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        <FadeInSection>
          <div className="grid grid-cols-5 gap-4 justify-items-center items-center">
            {socials.map((s, index) => (
              <a
                key={index}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
              >
                <img src={s.icon} alt={s.name} className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold text-gray-800 text-center">{s.name}</span>
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}