app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.status(200).json(book);
});