import React from "react"
import Navbar from "../components/Navbar";

// import {
//     Table,
//     Row,
//     Col,
//     Divider,
//     Rate
// } from 'antd'

const activityColumns = [
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user'
    },
    {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity'
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time'
    }
];

const testActivityData = [
    {
        user: 'You',
        activity: 'Added Harry Potter and the Chamber of Secrets to your list',
        time: 'Just now'
    },
    {
        user: 'You',
        activity: 'Finished Harry Potter and the Sorcerer\'s Stone',
        time: 'Just now'
    },
    {
        user: 'You',
        activity: 'Added The Great Gatsby to your list',
        time: '5 days ago'
    },
    {
        user: 'You',
        activity: 'Added Pride and Prejudice to your list',
        time: '5 days ago'
    },
    {
      user: 'You',
      activity: 'Started reading Diary of a Wimpy Kid',
      time: '1 week ago'
    },
    {
        user: 'Anna Wang',
        activity: 'Started reading The Lord of the Rings',
        time: '1 week ago'
    },
    {
        user: 'Allison Chen',
        activity: 'Reviewed Diary of a Wimpy Kid: Rodrick Rules',
        time: '2 weeks ago'
    },
    {
        user: 'Allison Chen',
        activity: 'Finished Diary of a Wimpy Kid: Rodrick Rules',
        time: '2 weeks ago'
    },
     
];

export default function BookClub() {
    return (
        <div className="page__content">
            <Navbar/>
            <img src="https://em-content.zobj.net/thumbs/240/apple/354/books_1f4da.png" width={60}/>
            <h1>Book Club</h1>

            {/* <div style={{ width: "70vw", margin: "0 auto", marginTop: "5vh" }}>
                            <Table
                                columns={activityColumns}
                                dataSource={testActivityData}
                                // pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: false }}
                            />
                        </div> */}
        </div>
    );
}