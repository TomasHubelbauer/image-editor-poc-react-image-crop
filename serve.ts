import { type Serve, type TSConfig, Transpiler } from 'bun';

const tsconfig: TSConfig = {
  // Note no `inlineSourceMap` and `inlineSources` support
  // See https://github.com/oven-sh/bun/issues/8620
  compilerOptions: {
    jsx: 'react'
  },
};

const transpiler = new Transpiler({ loader: 'tsx', tsconfig });
const headers = { 'Content-Type': 'application/javascript' };

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (!path.startsWith('/')) {
      return new Response(`Invalid path ${path}`, { status: 400 });
    }

    if (path === '/') {
      return new Response(Bun.file('index.html'));
    }

    if (path === '/index.css') {
      return new Response(Bun.file('index.css'));
    }

    if (path === '/sample.jpg') {
      return new Response(Bun.file('sample.jpg'));
    }

    if (/^\/\w+\.[jt]sx?$/.test(path)) {
      const extension = path.split(".").pop();
      if (extension !== 'js' && extension !== 'jsx' && extension !== 'ts' && extension !== 'tsx') {
        throw new Error(`Unknown extension: ${path}`);
      }

      const text = await Bun.file(path.slice('/'.length)).text();
      return new Response(await transpiler.transform(text), { headers });
    }

    return new Response(`Not found: ${path}`, { status: 404 });
  }
} satisfies Serve;
