/* eslint-disable */
import React, {useState} from 'react';
import { FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createPost} from "../../sagas/posts/createPost";


function CreateInstagramPost ({createPost})  {
    const [loading, setLoading] = useState(false);

    return(
        <Container>
            <h1 className="text-light">Add a new Instagram Post!</h1>
            <div className="text-light">
                <p>
                    Future Features:
                    <ul>
                        <li>
                            Post and comments pagination
                        </li>
                        <li>
                            Post and comments update
                        </li>
                    </ul>
                </p>
                <p>
                    Currently limitations:
                    <ul>
                        <li>
                            Max number of comments and replies limited to 10
                        </li>
                    </ul>
                </p>
            </div>

            <Formik
                initialValues={{ quantity: '', link: '' }}
                onSubmit={function (values){
                    setLoading(true)
                    createPost(values.quantity, values.link);
                }}
            >
            {({ values, handleChange }) => (
                <Form>
                    <FormGroup>
                        <Label for="link">Link</Label>
                        <Input
                            name="link"
                            id="link"
                            type="url"
                            value={values.link}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="quantity">Quantity</Label>
                        <Input
                            name="quantity"
                            id="quantity"
                            max="10"
                            value={values.quantity}
                            type="number"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button type="submit">Create</Button>
                </Form>
            )}
            </Formik>
            {loading?<div className="loader-spin"></div>:null}
        </Container>
    )
};


// CreateInstagramPost.propTypes = {
//     func: PropTypes.func,
// };
//
// CreateInstagramPost.defaultProps = {
//     func: createPost,
// };

const mapDispatchToProps = (dispatch) => ({
    createPost: (quantity, link) => dispatch(createPost(quantity, link)),
});

const CreatePostConnector = connect(
    null,
    mapDispatchToProps,
)(CreateInstagramPost);

export default CreatePostConnector;
