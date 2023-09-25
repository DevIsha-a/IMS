// HOOKS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { AuthService } from "../../Services/AuthService";

// STYLING COMPONENTS
import {
  Form
} from "react-bootstrap";
import '../SignIn/UserSignIn.css';

const UserSignUp = () => {

  // HOOKS
  const { handleSubmit, register, getValues, watch, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const navigate = useNavigate();

  // SERVICES
  const Service = new AuthService();

  const submitForm = async (user) => {
    const { data } = await Service.SignUp(user);
    console.log(data.message);
    if(data.messageType === "success"){
      navigate("/home")
    }
  }

  return (
    <div className="login-bg-img">
      <div className="container d-flex justify-content-center" style={{ height: "100vh" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4 w-auto">
            <h3 className="font-style">Sign Up For Account</h3>
            <div className="form-box py-4">
              <Form onSubmit={handleSubmit(submitForm)} style={{ width: "500px" }}>
                <div className="d-flex justify-content-between">
                  <Form.Group className="mb-2" controlId="firstName">
                    <Form.Label className="font-style fw-bold">First Name</Form.Label>
                    <Form.Control className="form-inp" {...register("firstName", {required: true})} name="firstName" type="firstName"
                      onInput={(e) => {
                        const inpText = e.target.value;
                        const maxLength = 20;
                        if(inpText.length > maxLength){
                          e.target.value = inpText.slice(0, maxLength)
                        }
                      }}  />
                    {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ): null}
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="lastName">
                    <Form.Label className="fw-bold font-style">Last Name</Form.Label>
                    <Form.Control className="form-inp" {...register("lastName", {required: true})} name="lastName" type="lastName" 
                    onInput={(e) => {
                      const inpText = e.target.value;
                      const maxLength = 20;
                      if(inpText.length > maxLength){
                        e.target.value = inpText.slice(0, maxLength)
                      }
                    }}  />
                  </Form.Group>
                </div>
                <Form.Group className="mb-2" controlId="userName">
                  <Form.Label className="font-style fw-bold">User Name</Form.Label>
                  <Form.Control className="form-inp" {...register("userName", {required: true})} name="userName" type="userName" 
                  onInput={(e) => {
                    const inpText = e.target.value;
                    const maxLength = 20;
                    if(inpText.length > maxLength){
                      e.target.value = inpText.slice(0, maxLength)
                    }
                  }}  />
                  {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ): null}
                </Form.Group>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Label className="font-style fw-bold">Email address</Form.Label>
                  <Form.Control className="form-inp" {...register("email", {required: true})} name="email" type="email" 
                  onInput={(e) => {
                    const inpText = e.target.value;
                    const maxLength = 30;
                    if(inpText.length > maxLength){
                      e.target.value = inpText.slice(0, maxLength)
                    }
                  }}  />
                  {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ): null}
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                  <Form.Label className="fw-bold font-style">Create Password</Form.Label>
                  <Form.Control className="form-inp" {...register("password", {required: true})} name="password" type="password" 
                  onInput={(e) => {
                    const inpText = e.target.value;
                    const maxLength = 20;
                    if(inpText.length > maxLength){
                      e.target.value = inpText.slice(0, maxLength)
                    }
                  }}  />
                  {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ): null}
                </Form.Group>
                <Form.Group className="mb-2" controlId="confirmPassword">
                  <Form.Label className="fw-bold font-style">Create Password</Form.Label>
                  <Form.Control className="form-inp" {...register("confirmPassword", {required: true})} name="confirmPassword" type="password" 
                  onInput={(e) => {
                    const inpText = e.target.value;
                    const maxLength = 20;
                    if(inpText.length > maxLength){
                      e.target.value = inpText.slice(0, maxLength)
                    }
                  }}  />
                  {getValues("password") === watch("confirmPassword") ? null : <p className="text-danger">Password doesn't match..</p>}
                  {formState.isSubmitted && formState.errors.email ? (
                    <span className="text-danger">*required</span>
                  ): null}
                </Form.Group>
                {/* <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="fw-bold font-style">Confirm Password</Form.Label>
                  <Form.Control className="form-inp" {...register("password")} name="password" type="password" />
                </Form.Group> */}
                <div className="d-flex justify-content-between">
                  <button className="fw-bold mt-4 auth-btn" type="submit" id="submitBtn">Sign Up</button>
                  <div className="d-flex align-items-center">
                    <span className="mt-3">Already have an account?</span>
                    <button className=" mt-3 fw-bold btn text-primary sign-route-btn" onClick={() => {navigate('/')}}>Sign in</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp;