import React from 'react'
import styles from './Posts.module.css'
import Post from './Post'
import { PostType } from '../../../types/types'
import { AddPostReduxForm, AddPostFormValueType } from './AddPostForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/store'
import { actions } from '../../../redux/profile-reducer'

type PropsType = {}

const Posts: React.FC<PropsType> = React.memo((props) => {

    const posts = useSelector((state: AppStateType) => state.profilePage.posts)

    const dispatch = useDispatch()

    const deletePost = (postId: number) => {
        dispatch(actions.deletePost(postId))
    }

    let postsItem = posts.map((post: PostType) =>
        <Post
            id={post.id}
            key={post.id}
            message={post.message}
            likesCount={post.likesCount}
            deletePost={deletePost}
        />)

    const onAddPost = (values: AddPostFormValueType) => {
        dispatch(actions.addPost(values.post))
    }

    return <div className={styles.posts}>
        <h2 className={styles.postsTitle}>My posts</h2>
        <AddPostReduxForm onSubmit={onAddPost} />
        <div className={styles.postsItems}>{postsItem}</div>
    </div>
})

export default Posts;