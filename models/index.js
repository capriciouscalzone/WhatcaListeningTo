const User = require('./User');
const Song = require('./Song');
const Comment = require('./Comment');

User.hasMany(Song, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Song.hasMany(Comment, {
  foreignKey: 'song_id',
  onDelete: 'CASCADE'
});

Song.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Song, {
  foreignKey: 'song_id'
});

module.exports = { User, Song, Comment };
