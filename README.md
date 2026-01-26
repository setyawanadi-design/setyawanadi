# setyawanadi Workspace

This is where I will document my work, my studies, my life and lately I think out loud about operations, systems, and how to make things work easier.

**This site is where I keep track of what I'm learning and building.**

## Why I Built This

I wanted a place to:
- Document my work, findings, projects, and bits of life
- Write about work and how I think we can improve processes
- Share tools and workflows I've used or developed
- Keep a public record

that being said, I didn't want to deal with WordPress, Notion's limitations, or Medium's paywall privileges. I wanted something clean, simple, under my control, and cheap.

## What will be the contents?

- Work notes
- Projects I've run, my findings, problems I've solved, systems I've optimized
- interesting tools, repo, and apps that I found on the internet
- Python scripts, anything related toExcel/spreadsheets, tools I've used, tools I've built, tools I've tried to build
- Personal writing, process thinking, whatever else I'm working through

This isn't me trying to be anything fancy. It's just going to be a working space that happens to be online, my home that is online :))

## The Build Approach

I can work with HTML/CSS and write Python scripts (arcpy) but that's about it. I'm not building apps from scratch unless I'm working with a team of developers.

For this project, I used AI tools to handle the Next.js boilerplate and Tailwind styling. I defined what I wanted (the structure, design system, content architecture), and used LLMs to generate the code.

This is the same approach I usually take: identify what needs to happen, use whatever tools are available, ship a solution that works.

## The Stack

- **Next.js + MDX:** Content lives in Markdown files, for me to post my thoughts. I will be pushing from my phone using Termux (i think this will work?)
- **Tailwind CSS:** Utility styling without writing custom CSS
- **Vercel:** Auto-deploys when I push to GitHub (me broke for server)

Simple, maintainable, just what I need.

## Local Development
```bash
git clone https://github.com/setyawanadi-design/setyawanadi.git
cd setyawanadi
npm install
npm run dev
```

Open `http://localhost:3000`

## What This Site Represents

I'm a non-IT operations person who uses tech tools strategically. I coordinate non-IT operations, I manage teams, and run multi-site projects. I used to be in design/UX, but I've been in non-IT operations since 2023. And hopefully this site shows that I can:
- Define requirements and system architecture
- Orchestrate tools (AI, code, automation)
- Document and communicate complex work clearly
- Ship functional projects without getting stuck in technical details

## Changelog

### 2026.01.25 // System Stabilization & Log Architecture
We focused on consolidating technical debt and implementing the core Log Detail architecture.

- **Unified Design System**: Cleaned up the borders. I replaced the old `ReceiptBorder` and `TECH_DASH` mess with a single `<DashedLine />` component. Looking at the Headers, Footers, and Cards feels much more consistent now and its easier to maintain.
- **Log Detail Page**: Shipped the `/logs/[slug]` dynamic route. It supports rigid "Mockup-style" layouts via flexible MDX metadata (Frontmatter). Supports conditional rendering for logs Hero Images, Architecture Code Blocks, and Progress Indicators (tested and verified with 4 content scenarios (Minimal to Full-Feature).
- **UX Improvements**: `LogCard` is now clickable and fixed Next.js 16 async param handling for smoother navigation.

### 2026.01.26 // Cards functionality & Visual Polish

- **Unified dashes**: Consolidated everything into a single `<DashedLine />` component.
- **The Log Detail Page**: Validated the `/logs/[slug]` architecture. It's now fully dynamic-reading from MDX files
- **Active MDX**: Upgraded the rendering engine, I can put components (`CodeBlocks` and `Progress` bars) strictly inside my markdown files. as for now this is the right way to do it? flexible. documentation for now is not complete, it will be updated sooner
- **Pinned Logs**: now we can pin posts to the top of the feed(mobile), and on the sidebar by marking `pinned: true` in the frontmatter.
- **Visual Polish**:
    - Made the navigation active states clearer (Blue & Bold).
    - imrpoved Log Detail Page UI, now the content is more readable, organized, mobile friendly, and it has TOC(desktop only for now).
    - 'recent activity' card tidied up. and functional to log the latest logs.
- **Mobile Experience**: the sidebar approach didn't work on phones, i can't find the best way to implement as a sidebar in phone so Its best to built a dedicated mobile view for the Home and Logs pages. important info such as Contact, Pinned Logs, etc now appears right at the top on mobile view.