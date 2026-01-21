import Link from 'next/link';

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-background/80 backdrop-blur-md border-b border-dashed border-border z-50 flex items-center justify-between px-6">
            <div className="font-serif text-xl font-bold text-primary flex items-center">
                <Link href="/">Adi<span className="text-accent text-3xl leading-none">.</span></Link>
            </div>
            <nav className="flex items-center gap-6">
                {['logs', 'about'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item}`}
                        className="text-sm font-medium text-primary hover:text-accent transition-colors no-underline"
                    >
                        [{item}]
                    </Link>
                ))}
            </nav>
        </header>
    );
}
