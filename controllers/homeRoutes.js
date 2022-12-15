const router = require("express").Router();
const { Song, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const songData = await Song.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const allSongs = songData.map((song) => song.get({ plain: true }));

    res.render("homepage", { allSongs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const profileData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Song }],
    });

    const profile = profileData.get({ plain: true });

    res.render("profile", {
      ...profile,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  try{
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");}
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:user", async (req, res) => {
    try {

      const [userData, commentData] = await Promise.all([
        User.findOne(
          { 
            where:{name:req.params.user},
            attributes: { exclude: ["password"] },
            include: [{ model: Song }], 
          }),
        Comment.findAll(),
      ]);

      const user = userData.get({
          plain: true
      });
  
      const comments = commentData.map((comment) => comment.get({ plain: true }));

      res.render ("user", {
        ...user,
        comments,
        logged_in: req.session.logged_in,
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;
