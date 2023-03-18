// import style from './Register.Module.css'

export const Register = () => {
    return (
        <div className="container">
            <div className="row main">
                <div className="main-login main-center">
                    <form className="" method="post" action="#">
                        <div className="form-group">
                            <label htmlFor="email" className="cols-sm-2 control-label">
                                Email
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-envelope fa" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your Email"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="cols-sm-2 control-label">
                                Username
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-users fa" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        placeholder="Enter your Username"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="cols-sm-2 control-label">
                                Password
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your Password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm" className="cols-sm-2 control-label">
                                Confirm Password
                            </label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock fa-lg" aria-hidden="true" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirm"
                                        id="confirm"
                                        placeholder="Confirm your Password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <a
                                href="https://youtu.be/grvpgbexPEs"
                                target="_blank"
                                type="button"
                                id="button"
                                className="btn btn-primary btn-lg btn-block login-button"
                            >
                                Register
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
};