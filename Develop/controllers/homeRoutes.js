const router = require("express").Router();
const { Song, User } = require("../models");
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

// r
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
      const userData = await User.findOne(
       { where:{name:req.params.user},
      attributes: { exclude: ["password"] },
        include: [{ model: Song }], });
        
        const user = userData.get({
          plain: true
        });
  
        res.render ("user", {
          ...user,
          logged_in: req.session.logged_in,
        });
  
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
