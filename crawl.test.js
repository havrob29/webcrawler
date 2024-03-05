const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')

test('website check 1', () => {
    expect(normalizeURL('https://blog.boot.dev/path/'
    )
    ).toBe('blog.boot.dev/path');
});

test('website check 2', () => {
    expect(normalizeURL('https://blog.boot.dev/path'
    )
    ).toBe('blog.boot.dev/path');
});

test('website check 3', () => {
    expect(normalizeURL('http://blog.boot.dev/path/'
    )
    ).toBe('blog.boot.dev/path');
});

test('website check 4', () => {
    expect(normalizeURL('http://blog.boot.dev/path'
    )
    ).toBe('blog.boot.dev/path');
});

test('website check 5', () => {
    expect(normalizeURL('https://www.blog.boot.dev/path.html'
    )
    ).toBe('blog.boot.dev/path');
});

test('urlsFromHTML 1', () => {
    expect(getURLsFromHTML(`html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/blog"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/blog/article"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/blog/article/thesis.pdf"><span>Go to Boot.dev</span></a>
        <a href="/blog/article/author"><span>Go to Boot.dev</span></a>
    </body>
</html>`, 'https://www.google.com')
).toStrictEqual(["https://blog.boot.dev/", "https://blog.boot.dev/blog", "https://blog.boot.dev/blog/article", "https://blog.boot.dev/blog/article/thesis.pdf", 'https://www.google.com/blog/article/author']);
});