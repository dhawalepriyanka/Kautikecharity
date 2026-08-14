"use client";
import { useEffect } from "react";
export function PageMotion() { useEffect(() => { const targets = document.querySelectorAll<HTMLElement>(".reveal-on-scroll"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .14 }); targets.forEach((target) => observer.observe(target)); return () => observer.disconnect(); }, []); return null; }
