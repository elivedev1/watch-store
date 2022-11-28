import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminHome.module.scss';
import AdminSidebar from '../../components/adminlayout/AdminSidebar';
import Header from '../../components/Layout/Header';

const cx = classNames.bind(styles);

function AdminHome() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <AdminSidebar />
                <Header />
            </div>
        </div>
    );
}

export default AdminHome;
