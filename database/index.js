const mongoose = require('mongoose');
const uri = "mongodb+srv://Huy:11121988@cluster0-htke2.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to db!')
});

const descriptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    video_id: {
        type: Number,
        unique: true,
        dropDups: true
    },
    description: String,
    categories: [String],
    likes: Number
});

const Description = mongoose.model('Description', descriptionSchema);

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    video_id: Number,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: String,
    date: Date
});

const Comment = mongoose.model('Comment', commentSchema);

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        unique: true,
        dropDups: true
    },
    user_thumbnail: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    Description,
    Comment,
    User,
    db
}
