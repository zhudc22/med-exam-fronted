/* eslint-disable no-param-reassign */
import { each, filter, isEmpty } from 'lodash';

export const unflatten = ( array, parent?, tree? ) => {
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { id: 0 };
  const children = filter( array, child => child.parentId === parent.id);
  
  if( !isEmpty( children )  ){
      if( parent.id === 0 ){
         tree = children;   
      }else{
         parent.children = children
      }
      each( children, child =>  unflatten( array, child ) );
  }
  return tree;
}
