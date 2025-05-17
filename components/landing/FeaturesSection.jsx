import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Zap, Brain, Users, BarChart } from 'lucide-react';

const features = [
    {
        icon: <Zap className="h-10 w-10 text-primary mb-4" />,
        title: 'Personalized Learning Paths',
        description: 'Our AI adapts to your learning style and pace, creating a unique educational journey just for you.',
    },
    {
        icon: <Brain className="h-10 w-10 text-primary mb-4" />,
        title: 'Interactive AI Tutors',
        description: 'Get instant help and guidance from AI tutors available 24/7. Ask questions and explore concepts.',
    },
    {
        icon: <Users className="h-10 w-10 text-primary mb-4" />,
        title: 'Collaborative Projects',
        description: 'Work on real-world projects with peers, guided by AI, to build practical skills and a strong portfolio.',
    },
    {
        icon: <BarChart className="h-10 w-10 text-primary mb-4" />,
        title: 'Progress Tracking & Analytics',
        description: 'Monitor your progress with detailed analytics and insights, helping you stay motivated and on track.',
    },
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-4 text-primary">Why Choose Us?</h2>
                <p className="text-xl text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                    Discover the features that make our AI learning platform the best choice for your educational goals.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="bg-card hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <CardHeader className="items-center">
                                {feature.icon}
                                <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-center text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
