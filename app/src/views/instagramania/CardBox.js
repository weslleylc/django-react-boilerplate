/* eslint-disable */

import React,{useState} from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardImg, Badge, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

import PropTypes from 'prop-types';
import './CardBox.css';
import { Route } from "react-router-dom";
import { deletePost } from "../../sagas/posts/deletePost";
import {commentsFromPost} from "../../sagas/posts/fetchPostComments";

function CardBox ({onDeletePost, onCommentsPost, post, setShowComments}) {
    const [readMore,setReadMore] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const showComments = (id) => {
        onCommentsPost(id)
        setShowComments(false)
    }

    return (
        <div >
            <Card className="special-card">
                <CardBody>
                    <a href={post.link}>
                        <CardImg clasName="card-img-top" top src={post.image_path}/>
                    </a>
                    <CardTitle tag="h5">{post.instagram_user}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <Badge color="primary">likes { post.likes }</Badge>
                    </CardSubtitle>
                </CardBody>
                <CardBody>
                    <Badge className="badge" color="success">positive + {post.number_positive}</Badge>
                    <Badge className="badge" color="danger">negative - {post.number_negative}</Badge>
                    <CardText>
                        {readMore?
                            <p>
                                {post.description.substring(0, 20)}
                                <b onClick={() => setReadMore(false)}
                                   onKeyDown={()=>console.log("remenber to fix  eslint")}>...load </b>
                            </p>:
                            <p>
                                {post.description}
                                <b onClick={() => setReadMore(true)}
                                   onKeyDown={()=>console.log("remenber to fix eslint")}>...hide </b>
                            </p>}
                    </CardText>
                    <p>
                        <FontAwesomeIcon icon={faTrash} className="fa-trash fa-2x"  onClick={() => setIsOpen(true)}/>
                        <FontAwesomeIcon icon={faEdit} className="fa-edit fa-2x" onClick={() => showComments(post.id)}/>
                    </p>

                    <Modal isOpen={isOpen} toggle={()=>{setIsOpen(false)}}>
                        <ModalHeader className="text-center" toggle={()=>{setIsOpen(false)}}>
                            <b>Are you sure?</b>
                        </ModalHeader>
                        <ModalBody>
                            Do you really want to delete these records? This process cannot be undone.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={()=>{setIsOpen(!isOpen)}}>
                                Cancel
                            </Button>{' '}
                            <button onClick={() => onDeletePost(post.id)} type="button"
                                    className="btn btn-danger">
                                Delete
                            </button>
                        </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
}

CardBox.propTypes = {
    post: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    onCommentsPost: PropTypes.func.isRequired,
    setShowComments: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
    onDeletePost: (id) => dispatch(deletePost(id)),
    onCommentsPost: (id) => dispatch(commentsFromPost(id)),
});


const CardPostConnector = connect(
    null,
    mapDispatchToProps,
)(CardBox);

export default CardPostConnector;















