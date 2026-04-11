'use client';

import { useEffect, useRef } from 'react';
import {
    ClipboardList,
    ShieldCheck,
    Link2,
    Store,
    FileCheck,
} from 'lucide-react';

const steps = [
    {
        icon: ClipboardList,
        title: 'Register Your Project',
        description:
            'Communities and landowners submit ecosystem details through our guided onboarding portal.',
    },
    {
        icon: ShieldCheck,
        title: 'Get Verified',
        description:
            'Accredited third-party auditors validate carbon sequestration claims and environmental impact.',
    },
    {
        icon: Link2,
        title: 'Tokenize Credits',
        description:
            'Verified credits are tokenized on blockchain, ensuring traceability and preventing double counting.',
    },
    {
        icon: Store,
        title: 'Trade on Marketplace',
        description:
            'Connect directly with buyers on our transparent marketplace — fair pricing, no intermediaries.',
    },
    {
        icon: FileCheck,
        title: 'Retire & Report',
        description:
            'Credits are retired transparently with full impact reporting for buyers and regulatory compliance.',
    },
];

export default function HowItWorks() {
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
            { threshold: 0.05 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="section-padding"
            style={{ background: 'var(--cream)' }}
        >
            <div className="section-container">
                <div className="reveal text-center mb-16">
                    <p
                        className="text-sm font-semibold uppercase tracking-widest mb-3"
                        style={{ color: 'var(--sage)' }}
                    >
                        The Process
                    </p>
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">
                        From project registration to credit retirement — a seamless journey
                        in five simple steps.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Connecting Line (desktop) */}
                    <div
                        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px"
                        style={{ background: 'linear-gradient(180deg, var(--mint) 0%, var(--sage-light) 50%, var(--mint) 100%)' }}
                    />

                    <div className="space-y-8 lg:space-y-0">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`reveal reveal-delay-${(index % 4) + 1} lg:flex lg:items-center lg:gap-8 ${isEven ? '' : 'lg:flex-row-reverse'
                                        }`}
                                    style={{ marginBottom: index < steps.length - 1 ? '2rem' : 0 }}
                                >
                                    {/* Card */}
                                    <div className={`lg:w-[calc(50%-2rem)] ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                        <div className="glass-card p-6">
                                            <div
                                                className={`flex items-start gap-4 ${isEven ? 'lg:flex-row-reverse lg:text-right' : ''
                                                    }`}
                                            >
                                                <div className="feature-icon shrink-0 !mb-0">
                                                    <step.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3
                                                        className="text-lg font-semibold mb-2"
                                                        style={{ color: 'var(--forest)' }}
                                                    >
                                                        {step.title}
                                                    </h3>
                                                    <p
                                                        className="text-sm leading-relaxed"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Dot (desktop) */}
                                    <div className="hidden lg:flex items-center justify-center shrink-0">
                                        <div className="step-number !mb-0 text-sm">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
