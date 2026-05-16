import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    
    
    res.render('index');
});
router.get('/about', (req, res) => {
    
    
    res.render('about');
});
router.get('/research', (req, res) => {
    
    
    res.render('research');
});
router.get('/cv', (req, res) => {
    
    
    res.render('cv');
});
router.get('/blog', (req, res) => {
    
    
    res.render('blog');
});
router.get('/contact', (req, res) => {
    
    
    res.render('contact');
});

export default router;
