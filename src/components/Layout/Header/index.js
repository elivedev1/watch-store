import { faCartShopping, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import React, { useState, useEffect } from 'react';

import styles from './Header.module.scss';
import Login from '../../../screens/Login';
import Register from '../../../screens/Register';
import Cart from '../../../screens/Cart';
import firebase from '../../../firebase/config';
import Search from './Search';

function Header() {
    const cx = classNames.bind(styles);
    const cartRef = firebase.firestore().collection('cart');
    const userId = sessionStorage.getItem('Uid');
    const userRef = firebase.firestore().collection('users').where('id', '==', userId);

    const [products, setProducts] = useState([]);
    const [small, setSmall] = useState(false);
    const [user, setUser] = useState();

    function getProducts() {
        cartRef.onSnapshot((querySnapShot) => {
            const items = [];
            querySnapShot.forEach((doc) => {
                items.push(doc.data());
            });
            setProducts(items);
        });
    }
    async function getUser() {
        await userRef.onSnapshot((querySnapShot) => {
            const items = [];
            querySnapShot.forEach((doc) => {
                setUser(doc.data());
            });
        });
    }

    const handleLogout = () => {
        firebase.auth().signOut();
        sessionStorage.clear();
        navigate('/login');
    };

    let navigate = useNavigate();
    useEffect(() => {
        getProducts();
        getUser();
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => setSmall(window.pageYOffset > 300));
        }
    }, []);
    let quality = 0;
    products.map((product) => (quality += 1));
    const headerRegister = (
        <div>
            <Link to="/register" element={<Register />} className={cx('signup-btn')}>
                Sign up
            </Link>
            <Link to="/login" element={<Login />} className={cx('signin-btn')}>
                Log in
            </Link>
        </div>
    );
    const headerUser = (
        <div className={cx('user')}>
            <Tippy
                className={cx('uer')}
                interactive
                content={
                    <div className={cx('user-content')}>
                        <Link to={`/profile/${userId}`} className={cx('btn-profile')}>
                            View profile
                        </Link>
                        <button onClick={handleLogout} className={cx('btn-logout')}>
                            Log out
                        </button>
                    </div>
                }
            >
                <div className={cx('')}>
                    <img
                        className={cx('avatar')}
                        src={
                            user?.avatar || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                        }
                        alt=""
                    />
                    <FontAwesomeIcon className={cx('avatar-icon')} icon={faCaretDown} />
                </div>
            </Tippy>
        </div>
    );
    return (
        <div className={cx('wrapper', `${small ? 'small' : ''}`)}>
            <div className={cx('inner')}>
                <Link className={cx('logo')} to="/">
                    <div className={cx('logo-img')} />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    <Tippy>
                        <Link to="/cart" element={<Cart />} className={cx('cart')}>
                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                            <span className={cx('quality')}>{quality}</span>
                        </Link>
                    </Tippy>
                    {sessionStorage.getItem('Email') ? headerUser : headerRegister}
                </div>
            </div>
        </div>
    );
}

export default Header;
