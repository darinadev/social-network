import React from 'react';
import styles from './Users.module.css';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { FilterType } from '../../redux/users-reducer';
import { getFilter } from '../../selectors/users-selectors';
import { Button } from 'antd';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType = {
    term: string
    friend: "null" | "true" | "false"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const filter = useSelector(getFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
            term: values.term
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: filter.friend }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={styles.usersSearch}>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>Find</Button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm