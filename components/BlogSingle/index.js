
import React, { Fragment } from 'react';
import Link from 'next/link'
import { Dialog, Grid, } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const submitHandler = (e) => {
    e.preventDefault()
}


const BlogSingle = ({ maxWidth, open, onClose, title, bImg, create_at, author, comment }) => {

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <i className="fa fa-close"></i>
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });


    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                className="modalWrapper quickview-dialog"
                maxWidth={maxWidth}
            >
                <DialogTitle id="customized-dialog-title" onClose={onClose}>

                </DialogTitle>
                <Grid className="modalBody modal-body">
                    <section className="wpo-blog-single-section">
                        <div className="container">
                            <div className="row">
                                <div className='col col-lg-12 col-12'>
                                    <div className="wpo-blog-content">
                                        <div className="post format-standard-image">
                                            <div className="entry-media">
                                                <img src={bImg} alt="" />
                                            </div>
                                            <div className="entry-meta">
                                                <ul>
                                                    <li><i className="fi flaticon-user"></i> By <Link href="/"><a>{author}</a></Link> </li>
                                                    <li><i className="fi flaticon-comment-white-oval-bubble"></i> Comments {comment}</li>
                                                    <li><i className="fi flaticon-calendar"></i> {create_at}</li>
                                                </ul>
                                            </div>
                                            <h2>{title}</h2>
                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful.</p>
                                            <blockquote>
                                                Combined with a handful of model sentence structures, generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                            </blockquote>
                                            <p>I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,</p>

                                            <div className="gallery">
                                                <div>
                                                    <img src='images/blog/img-4.jpg' alt="" />
                                                </div>
                                                <div>
                                                    <img src='images/blog/img-5.jpg' alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tag-share clearfix">
                                            <div className="tag">
                                                <span>Share: </span>
                                                <ul>
                                                    <li><Link href="/"><a>Planning</a></Link></li>
                                                    <li><Link href="/"><a>Portfolio</a></Link></li>
                                                    <li><Link href="/"><a>Creative</a></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tag-share-s2 clearfix">
                                            <div className="tag">
                                                <span>Share: </span>
                                                <ul>
                                                    <li><Link href="/"><a>facebook</a></Link></li>
                                                    <li><Link href="/"><a>twitter</a></Link></li>
                                                    <li><Link href="/"><a>linkedin</a></Link></li>
                                                    <li><Link href="/"><a>pinterest</a></Link></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="author-box">
                                            <div className="author-avatar">
                                                <Link href="/" target="_blank"><a><img src='images/blog-details/author.jpg' alt="" /></a></Link>
                                            </div>
                                            <div className="author-content">
                                                <Link href="/" ><a className="author-name">Author: Jenny Watson</a></Link>
                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                                                <div className="socials">
                                                    <ul className="social-link">
                                                        <li><Link href="/"><a><i className="ti-facebook"></i></a></Link></li>
                                                        <li><Link href="/"><a><i className="ti-twitter-alt"></i></a></Link></li>
                                                        <li><Link href="/"><a><i className="ti-linkedin"></i></a></Link></li>
                                                        <li><Link href="/"><a><i className="ti-instagram"></i></a></Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="more-posts">
                                            <div className="previous-post">
                                                <Link href="/">
                                                    <a>
                                                        <span className="post-control-link">Previous Post</span>
                                                        <span className="post-name">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</span>
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className="next-post">
                                                <Link href="/">
                                                    <a>
                                                        <span className="post-control-link">Next Post</span>
                                                        <span className="post-name">Dignissimos ducimus qui blanditiis praesentiu deleniti atque corrupti quos dolores</span>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="comments-area">
                                            <div className="comments-section">
                                                <h3 className="comments-title">Comments</h3>
                                                <ol className="comments">
                                                    <li className="comment even thread-even depth-1" id="comment-1">
                                                        <div id="div-comment-1">
                                                            <div className="comment-theme">
                                                                <div className="comment-image"><img src='images/blog-details/comments-author/img-1.jpg' alt="" /></div>
                                                            </div>
                                                            <div className="comment-main-area">
                                                                <div className="comment-wrapper">
                                                                    <div className="comments-meta">
                                                                        <h4>John Abraham <span className="comments-date">January 12,2022
                                                                            At 9.00am</span></h4>
                                                                    </div>
                                                                    <div className="comment-area">
                                                                        <p>I will give you a complete account of the system, and
                                                                            expound the actual teachings of the great explorer of
                                                                            the truth, </p>
                                                                        <div className="comments-reply">
                                                                            <Link href="/"><a className="comment-reply-link"><span>Reply</span></a></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul className="children">
                                                            <li className="comment">
                                                                <div>
                                                                    <div className="comment-theme">
                                                                        <div className="comment-image"><img src='images/blog-details/comments-author/img-2.jpg' alt="" /></div>
                                                                    </div>
                                                                    <div className="comment-main-area">
                                                                        <div className="comment-wrapper">
                                                                            <div className="comments-meta">
                                                                                <h4>Lily Watson <span className="comments-date">January
                                                                                    12,2022 At 9.00am</span></h4>
                                                                            </div>
                                                                            <div className="comment-area">
                                                                                <p>I will give you a complete account of the system,
                                                                                    and expound the actual teachings of the great
                                                                                    explorer of the truth, </p>
                                                                                <div className="comments-reply">
                                                                                    <Link href="/"><a className="comment-reply-link"><span>Reply</span></a></Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <ul>
                                                                    <li className="comment">
                                                                        <div>
                                                                            <div className="comment-theme">
                                                                                <div className="comment-image"><img src='images/blog-details/comments-author/img-3.jpg' alt="" /></div>
                                                                            </div>
                                                                            <div className="comment-main-area">
                                                                                <div className="comment-wrapper">
                                                                                    <div className="comments-meta">
                                                                                        <h4>John Abraham <span className="comments-date">January
                                                                                            12,2022 At 9.00am</span></h4>
                                                                                    </div>
                                                                                    <div className="comment-area">
                                                                                        <p>I will give you a complete account of the
                                                                                            system, and expound the actual teachings
                                                                                            of the great explorer of the truth, </p>
                                                                                        <div className="comments-reply">
                                                                                            <Link href="/"><a className="comment-reply-link"><span>Reply</span></a></Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="comment">
                                                        <div>
                                                            <div className="comment-theme">
                                                                <div className="comment-image"><img src='images/blog-details/comments-author/img-1.jpg' alt="" /></div>
                                                            </div>
                                                            <div className="comment-main-area">
                                                                <div className="comment-wrapper">
                                                                    <div className="comments-meta">
                                                                        <h4>John Abraham <span className="comments-date">January 12,2022
                                                                            At 9.00am</span></h4>
                                                                    </div>
                                                                    <div className="comment-area">
                                                                        <p>I will give you a complete account of the system, and
                                                                            expound the actual teachings of the great explorer of
                                                                            the truth, </p>
                                                                        <div className="comments-reply">
                                                                            <Link href="/"><a className="comment-reply-link"><span>Reply</span></a></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </div>
                                            <div className="comment-respond">
                                                <h3 className="comment-reply-title">Post Comments</h3>
                                                <form onSubmit={submitHandler} id="commentform" className="comment-form">
                                                    <div className="form-textarea">
                                                        <textarea id="comment" placeholder="Write Your Comments..."></textarea>
                                                    </div>
                                                    <div className="form-inputs">
                                                        <input placeholder="Website" type="url" />
                                                        <input placeholder="Name" type="text" />
                                                        <input placeholder="Email" type="email" />
                                                    </div>
                                                    <div className="form-submit">
                                                        <input id="submit" value="Post Comment" type="submit" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Grid>
            </Dialog>
        </Fragment>
    );
}
export default BlogSingle

