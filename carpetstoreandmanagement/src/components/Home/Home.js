export const Home = () => {
    return (
        <>
            <h1 className="text-center">Welcome to our carpet store!</h1>
            <div className="d-flex align-items-center justify-content-between" style={{minHeight: "511px"}}>
                <div className="col-md-4 how-img">
                    <img
                        src="https://thumbs.dreamstime.com/b/persian-carpet-texture-21684751.jpg"
                        className="rounded-circle img-fluid"
                        alt=""
                    />
                </div>
                <div className="col-md-6">
                    <h4>We are the first machine made carpet factory in Bulgaria!</h4>
                    <p className="">
                        Оur company was established in 2019 in Sliven, Bulgaria. Since then we
                        have produced more than 1 milion sqm and we are using the latest
                        technologies in the carpet manufacturing. The quality of the products is
                        our number one priority! We have rich assortiment with modern designs.
                        We have awards from many carpet exhibitions, and currently we are the
                        most selling company in our country!
                    </p>
                </div>
            </div>
        </>
    )
}