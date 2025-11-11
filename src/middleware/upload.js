import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    console.log('Original file path:', req.file.path);

    const thumbnailPath = req.file.path + '_thumb.png';

    await sharp(req.file.path).resize(160, 160).png().toFile(thumbnailPath);

    console.log('Thumbnail created:', thumbnailPath);
    next();
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    next(error);
  }
};

export {createThumbnail};
