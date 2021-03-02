import * as ActionTypes from './ActionTypes'
import { DISHES } from '../shared/dishes'
import { baseURL } from '../shared/baseURL'

export const addComment = ( dishId, rating, author, comment ) => ({
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseURL + 'dishes')
        .then( response => response.json() )
        .then( dishes => dispatch( addDishes(dishes) ))

    // setTimeout( () => {
    //     dispatch(addDishes(DISHES))
    // }, 2000 )
}

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
})

export const fetchComments = () => (dispatch) => {
    return fetch( baseURL + 'comments' )
        .then( response => response.json() )
        .then( comments => dispatch(addComments(comments) ))
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
})


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return fetch(baseURL + 'promotions')
        .then( response => response.json() )
        .then( promotions => dispatch( addPromos(promotions) ))
}

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
})