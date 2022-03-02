import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import commentCreate from './commentCreate';


export default () =>{
    return (
    <div className='container'>
     <h1>Post Creation</h1>
     <PostCreate/>
     <hr />
     <h1>Posts</h1>
     <PostList/>
    </div>
    );


};
