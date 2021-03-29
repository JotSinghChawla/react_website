import React from 'react'
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom'
import SubmitComment from './CommentFormComponent'
import Loading  from './LoadingComponent'
import { baseURL } from '../shared/baseURL'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Button } from 'bootstrap';

const DishdetailComponent = ({ sentDish, comments, postComment, isLoading, errMess, favorite, postFavorite }) => {

    // This is a functional component
    const RenderDish = ({ dish, fav, postFav }) => {                  
        return dish !== null ?
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%) '}} >
                    <Card>
                        <CardImg width="100%" top src={baseURL + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <Button color="info" onClick={() => fav ? console.log('Already favorite') : postFav(dish._id)}>
                                { favorite ? <span className='fa fa-heart'></span> : <span className='fa fa-heart-o'></span> }
                            </Button>
                            {/* { console.log(favorite, postFavorite) } */}
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle> {dish.name} </CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            : <div></div> 
    }

    // This is a functional component
    const ShowComments = ({ comments, postComment, dishId }) => {
        return comments !== null ? <>
            <h3>Comments</h3>
                <ul className='list-unstyled'>
                    <Stagger in>
                        { comments.map(element => {
                        return ( 
                            <Fade in key={element.id}>
                                <li>
                                    <p> {element.comment} </p>
                                    <p> {element.rating} stars</p>
                                    <p>  -- {element.author} | {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse( element.date )) )} </p>
                                </li>
                            </Fade>
                                ) 
                            }) 
                        }
                    </Stagger>
                </ul> 
                <SubmitComment text='Submit Comment' dishId={dishId} postComment={postComment}/>   
        </> : <div></div>
    }

    const inputDish = sentDish.length !== 0 ? sentDish[0] : null ;    
    const inputComments = comments.length !== 0 ? comments : null;

    if(isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }

    else 
    {
    return ( 
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem> 
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active> 
                        { inputDish.name }
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                            <h2>{inputDish.name}</h2>
                            <hr />
                        </div>
            </div>
            <div className='row'>
                <div className="col-12 col-md-5 m-2" >
                    <RenderDish dish={ inputDish } fav={ favorite} postFav={ postFavorite } />
                </div>
                <div className="col-12 col-md-5 m-2" >
                    {/* <ul className='list-unstyled'> */}
                        <ShowComments comments={ inputComments } postComment={ postComment } dishId={ inputDish._id } />
                    {/* </ul> */}
                </div>
            </div>
        </div> 
    )
    }
   
    
}


export default DishdetailComponent
