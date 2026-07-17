import DNAHelix from "./DNAHelix";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <DNAHelix size={22} />
            <span className="font-mono text-[11px] text-dim tracking-[0.1em]">
              &copy; {new Date().getFullYear()} Syntac
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-mono text-[11px] text-dim tracking-[0.1em] cursor-pointer transition-colors duration-300 hover:text-gold/70"
            >
              Contact
            </a>
            <a
              href="#"
              className="font-mono text-[11px] text-dim tracking-[0.1em] cursor-pointer transition-colors duration-300 hover:text-gold/70"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
