const uploadFile = (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadFile,
};
