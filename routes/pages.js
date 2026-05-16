import { Router } from 'express';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../posts');
const router = Router();

function getPostMeta(filename) {
    const slug = filename.replace('.md', '');
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
    const lines = raw.split('\n');
    const meta = { slug, title: slug, date: '', description: '' };
    if (lines[0] === '---') {
        const end = lines.indexOf('---', 1);
        lines.slice(1, end).forEach(line => {
            const [key, ...val] = line.split(':');
            meta[key.trim()] = val.join(':').trim();
        });
        meta.body = lines.slice(end + 1).join('\n');
    } else {
        meta.body = raw;
    }
    return meta;
}

router.get('/', (req, res) => res.render('index'));
router.get('/about', (req, res) => res.render('about'));
router.get('/research', (req, res) => res.render('research'));
router.get('/cv', (req, res) => res.render('cv'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/blog', (req, res) => {
    const files = fs.existsSync(postsDir)
        ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
        : [];
    const posts = files.map(getPostMeta).sort((a, b) => b.date.localeCompare(a.date));
    res.render('blog', { posts });
});

router.get('/blog/:slug', (req, res) => {
    const filepath = path.join(postsDir, `${req.params.slug}.md`);
    if (!fs.existsSync(filepath)) return res.status(404).send('Post not found');
    const post = getPostMeta(`${req.params.slug}.md`);
    post.content = marked(post.body);
    res.render('post', { post });
});

export default router;
