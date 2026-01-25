import Link from 'next/link';
import { DashedLine } from '@/components/ui/DashedLine';
import { SystemStatus } from '@/components/shell/SystemStatus';

export function Header() {
    return (
        <header
            className="fixed top-0 left-0 w-full h-16 bg-background z-50 flex items-center justify-between px-6"

        >
            {/* Bottom Border (Tech) */}
            <DashedLine className="absolute bottom-0 left-0 w-full" variant="receipt" />
            <div className="text-xl font-display font-bold text-primary flex items-center">
                <SystemStatus />
                <Link href="/">Adi<span className="text-accent text-3xl leading-none">.</span></Link>
            </div>
            <nav className="flex items-center gap-6">
                {['logs'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item}`}
                        className="text-sm font-mono font-medium text-primary hover:text-accent transition-colors no-underline"
                    >
                        [{item}]
                    </Link>
                ))}
            </nav>
        </header>
    );
}
