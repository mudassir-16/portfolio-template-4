Personal Portfolio – Design Document

For Mohammed Mudassir

1. Design Vision

Create a modern editorial-style portfolio that looks like a designer showcase poster, similar to the Pinterest reference.

The page should feel like:

a visual portfolio magazine

bold typography

large hero image

card-based portfolio previews

deep gradient background

minimal scrolling sections

The website should communicate:

Developer + Designer + Creator

2. Layout Structure

Single page scroll layout.

Navbar
Hero Section
About Me Section
Skills / Services
Projects Showcase
Other Works
Collaboration / Contact
Footer
3. Color System

Based on your preferred palette (purple / gold / white style but adapted to this design).

Primary Background
Gradient:
#2A0845
#6441A5
#8E2DE2
Secondary Background Cards
#1C1C2E
#2A2A40
Accent Colors

Gold highlight

#F5C542

Light text

#FFFFFF
#EAEAEA

Muted text

#A8A8B3
4. Typography
Heading Font

Editorial serif

Suggested:

Playfair Display
or
Bodoni

Used for:

Hero title

Section titles

Example

PORTFOLIO

Large transparent typography in background.

Body Font

Clean sans-serif

Inter
or
Poppins

Used for:

descriptions

UI text

cards

5. Hero Section
Layout

Two-column layout

LEFT
Large Typography
Short intro

RIGHT
Portrait Image
Elements

Large background word

PORTFOLIO

Foreground text

Mohammed Mudassir
Full Stack Developer
UI Designer
Web Developer

Buttons

View Projects
Contact Me

Hero image:

Circular portrait
6. About Me Section

Inspired by the “Who am I” card in the reference.

Layout
Left: avatar illustration or photo
Right: description card
Content

Title

About Me

Description example

I am Mohammed Mudassir, a passionate developer and designer.
I build modern web applications, portfolios, and digital
products using clean UI and scalable technologies.

I enjoy building creative interfaces and solving real
problems through technology.
7. Skills / Services Section

Inspired by UX/UI/WEB block in reference design

Layout

3 Cards

UI Design
Web Development
Full Stack Development

Each card includes

icon
title
short description

Example

Card 1

UI / UX Design
Designing clean and modern interfaces
using Figma and modern design systems.

Card 2

Frontend Development
Building responsive websites using
React, Next.js, TailwindCSS.

Card 3

Backend Development
Building scalable APIs and databases
using Node.js, Supabase, and PostgreSQL.
8. Projects Showcase

Inspired by website redesign preview section.

Layout

Grid

2 columns
large cards

Each card contains

Project Screenshot
Project Title
Short Description
Tech Stack
View Project Button

Example

Project Card

Student Community Platform
A platform connecting IT students with profiles
and batch-based filtering.

Tech:
Next.js
Supabase
Tailwind
9. Other Works Section

Inspired by "other works" panel in design

Display smaller works.

Layout

Grid

4–6 cards

Examples

Landing Page Designs
Mobile UI Designs
Hackathon Projects
Dashboard UI
Brand Designs
Logo Designs

Cards contain

preview image
title
year
10. Collaboration Section

Inspired by bottom collaboration panel in design

Large CTA section.

Layout
LEFT
Contact message
QR codes / links

RIGHT
Portrait image

Text

Let's Work Together

Description

Need a website, redesign, or digital product?

Let's collaborate and create something amazing.

Buttons

Email
LinkedIn
GitHub
11. Contact Options

Display icons

GitHub
LinkedIn
Email
Instagram
12. Components Needed

Developer should build reusable components:

Navbar
HeroSection
AboutCard
SkillCard
ProjectCard
WorkCard
ContactSection
Footer
13. Animations

Use subtle animations

fade up on scroll
hover zoom on cards
button glow hover

Libraries

Framer Motion
or
AOS
14. Tech Stack Recommendation

Best stack for this portfolio

Next.js
TailwindCSS
Framer Motion
Vercel
15. Responsive Behavior
Desktop
Grid layouts
Large typography
Side-by-side sections
Tablet
2 column grid
Mobile
Single column
Hero image below text
Cards stacked
16. Folder Structure

Example

portfolio
 ├ components
 │   Navbar
 │   Hero
 │   About
 │   Skills
 │   Projects
 │   Contact
 │
 ├ sections
 │
 ├ public
 │   images
 │
 ├ styles
 │
 └ pages
     index.tsx