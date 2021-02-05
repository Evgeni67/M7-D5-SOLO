import React from "react";
import { Container, ListGroup, Alert, Badge, Form, Col, Row, Spinner, Button } from "react-bootstrap"
import { BsTrash } from 'react-icons/bs';
import './Comment.css';

class Comments extends React.Component {
 
    
  constructor(props){
    super(props);
    this.state = {
        comment: {
            comment: "",
            rate: 1,
            elementId: this.props.match.params.songId,
        },  
        comments: null,
       props: this.props,
    }

}
 
 updateCommentField = (e) => {
    
    let comment = { ...this.state.comment } 
    let currentId = e.currentTarget.id 
    comment[currentId] = e.currentTarget.value
    this.setState({ comment: comment })     
 }

 submitComment = async (e) => {
     e.preventDefault();
     try {
         let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/',
             {
                 method: 'POST',
                 body: JSON.stringify(this.state.comment),
                 headers: new Headers
                     ({
                     "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMxMTBmYzQxZDVhYTAwMTcwNzgyYTYiLCJpYXQiOjE2MDY0ODgzMTYsImV4cCI6MTYwNzY5NzkxNn0.JKDZcMVNN9Efg-41MSuOZHwMxvVga6Dr6IAKZl0M-eQ"
                    })
             })
         if (response.ok) {
             alert('Comment added!')
             this.fetchComment()
             this.setState({
                comment: {
                    elementId: '',
                    rate: 1,
                    comment: '',
               }
             })
         } else {
             console.log('please check again')
             console.log(this.state.comment);
         }
     } catch (e) {
         console.log(e)
     }
 }

  componentDidMount = async () => {
    this.fetchComment();
  }
  fetchComment = async () => {
    const idFromTheSearchBar = this.props.match.params.songId;

    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + idFromTheSearchBar,
        {
          headers: new Headers({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMxMTBmYzQxZDVhYTAwMTcwNzgyYTYiLCJpYXQiOjE2MDY0ODgzMTYsImV4cCI6MTYwNzY5NzkxNn0.JKDZcMVNN9Efg-41MSuOZHwMxvVga6Dr6IAKZl0M-eQ",
          }),
        });
      if (response.ok) {
        let fetchedcomments = await response.json()
        this.setState({
          comments: fetchedcomments
        })
      } else {
        console.log("error during fetch")
      }
    } catch (e) {
      console.log(e);
    }
  }
  onDelete = async (id) => {
    const url= "https://striveschool-api.herokuapp.com/api/comments/"
    console.log(id);
    const res = await fetch( url + id, {
      headers: new Headers({
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMxMTBmYzQxZDVhYTAwMTcwNzgyYTYiLCJpYXQiOjE2MDY0ODgzMTYsImV4cCI6MTYwNzY5NzkxNn0.JKDZcMVNN9Efg-41MSuOZHwMxvVga6Dr6IAKZl0M-eQ",
      }),
      method: "DELETE",
    })
    if (res.ok) {
      console.log("deleted");
      this.fetchComment();
    }
  }


  render(props) {
console.log("props", this.state.props)
    return (
        <Container>
      <Container className="ml-5 p-5">
          <Form onSubmit={this.submitComment} >
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label htmlFor="rate" className="text-white">
                                Rate
                            </Form.Label>
                            <Form.Control
                                as="select"
                                name="rate"
                                id="rate"
                                value={this.state.comment.rate}
                                onChange={this.updateCommentField}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <Form.Group>
                            <Form.Label htmlFor="comment"  className="text-white">
                                Comment
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                id="comment"
                                placeholder="Your comment" 
                                required
                                value={this.state.comment.comment}
                                onChange={this.updateCommentField}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className="buttonModal">Submit</Button>
            </Form>
        {this.state.comments ? (
          <ListGroup className="mt-5 mb-5">
            {this.state.comments.map((comment, index) => {
              let variant = "";
              switch (comment.rate) {
                case 1:
                  variant = "danger";
                  break;
                case 2:
                  variant = "warning";
                  break;
                case 3:
                  variant = "secondary";
                  break;
                default:
                  variant = "success";
                  break;
              }

              return (

                <ListGroup.Item key={`list-item-${index}`} className="list-item " style={{ display: "flex", justifyContent: "space-between" }}>
                  <div> {comment.author}: {comment.comment} {" "}
                    <Badge pill variant={variant} className="ml-3">
                      {comment.rate}
                    </Badge>
                  </div>
                  <Button variant="danger" className="deleteComment ml-3" onClick={() => this.onDelete(comment._id)}><BsTrash /></Button>
                </ListGroup.Item>

              );
            })}
          </ListGroup>
        ) : (
              <Alert variant="danger" className="mt-5 ">
                No comments here
            </Alert>
          )}
      </Container>
      </Container>
    );
  }
}

export default Comments
