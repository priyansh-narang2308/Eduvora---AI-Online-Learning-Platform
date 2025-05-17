import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
                <p className="text-xl mb-10 max-w-xl mx-auto">
                    Join thousands of learners who are already benefiting from our AI-powered platform. Sign up today and take the first step towards a brighter future.
                </p>
                <SignUpButton mode="modal" fallbackRedirectUrl="/workspace">
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white text-primary border-white hover:bg-white/90 hover:text-primary/90 font-semibold"
                    >
                        Sign Up Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </SignUpButton>
            </div>
        </section>
    );
};

export default CTASection;
