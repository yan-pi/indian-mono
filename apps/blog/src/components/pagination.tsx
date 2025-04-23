"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  current: number;
  end: number;
  path: string;
};

export function Pagination({ current, end, path }: PaginationProps) {
  const prevPage = current > 1 ? current - 1 : null;
  const nextPage = current < end ? current + 1 : null;

  const prevPath = prevPage === 1 ? path : `${path}/${prevPage}`;
  const nextPath = `${path}/${nextPage}`;

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Link
          href={prevPage ? prevPath : "#"}
          className={`flex h-8 w-8 items-center justify-center rounded-md ${
            prevPage
              ? " hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-fd-secondary"
              : "pointer-events-none opacity-50 text-gray-400 dark:text-gray-600"
          }`}
          aria-label="Ir para página anterior"
          aria-disabled={!prevPage}
          onClick={(e) => !prevPage && e.preventDefault()}
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
        </Link>

        <p
          className="text-sm text-gray-500 dark:text-gray-400"
          aria-live="polite"
        >
          Page <span className=" ">{current}</span> /{" "}
          <span className="text-gray-900 dark:text-gray-200">{end}</span>
        </p>

        <Link
          href={nextPage ? nextPath : "#"}
          className={`flex h-8 w-8 items-center justify-center rounded-md ${
            nextPage
              ? " hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-fd-secondary"
              : "pointer-events-none opacity-50 text-gray-400 dark:text-gray-600"
          }`}
          aria-label="Ir para próxima página"
          aria-disabled={!nextPage}
          onClick={(e) => !nextPage && e.preventDefault()}
        >
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
