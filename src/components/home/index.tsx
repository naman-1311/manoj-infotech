'use client';

import { useEffect } from 'react';
import Navbar from '@/components/hero/navbar';
import HeroText from '@/components/hero/hero-text';
import CustomCursor from '../ui/custom-cursor';
import PhilosophySection from '../sections/philosophy-section';
import ServicesGrid from '../sections/services-grid';
import SocialProof from '../sections/social-proof';
import AboutSection from '../sections/about-section';
import EnquireCTA from '../sections/enquire-cta';
import LocationMap from '../sections/location-map';
import SiteFooter from '../sections/site-footer';
import ScrollProgressBar from '../ui/scroll-progress-bar';

export default function Home() {
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <CustomCursor />
            <div className="relative">
                <ScrollProgressBar />
                <Navbar visible={true} />
                <main>
                    <HeroText />
                    <PhilosophySection />
                    <ServicesGrid />
                    <SocialProof />
                    <AboutSection />
                    <EnquireCTA />
                    <LocationMap />
                    <SiteFooter />
                </main>
            </div>
        </>
    );
}
