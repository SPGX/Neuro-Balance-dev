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
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-items-center items-center">
            {socials.map((s, index) => (
              <a
                key={index}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:scale-110 transition transform"
              >
                <img src={s.icon} alt={s.name} className="w-12 h-12 mb-1" />
                <span className="text-sm font-semibold text-gray-800 text-center">{s.name}</span>
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
