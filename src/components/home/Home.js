/* eslint-disable jsx-a11y/iframe-has-title */
import PrivateLayout from "../../layout/PrivateLayout"
import bg_usth from "../../assets/img/logo_usth.png"
import "./Home.css"

const Home = () => {
    return (
        <PrivateLayout>
            <div className="layout-home-header">
                <img src={bg_usth} alt="#"/>
            </div>
            <iframe src="https://calendar.google.com/calendar/embed?mode=WEEK&amp;src=mailam1309%40gmail.com&amp;ctz=Asia%2FHo_Chi_Minh" className="time-table__layout" frameBorder="0"></iframe>
        </PrivateLayout>
    )
}

export default Home