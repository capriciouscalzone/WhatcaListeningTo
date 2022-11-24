const router = require('express').Router();
const { Song } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const newSong = await Song.create ({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newSong);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const songData = await Song.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!songData)  {
            res.status(404).json({ message: 'No song found with this id!'});
            return;
            
        };

        res.status(200).json(songData);
    } catch (error) {
        res.status(500).json(error);
        
    }
});

module.exports = router;