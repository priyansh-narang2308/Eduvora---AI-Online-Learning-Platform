"use client"

import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import  Link  from 'next/link';

const Navbar = () => {
    const navigate = useRouter();

    const goToDashboard = () => {
        navigate.push('/workspace');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
                    Eduvora
                </Link>
                <div className="flex items-center space-x-3">
                    <SignedIn>
                        <Button variant="default" onClick={goToDashboard} className="text-white cursor-pointer">
                            <LayoutDashboard className="mr-2 h-5 w-5" />
                            Dashboard
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" fallbackRedirectUrl="/workspace">
                            <Button variant="outline" className="text-primary border-primary cursor-pointer hover:bg-primary/10">
                                <LogIn className="mr-2 h-5 w-5" />
                                Sign In
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal" fallbackRedirectUrl="/workspace">
                            <Button className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90">
                                <UserPlus className="mr-2 h-5 w-5" />
                                Sign Up
                            </Button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
