const router = require("express").Router();
const { Comment, Song, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const songData = Song.findAll({});
    const allSongs = songData.Map((song) => song.get({ plain: true }));

    res.render("hompage", allSongs);
  } catch (error) {
    res.status(500).json(err);
  }
});
