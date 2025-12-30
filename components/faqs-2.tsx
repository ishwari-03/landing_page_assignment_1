'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Is FocusFlow free to use?',
            answer: 'Yes. FocusFlow offers a free plan with all core features. Advanced features will be available in future updates.',
        },
        {
            id: 'item-2',
            question: 'Is this built for students or professionals?',
            answer: 'FocusFlow is designed for both. Whether you’re a student managing studies or a creator working on projects, the workflow adapts to your needs.',
        },
        {
            id: 'item-3',
            question: 'Do I need to install anything?',
            answer: 'No installation required. FocusFlow works directly in your browser.',
        },
        {
            id: 'item-4',
            question: 'How is FocusFlow different from other productivity tools?',
            answer: "FocusFlow focuses on simplicity and consistency. Instead of overwhelming you with features, it helps you focus on what truly matters each day",
        },
        {
            id: 'item-5',
            question: 'Can I use FocusFlow on mobile?',
            answer: 'Yes. FocusFlow is fully responsive and works smoothly on mobile devices. A dedicated mobile app is planned.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can&apos;t find what you&apos;re looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
