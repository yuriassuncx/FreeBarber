'use client';

import { Features } from "./Features";
import { Hero } from "./Hero";
import { Pricing } from "./Pricing";

export default function Home() {
    return (
        <div>
            <Hero title="FreeBarber" subtitle="Encontre e agende um barbeiro a qualquer momento e do conforto da sua casa." />
            <Features />
            <Pricing />
        </div>
    )
}