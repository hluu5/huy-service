//This file is used to test out the database using command node testing.js
var Comment = require('./database/index.js').Comment;
var User = require('./database/index.js').User;
var videoData = require('./videoData_json');
var faker = require('faker');
const db = require('../huy-service/database/index').db;
// const Comment = require('./index.js').Comment;
// const User = require('./index.js').User;
const mongoose = require('mongoose');
const differenceInTime = require('date-fns').distanceInWordsStrict;
// var date = Comment.findOne({video_id: 1}).exec()
//     .then(data=>{
//         console.log(differenceInTime(new Date(),
//         data.date,
//         {addSuffix: true}))
//     })
// var result = differenceInTime(date.date);

// async function saveComment(videoId, userName, comment, date, cb) {
//     const instOfComment = new Comment({
//         _id: new mongoose.Types.ObjectId(),
//         video_id : videoId,
//         user_id: userName,
//         comment: comment,
//         date: date
//     });
//     await instOfComment.save().then((data)=>{
//         cb(data);
//     }).catch(err => console.log(err))
// }

// async function logComment() {
//     // for (let i = 1; i < 101; i++) {
//     //     for (let j = 0; j < 10; j++) {
//     //         const randomComment = await faker.lorem.sentences();
//     //         const randomDate = await faker.date.past();
//     //         await saveComment(i, videoData[i - 1].author, randomComment, randomDate, () => {
//     //             console.log(videoData[i - 1].author);
//     //             console.log(i,j)
//     //         })
//     //     }

//     // }
//     const user = await User.findOne({username: videoData[0].author});
//     const user2 = await User.findOne({username: videoData[1].author});
//     const user3 = await User.findOne({username: videoData[2].author});
//     console.log(user, user2, user3)
// }

// logComment();

Comment.find({ video_id: 1 }).sort({date: -1}).limit(10).exec().then(data=>{console.log(data)})
// console.log(db);