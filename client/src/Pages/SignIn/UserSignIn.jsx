// HOOKS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { AuthService } from "../../Services/AuthService";

// STYLING COMPONENTS
import {
  Form
} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import './UserSignIn.css';

const UserSignIn = () => {

  // HOOKS
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const navigate = useNavigate();

  // SERVICES
  const Service = new AuthService();

  const submitForm = async (user) => {
    const { data } = await Service.SignIn(user);
    // SUCCESFULL LOGIN
    if (data.messageType === 'success') {
      // Show success notification
      toast.success(data.message);
      // Navigate to home page
      setTimeout(() => {
        navigate('/home');
      }, 1200);
    }else{
      toast.warn(data.message); 
    }
  }

  return <>
    <div className="login-bg-img">
      <div className="container d-flex justify-content-center" style={{ height: "100vh" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 w-auto">
            <h3 className="font-style">Login to your account</h3>
            <div className="form-box py-4">
              <Form onSubmit={handleSubmit(submitForm)} style={{ width: "500px" }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className="font-style fw-bold">Email address</Form.Label>
                  <Form.Control className="form-inp" {...register("email", { required: true, pattern: "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" })} name="email" type="email" />
                  {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold font-style">Password</Form.Label>
                  <Form.Control className="form-inp" {...register("password", { required: true })} name="password" type="password" />
                  {formState.isSubmitted && formState.errors.password ? (
                    <span className="text-danger">*required</span>
                  ) : null}
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <button className="fw-bold mt-4 auth-btn" type="submit" id="submitBtn">Sign In</button>
                  <div className="d-flex align-items-center">
                    <span className="mt-3">Not a member yet?</span>
                    <button className="mt-3 btn text-primary fw-bold sign-route-btn" onClick={() => { navigate('/sign-up') }}>Sign Up for free</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
}

export default UserSignIn;