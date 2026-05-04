import Heading from "../../layouts/Heading/Heading";
import LogForm from "../../components/Forms/LogForm"

const LogIn = () => {   
    return (<>
        <Heading heading={"Sign In"} />
        <div className="body">
            <LogForm />
        </div>
    </>);
}

export default LogIn;
