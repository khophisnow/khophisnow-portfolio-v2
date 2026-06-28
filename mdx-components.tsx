import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mt-10 text-4xl font-black text-white md:text-5xl">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-black text-white">{children}</h2>,
    p: ({ children }) => <p className="mt-5 text-base leading-8 text-white/70">{children}</p>,
    ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-white/68">{children}</ul>,
    li: ({ children }) => <li className="leading-7">{children}</li>,
    code: ({ children }) => <code className="border border-white/10 bg-black/35 px-1.5 py-0.5 font-mono text-sm text-mint">{children}</code>,
    ...components,
  };
}
