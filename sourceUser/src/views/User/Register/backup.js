import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";

function Register(props) {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
      password_confirmation: Yup.string()
      .required("Confirm Password is a required field")
      .oneOf([Yup.ref("password"), null], "Passwords must match"), // Đảm bảo mật khẩu khớp
  });
  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    console.log('aaaa')
    // http
    // .post(`/login`, data)
    // .then((res) => {
    //   console.log(res);
    //   const token = JSON.stringify(res.data.success.token);
    //   const auth = JSON.stringify(res.data.success.auth);

    //   localStorage.setItem("token", token);
    //   localStorage.setItem("auth", auth);
    //   localStorage.setItem("isLogin", true);

    //   if (res.data.success.auth.id_role === 1) {
    //     navigate("/");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   if (err.response.data && err.response.data.message) {
    //     toast.error(err.response.data.message);
    //   }
    //   if (err.response.data && err.response.data.error) {
    //     toast.error("incorrect email or password");
    //   }
    // });
    }
  return (
    <>
    <div className="wrapper-login">
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "", password_confirmation: "" }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <div className="form">
                <form noValidate onSubmit={handleSubmit}>
                  <span>Register</span>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id / username"
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <input
                    type="password"
                    name="password_confirmation "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    placeholder="Confirm password"
                    className="form-control"
                  />
                  <p className="error">
                    {errors.password_confirmation  && touched.password_confirmation  && errors.password_confirmation }
                  </p>
                  <button type="submit">Register</button>
                  <Link to="http://localhost:4000/login">Login</Link>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Register;
