/* eslint-disable */

import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Table, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import {deletePost} from "../../sagas/posts/deletePost";
import {commentsFromPost} from "../../sagas/posts/fetchPostComments";
import './CommentsFromPost.css';


const CommentsFromPost = ({comments, setShowComments}) => {
    const [replies, setReplies] = useState([]);

    return (
        <Container>
            <button onClick={() => setShowComments(true)} type="button"
                    className="btn btn-dark mb-2">
                Return to Posts
            </button>
            <Table>
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Comment</th>
                    <th>Sentiment</th>
                    <th>Likes</th>
                </tr>
                </thead>
                <tbody>
                {
                    replies && replies.length>0?(
                        replies.map((comment, index) => {
                                return (
                                    <tr onClick={() => setReplies([])}
                                        className={`${comment.sentiment >50 ? 'row-positive' : 'row-negative'}`}
                                    >
                                        <th scope="row"> {index} </th>
                                        <td>{comment.comment}</td>
                                        <td>{comment.sentiment}</td>
                                        <td>{comment.likes}</td>
                                    </tr>
                                )}
                            )

                    ):(
                        comments.map((comment, index) => {
                                return (
                                    <tr onClick={() => setReplies(comment.reply_set)}
                                        className={`${comment.sentiment >50 ? 'row-positive' : 'row-negative'}`}
                                    >
                                        <th scope="row"> {index} </th>
                                        <td>{comment.comment}</td>
                                        <td>{comment.sentiment}</td>
                                        <td>{comment.likes}</td>
                                    </tr>
                                )}
                            )
                    )

                }

                </tbody>
            </Table>
        </Container>
    );
}


CommentsFromPost.propTypes = {
    comments: PropTypes.func.isRequired,
    setShowComments: PropTypes.func.isRequired,
};

export default CommentsFromPost;





