/* eslint-disable */

import React from 'react';
import { Table, Container} from 'reactstrap';

const DetailPost = (props) => {
    return (
        <Container>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Comment</th>
                    <th>Sentiment</th>
                    <th>Situation</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default DetailPost;
