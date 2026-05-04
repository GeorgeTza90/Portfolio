import Heading from "../../layouts/Heading/Heading";
import RegForm from "../../components/Forms/RegForm.tsx";

const Register = () => {
    return (<>
        <Heading heading={"Sign Up"} />
        <div className="body">
            <RegForm />
        </div>        
    </>);
}

export default Register;
