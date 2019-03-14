import "@babel/polyfill";
import React from 'react';
import descriptions from '../videoData_json';
import Title from './components/Title.jsx';
import axios from 'axios';
import IconTab from './components/IconTab.jsx';
import LineDivider from './components/LineDivider.jsx';
import DetailCom from './components/DetailCom.jsx';
import CommentsList from './components/CommentsList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorImg: '',
            details: '',
            categories: [],
            data: {}
        }
        this.getAuthorImg = this.getAuthorImg.bind(this);
    }

    getAuthorImg(name,cb) {
        axios.get(`http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com/userid/${name}`).then((data)=>{
            axios.get(`http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com/usersthumbnail/${data.data}`).then((data)=>{cb(data)})
        })
    }

    getDetail(video_id) {
        axios.get(`http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com/details/${video_id}`).then((data)=>{
            console.log("service data", data)
            this.setState({
                details: data.data[0].description
            });
        });
    }

    getCategories(video_id) {
        axios.get(`http://huyservice.gsm3yc37rb.us-west-1.elasticbeanstalk.com/categories/${video_id}`).then((data)=>{
            this.setState({
                categories: data.data.categories
            });
        }).catch((err)=>{console.log(err)});
    }

    componentDidMount() {
        let id = window.location.pathname; //  '/5/'
        id = id.split('/');
        axios.get(`http://videoplayerservice-env.cdi5d5qypg.us-east-2.elasticbeanstalk.com/videos/${id[1] !== '/' ? Number(id[1]) : 1}`).then((data)=>{
            console.log('Chase endpoitn', data)
            this.setState({
                data: data.data[0]
            }),
            this.getAuthorImg(data.data[0].author,(data)=>{
                this.setState({
                    authorImg: data.data.user_thumbnail
                })
            });
        })
        this.getDetail(id[1] !== '/' ? Number(id[1]) : 1);
        this.getCategories(id[1] !== '/' ? Number(id[1]) : 1);
    }

    render() {
        const fakeData = {
            "video_id": "1",
            "video_url": "https://player.vimeo.com/video/65107797/?v=1",
            "thumbnail": "https://i.vimeocdn.com/video/435992078_130x73.jpg",
            "title": "Katheryn Avenue",
            "author": "Alberta59",
            "plays": "12679000"
        }

        return (
            <div style={{paddingLeft: '2.5rem', paddingTop: '2.5rem', float: 'left', width: '66%'}}>
                <Title data={Object.keys(this.state.data).length > 0 ? this.state.data : fakeData}
                       authorImg={this.state.authorImg}
                />
                <LineDivider />
                <IconTab data={Object.keys(this.state.data).length > 0 ? this.state.data : fakeData}/>
                <DetailCom data={this.state.details}
                           categories={this.state.categories}
                />
                &nbsp;
                <LineDivider />
                &nbsp;
                <CommentsList />
            </div>
        )
    }
}

export default App;