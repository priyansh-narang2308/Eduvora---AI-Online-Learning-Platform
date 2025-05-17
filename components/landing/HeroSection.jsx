import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const HeroSection = () => {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-primary leading-tight">
                    Unlock Your Potential with <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">AI-Powered</span> Learning
                </h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Experience a revolutionary way to learn with our cutting-edge AI platform. Personalized paths, interactive lessons, and real-world projects await you.
                </p>
                <div className="space-x-4">
                    <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                        <Button size="lg" className="bg-blue-500 cursor-pointer text-primary-foreground hover:bg-blue-700">
                            Get Started For Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </SignUpButton>
                    <Button size="lg" variant="outline" className="border-primary cursor-pointer text-primary hover:bg-primary/10" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                        Explore Features
                    </Button>
                </div>
                <div className="mt-16">
                    <img
                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaG5vbG9neSUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Modern laptop on a desk, symbolizing AI learning"
                        className="w-full max-w-7xl mx-auto rounded-lg shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
