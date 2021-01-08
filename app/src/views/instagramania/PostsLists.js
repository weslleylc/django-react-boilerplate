/* eslint-disable */
import React,{useState} from 'react';
import { Container , Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import withView from 'decorators/withView';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardPostConnector from "./CardBox";
import CommentsFromPost from "./CommentsFromPost";
import './PostsLists.css';


function PostsLists ({ posts, comments})  {
    const [showComments, setShowComments] = useState(true);

    return(
        <Container >
            { showComments?
                <div className="mt-5">
                    <Row>
                        {posts.map((post) => (
                            <Col xs="4" key={post.id} className="mb-5">
                                <CardPostConnector post={post} setShowComments={setShowComments}/>
                            </Col>
                        ))}
                    </Row>
                </div>
                :
                <CommentsFromPost comments={comments} setShowComments={setShowComments}/>
            }
        </Container>
    )
}

PostsLists.propTypes = {
    posts: PropTypes.func.isRequired,
    comments: PropTypes.func,
};

PostsLists.defaultProps = {
    comments: [],
};
const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    comments: state.posts.comments,

});

const PostsListConnector = connect(mapStateToProps,)(PostsLists);

export default withView()(PostsListConnector);
















