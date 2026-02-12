"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isHome = pathname === "/";

    return (
        <header
            className={`header ${scrolled ? "scrolled" : ""}`}
            style={{
                background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
                boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
                padding: scrolled ? "15px 0" : "25px 0",
                transition: "all 0.3s ease"
            }}
        >
            <div className="container">
                <Link href="/" className="logo">
                    Roopali<span>Fashion</span>
                </Link>
                <nav className={`nav-links ${isOpen ? "active" : ""}`}>
                    <ul style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                        <li>
                            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link href="/#about" onClick={() => setIsOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link href="/#collection" onClick={() => setIsOpen(false)}>Collection</Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ padding: "8px 20px", color: "white" }}>
                                Contact Us
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className={`hamburger ${isOpen ? "toggle" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
}
