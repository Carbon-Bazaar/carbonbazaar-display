'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const supporters = [
    {
        name: 'Government of Goa',
        logo: '/supporters/Goa Government.png',
        description: 'State government support for innovation and sustainability',
    },
    {
        name: 'FIIRE Goa',
        logo: '/supporters/Fire-logo.webp',
        description: 'Foundation for Innovation, Incubation, Research & Entrepreneurship',
    },
    {
        name: 'MeitY',
        logo: '/supporters/meity.png',
        description: 'Ministry of Electronics & Information Technology, India',
    },
    {
        name: 'SPC Goa',
        logo: null,
        description: 'Startup Promotion Cell, Government of Goa',
    },
];

export default function BackedBy() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el) => {
                            el.classList.add('revealed');
                        });
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="backed-by"
            ref={sectionRef}
            className="section-padding"
            style={{ background: 'var(--warm-white)' }}
        >
            <div className="section-container">
                <div className="reveal text-center mb-14">
                    <p
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: 'var(--sage)' }}
                    >
                        Trusted Partners
                    </p>
                    <h2 className="section-title">Supported By</h2>
                    <p className="section-subtitle">
                        Backed by government bodies and innovation institutions committed to
                        building India's climate-tech ecosystem.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {supporters.map((supporter, index) => (
                        <div
                            key={index}
                            className={`reveal reveal-delay-${index + 1} supporter-card`}
                        >
                            <div className="w-full h-20 flex items-center justify-center mb-4">
                                {supporter.logo ? (
                                    <Image
                                        src={supporter.logo}
                                        alt={supporter.name}
                                        width={120}
                                        height={60}
                                        className="object-contain max-h-16 w-auto"
                                        style={{ filter: 'none' }}
                                    />
                                ) : (
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(149, 213, 178, 0.3), rgba(82, 121, 111, 0.15))',
                                            color: 'var(--forest)',
                                        }}
                                    >
                                        SPC
                                    </div>
                                )}
                            </div>
                            <h4
                                className="text-sm font-semibold mb-1.5"
                                style={{ color: 'var(--forest)' }}
                            >
                                {supporter.name}
                            </h4>
                            <p
                                className="text-xs leading-relaxed"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {supporter.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
