import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Syntac"
              width={24}
              height={24}
              className="opacity-60"
            />
            <span className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Syntac. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
